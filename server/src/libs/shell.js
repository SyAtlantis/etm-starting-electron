const shell = require('shelljs');

class Shell {

    static async exec(command) {
        return new Promise((resolve, reject) => {
            shell.exec(command, { silent: true }, (code, stdout, stderr) => {
                if (code === 0) {
                    return resolve(stdout.toString());
                }

                return reject(stderr.toString());
            });
        });
    }

    static rm(opt, dst) {
        return shell.rm(opt, dst);
    }

    static ln(opt, src, dst) {
        return new Promise((resolve, reject) => {
            const shellString = shell.ln(opt, src, dst);
            if (shellString.code === 0) {
                return resolve(shellString.stdout);
            }
            return reject(shellString.stderr);

        });
    }


}

module.exports = Shell;