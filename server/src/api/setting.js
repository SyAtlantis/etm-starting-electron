"use strict";

const File = require('../libs/file');

let setVulue = async ctx => {
    try {
        let { params } = ctx.request.body;

        let configJson = File.readConfig();

        configJson.port = params.port;
        configJson.peerPort = (parseInt(params.port) + 1).toString();
        configJson.publicIp = params.publicIp;
        configJson.forging.secret = [params.secret];

        File.writeConfig(configJson);

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