"use strict";

const path = require("path");
const env = require('../lib/env');
const common = require('../lib/common');

// entanmo project
let getEntanmoInfo = async ctx => {
    let rootPath = common.getRootPath();
    const packageJson = require(path.join(rootPath + "/etm/package.json"));
    let version = packageJson.version;

    if (version) {
        return ctx.body = {
            success: true,
            results: version
        };
    }

    ctx.body = {
        success: false,
        message: "Can not find entanmo project!"
    };
};

let installEntanmo = async ctx => {
    ctx.body = {
        success: false,
        message: "TODO installEntanmo"
    };
};

let uninstallEntanmo = async ctx => {
    ctx.body = {
        success: false,
        message: "TODO uninstallEntanmo"
    };
};

// nodejs
let getNodejsInfo = async ctx => {
    try {
        await env.doctorNode()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

let installNodejs = async ctx => {
    try {
        await env.lnNode()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

let uninstallNodejs = async ctx => {
    try {
        await env.unlnNode()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

// pm2
let getPm2Info = async ctx => {
    try {
        await env.doctorPM2()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

let installPm2 = async ctx => {
    try {
        await env.lnPM2()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

let uninstallPm2 = async ctx => {
    try {
        await env.unlnPM2()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: res
                };
            }).catch(err => {
                throw err;
            });
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }
};

module.exports = (router) => {
    router.get("/install/getEntanmoInfo", getEntanmoInfo);
    router.get("/install/getNodejsInfo", getNodejsInfo);
    router.get("/install/getPm2Info", getPm2Info);

    router.put("/install/installEntanmo", installEntanmo);
    router.put("/install/installNodejs", installNodejs);
    router.put("/install/installPm2", installPm2);

    router.put("/install/uninstallEntanmo", uninstallEntanmo);
    router.put("/install/uninstallNodejs", uninstallNodejs);
    router.put("/install/uninstallPm2", uninstallPm2);
};