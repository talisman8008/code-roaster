import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

const runStaticAnalysis = async (code, language) => {
    // write code to a temp file so the analyzer can read it
    const tempDir = os.tmpdir()
    const extensions = {
        javascript: 'js',
        python: 'py',
        java: 'java',
        cpp: 'cpp'
    }

    const ext = extensions[language]
    const tempFile = path.join(tempDir, `cr_temp_${Date.now()}.${ext}`)

    try {
        await fs.writeFile(tempFile, code, 'utf8')

        let issues = []

        if (language === 'javascript') {
            issues = await runESLint(tempFile)
        } else if (language === 'python') {
            issues = await runFlake8(tempFile)
        } else if (language === 'cpp' || language === 'java') {
            issues = await runCppcheck(tempFile)
        }

        return issues

    } finally {
        // always delete the temp file even if analysis fails
        await fs.unlink(tempFile).catch(() => {})
    }
}

const runESLint = async (filePath) => {
    try {
        const { stdout } = await execAsync(
            `npx eslint --no-eslintrc --rule "no-unused-vars: warn, no-undef: warn, eqeqeq: warn, no-console: warn" --format json ${filePath}`
        )
        const results = JSON.parse(stdout)
        return results[0]?.messages.map(m => ({
            line:     m.line || null,
            severity: m.severity === 2 ? 'critical' : 'warning',
            message:  m.message
        })) || []
    } catch (err) {
        // eslint exits with code 1 when it finds issues — that throws in execAsync
        // so we parse stdout from the error object instead
        if (err.stdout) {
            try {
                const results = JSON.parse(err.stdout)
                return results[0]?.messages.map(m => ({
                    line:     m.line || null,
                    severity: m.severity === 2 ? 'critical' : 'warning',
                    message:  m.message
                })) || []
            } catch { return [] }
        }
        return []
    }
}

const runFlake8 = async (filePath) => {
    try {
        const { stdout } = await execAsync(`flake8 --format=default ${filePath}`)
        return parseFlake8Output(stdout)
    } catch (err) {
        // flake8 also exits with code 1 when issues found
        if (err.stdout) return parseFlake8Output(err.stdout)
        return []
    }
}

const parseFlake8Output = (output) => {
    if (!output.trim()) return []
    return output.trim().split('\n').map(line => {
        // format: filename:line:col: CODE message
        const match = line.match(/:(\d+):\d+:\s+(\w+)\s+(.+)/)
        if (!match) return null
        const [, lineNum, code, message] = match
        const severity = code.startsWith('E') ? 'critical' : 'warning'
        return { line: parseInt(lineNum), severity, message: `${code}: ${message}` }
    }).filter(Boolean)
}

const runCppcheck = async (filePath) => {
    try {
        // cppcheck outputs to stderr not stdout
        const { stderr } = await execAsync(
            `cppcheck --enable=all --inconclusive --quiet ${filePath}`
        )
        if (!stderr.trim()) return []
        return stderr.trim().split('\n').map(line => {
            const match = line.match(/:(\d+):\d+:\s+(\w+):\s+(.+)/)
            if (!match) return null
            const [, lineNum, severity, message] = match
            return {
                line: parseInt(lineNum),
                severity: severity === 'error' ? 'critical' : 'warning',
                message
            }
        }).filter(Boolean)
    } catch (err) {
        return []
    }
}

export default runStaticAnalysis