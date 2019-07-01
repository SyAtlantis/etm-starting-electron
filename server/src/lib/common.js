const path = require("path");

class Common {

    static getRootPath() {
        return path.resolve(path.join(__dirname, "../../../resources"));
    }

}

module.exports = Common;