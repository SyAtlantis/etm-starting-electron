const path = require("path");
const fs = require("fs");

const rootPath = path.resolve(path.join(__dirname, "../../.."));
const configPath = path.join(rootPath, "/build/etm/config/config.json");
const packagePath = path.join(rootPath, "/build/etm/package.json");

class File {

    static getRootPath() {
        return rootPath;
    }

    static getConfigPath() {
        return configPath;
    }

    static getPackagePath() {
        return packagePath;
    }

    static readConfig() {
        let config = fs.readFileSync(configPath);
        let configJson = JSON.parse(config);

        return configJson;
    }

    static writeConfig(configJson) {
        fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2));
    }

}

module.exports = File;