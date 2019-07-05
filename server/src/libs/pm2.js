const fs = require("fs");
const path = require("path");
const File = require("./file");
const Shell = require("./shell");

const rootDir = File.getRootPath();
const pm2Dir = path.resolve(path.join(rootDir, "build/pm2"));

const pm2SrcPath = {
    win32: path.resolve(pm2Dir, "pm2.cmd"),
    linux: path.resolve(pm2Dir, "./node_modules/.bin/pm2"),
    darwin: path.resolve(pm2Dir, "./node_modules/.bin/pm2")
};
const pm2DstPath = {
    win32: path.resolve(path.join(process.env["SystemRoot"], "System32", "pm2.cmd")),
    linux: "/usr/local/bin/pm2",
    darwin: "/usr/local/bin/pm2"
}

let srcPath = pm2SrcPath[process.platform];
let dstPath = pm2DstPath[process.platform];

class Pm2 {

    static async getPm2Version() {
        try {
            return await Shell.exec("pm2 -v");
        } catch (err) {
            throw err;
        }
    }

    static async linkPm2() {
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
                        throw (new Error("Create pm2 command failure."));
                    }
                }
            }

            return await Shell.ln("-sf", srcPath, dstPath);
        } catch (err) {
            throw err;
        }
    }

    static async unlinkPm2() {
        return new Promise((resolve, reject) => {
            try {
                fs.unlinkSync(dstPath);
                return resolve(true);
            } catch (err) {
                return reject(new Error(err.toString()));
            }
        });
    }


}

module.exports = Pm2;