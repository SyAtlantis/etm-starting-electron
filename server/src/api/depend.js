"use strict";

const node = require('../libs/node');
const pm2 = require('../libs/pm2');
const etm = require('../libs/etm');

let getNodeInfo = async ctx => {
    try {
        await node.getNodeVersion()
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
}

let getPm2Info = async ctx => {
    try {
        await pm2.getPm2Version()
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
}

let getEtmInfo = async ctx => {
    try {
        await etm.getEtmVersion()
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
}

let installNode = async ctx => {
    try {
        await node.linkNode()
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
}

let installPm2 = async ctx => {
    try {
        await pm2.linkPm2()
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
}

let installEtm = async ctx => {
    try {
        await etm.installEtm()
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
}

let uninstallNode = async ctx => {
    try {
        await node.unlinkNode()
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
}

let uninstallPm2 = async ctx => {
    try {
        await pm2.unlinkPm2()
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
}

let uninstallEtm = async ctx => {
    try {
        await etm.unistallEtm()
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
}

module.exports = (router) => {
    router.get("/depend/getNodeInfo", getNodeInfo);
    router.get("/depend/getPm2Info", getPm2Info);
    router.get("/depend/getEtmInfo", getEtmInfo);

    router.put("/depend/installNode", installNode);
    router.put("/depend/installPm2", installPm2);
    router.put("/depend/installEtm", installEtm);

    router.put("/depend/uninstallNode", uninstallNode);
    router.put("/depend/uninstallPm2", uninstallPm2);
    router.put("/depend/uninstallEtm", uninstallEtm);
};