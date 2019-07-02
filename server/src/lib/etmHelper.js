const path = require("path");
const fs = require("fs");

class EtmHelper {

    static getRootPath() {
        return path.resolve(path.join(__dirname, "../../../resources"));
    }

    static getConfigPath() {
        let rootPath = EtmHelper.getRootPath();
        let configPath = path.join(rootPath, "/etm/config/config.json");
        return configPath;
    }

    static getPackagePath() {
        let rootPath = EtmHelper.getRootPath();
        let packagePath = path.join(rootPath, "/etm/package.json");
        return packagePath;
    }

    static readConfig() {
        let configPath = EtmHelper.getConfigPath();
        let config = fs.readFileSync(configPath);
        let configJson = JSON.parse(config);

        return configJson;
    }

    static writeConfig(configJson) {
        let configPath = EtmHelper.getConfigPath();
        fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2));
    }

}

module.exports = EtmHelper;