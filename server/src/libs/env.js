const path = require("path");
const fs = require("fs");
const File = require("./file");
const Shell = require("./shell");

const rootDir = path.resolve(path.join(__dirname, "../../.."));
const projDir = path.resolve(path.join(rootDir, "resources/etm"));
const nodeDir = path.resolve(path.join(rootDir, "resources/node"));
const pm2Dir = path.resolve(path.join(rootDir, "resources/pm2"));

class Env {

    static getSrcNodePath() {
        if (process.platform === "win32") {
            return path.resolve(nodeDir, "./win32/runner.exe");
        } else if (process.platform === "linux") {
            return path.resolve(nodeDir, "./linux/runner");
        } else if (process.platform === "darwin") {
            return path.resolve(nodeDir, "./macos/runner");
        } else {
            throw new Error(`Unsupported os[${process.platform}]`);
        }
    }

    static getDstNodePath() {
        if (process.platform === "win32") {
            const systemRoot = process.env["SystemRoot"];
            return path.resolve(path.join(systemRoot, "System32", "node.exe"));
        } else if (process.platform === "linux") {
            return "/usr/local/bin/node";
        } else if (process.platform === "darwin") {
            return "/usr/local/bin/node";
        } else {
            throw new Error(`Unsupported os[${process.platform}]`);
        }
    }

    static getSrcPm2Path() {
        if (process.platform === "win32") {
            return path.resolve(pm2Dir, "pm2.cmd");
        } else if (process.platform === "linux") {
            return path.resolve(pm2Dir, "./node_modules/.bin/pm2");
        } else if (process.platform === "darwin") {
            return path.resolve(pm2Dir, "./node_modules/.bin/pm2");
        } else {
            throw new Error(`Unsupported os[${process.platform}]`);
        }
    }

    static getDstPm2Path() {
        if (process.platform === "win32") {
            const systemRoot = process.env["SystemRoot"];
            return path.resolve(path.join(systemRoot, "System32", "pm2.cmd"));
        } else if (process.platform === "linux") {
            return "/usr/local/bin/pm2";
        } else if (process.platform === "darwin") {
            return "/usr/local/bin/pm2";
        } else {
            throw new Error(`Unsupported os[${process.platform}]`);
        }
    }

    static async linkNode() {
        let srcPath = Env.getSrcNodePath();
        let dstPath = Env.getDstNodePath();

        try {
            Shell.rm("-f", dstPath);
            return await Shell.ln("-sf", srcPath, dstPath);
        } catch (err) {
            throw err;
        }
    }

    static async unlinkNode() {
        let dstPath = Env.getDstNodePath();
        return new Promise((resolve, reject) => {
            try {
                fs.unlinkSync(dstPath);
                return resolve(true);
            } catch (err) {
                return reject(new Error(err.toString()));
            }
        });
    }

    static async linkPm2() {
        let srcPath = Env.getSrcPm2Path();
        let dstPath = Env.getDstPm2Path();

        try {
            Shell.rm("-f", dstPath);

            // windows通过自定义全新cmd文件的方式来进行安装
            if (process.platform === "win32") {
                if (!fs.existsSync(srcPath)) {
                    const pm2_command_path = path.join(pm2Dir, "node_modules", "pm2", "bin", "pm2");
                    const commands = [
                        "@ECHO OFF",
                        "@SETLOCAL",
                        "@SET PATHEXT=%PATHEXT:;.JS;=;%",
                        `node "${path.resolve(pm2_command_path)}" %*`
                    ];
                    fs.writeFileSync(srcPath, commands.join("\r\n"));
                    
                    if (!fs.existsSync(srcPath)) {
                        throw(new Error("Create pm2 command failure."));
                    }
                }
            }
            else {
                return await Shell.ln("-sf", srcPath, dstPath);
            }
        } catch (err) {
            throw err;
        }


    }

    static async unlinkPm2() {
        let dstPath = Env.getDstPm2Path();
        return new Promise((resolve, reject) => {
            try {
                fs.unlinkSync(dstPath);
                return resolve(true);
            } catch (err) {
                return reject(new Error(err.toString()));
            }
        });
    }

    static async getNodeVersion() {
        try {
            return await Shell.exec("node -v");
        } catch (err) {
            throw err;
        }
    }

    static async getPm2Version() {
        try {
            return await Shell.exec("node -v");
        } catch (err) {
            throw err;
        }
    }


}

module.exports = Env;