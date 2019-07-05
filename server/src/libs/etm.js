const path = require("path");
const fs = require("fs");
const File = require("./file");
const Shell = require("./shell");

const rootDir = File.getRootPath();
const projDir = path.resolve(path.join(rootDir, "build/etm"));

const app = `${projDir}/app.js`;
const appName = "entanmo";

class Etm {

    static async getEtmVersion() {
        let packagePath = File.getPackagePath();
        const packageJson = require(packagePath);
        let version = packageJson.version;
        return version;
    }

    static async installEtm() {
    }

    static async unistallEtm() {
    }

    static async getStatus() {
        let command = `pm2 jlist`;
        return new Promise((resolve, reject) => {
            Shell.exec(command).then(res => {
                let resJson = JSON.parse(res);
                if (resJson instanceof Array) {
                    resJson.forEach(element => {
                        if (element.name === appName && element.pm2_env) {
                            let status = element.pm2_env.status;
                            return resolve(status);
                        }
                        return reject(new Error("Not found status!"));
                    });
                } else {
                    return reject(new Error("pm2 jlist res not a string array!"));
                }
            }).catch(err => {
                return reject(err);
            });
        });
    }


    static async start() {
        let command = `pm2 start ${app} -n ${appName} -- --base ${projDir}`;
        try {
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }

    static async stop() {
        let command = `pm2 delete ${appName}`;
        try {
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }

    static async pause() {
        let command = `pm2 stop ${appName}`;
        try {
            return await Shell.exec(command);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Etm;