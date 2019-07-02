const path = require("path");
const fs = require("fs");

class File {

    static getRootPath() {
        return path.resolve(path.join(__dirname, "../../.."));
    }

    static getConfigPath() {
        let rootPath = File.getRootPath();
        let configPath = path.join(rootPath, "/resources/etm/config/config.json");
        return configPath;
    }

    static getPackagePath() {
        let rootPath = File.getRootPath();
        let packagePath = path.join(rootPath, "/resources/etm/package.json");
        return packagePath;
    }

    static readConfig() {
        let configPath = File.getConfigPath();
        let config = fs.readFileSync(configPath);
        let configJson = JSON.parse(config);

        return configJson;
    }

    static writeConfig(configJson) {
        let configPath = EtmHelper.getConfigPath();
        fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2));
    }

}

module.exports = File;