"use strict";

const fs = require("fs");
const path = require("path");
const common = require('../lib/common');

let setVulue = async ctx => {
    try {
        let { params } = ctx.request.body;
        let rootPath = common.getRootPath();
        let configPath = path.join(rootPath, "/etm/config/config.json");

        let config = fs.readFileSync(configPath);
        let configJson = JSON.parse(config);
        configJson.port = params.port;
        configJson.peerPort = (parseInt(params.port) + 1).toString();
        configJson.publicIp = params.publicIp;
        configJson.forging.secret = [params.secret];

        fs.writeFileSync(configPath, JSON.stringify(configJson, null, 2));

        ctx.body = {
            success: true,
            results: "setting data ok"
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
}

module.exports = (router) => {
    router.post("/setting/setVulue", setVulue);
};