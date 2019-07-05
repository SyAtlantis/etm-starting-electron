"use strict";

const axios = require('axios');
const File = require('../libs/file');
const etm = require('../libs/etm');
const etmjslib = require('etm-js-lib');


let getNetInfo = async ctx => {
    try {
        await axios.get('http://ip-api.com/json/')
            .then(res => {
                // console.log(res.data.query);
                if (res.data && res.data.query) {
                    let netInfo = {
                        publicIp: res.data.query
                    }

                    ctx.body = {
                        success: true,
                        results: netInfo
                    };
                }
                else {
                    throw new Error("The api can't get publicIp!");
                }
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

let getGpuInfo = async ctx => {
    try {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    } catch (err) {
        ctx.body = {
            success: false,
            message: `${err}`
        };
    }

    // let cmd = '';
    // // let args = [];
    // if (process.platform == 'darwin') {
    //     // cmd = 'system_profiler';
    //     // args = ['SPDisplaysDataType'];
    //     cmd = 'system_profiler SPDisplaysDataType'
    // } else if (process.platform == 'win32') {
    //     // cmd = 'dxdiag';
    //     // args = ['/t', 'dxdiag_out.txt'];
    //     cmd = 'dxdiag /t dxdiag_out.txt'
    // } else {
    //     // aix, freebsd, linux, openbsd, sunos
    //     // cmd = 'lshw -C display';
    //     // args = ['-C', 'display'];
    //     cmd = 'lshw -C display'
    // }

    // let child = shell.exec(cmd, {async:true});
    // child.stdout.on('data', function(data) {

    //   });
    // if (shell.exec(cmd).code !== 0) {
    //     shell.echo('Error: Git commit failed');
    //     shell.exit(1);
    // }

};

let getProcInfo = async ctx => {
    try {
        await etm.getStatus()
            .then(res => {
                ctx.body = {
                    success: true,
                    results: { status: res }
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

let getSyncInfo = async ctx => {
    try {
        let config = File.readConfig();
        let port = config.port;
        // let url = `http://20.188.242.113:${port}/api/loader/status/sync`;
        let url = `http://localhost:${port}/api/loader/status/sync`;

        // console.log("getSyncInfo url=>", url)
        await axios.get(url)
            .then(res => {
                // console.log(res);
                if (res.data && res.data.success) {

                    ctx.body = {
                        success: true,
                        results: res.data
                    };
                }
                else {
                    throw new Error(res.data.error);
                }
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

let getBlockInfo = async ctx => {
    try {
        let config = File.readConfig();
        let port = config.port;

        let secret = config.forging.secret[0];
        if (!secret) {
            throw "This miner did not set secret!";
        }

        let hash = etmjslib.crypto.createHash("sha256").update(secret).digest();
        let publicKey = etmjslib.utils.ed.MakeKeypair(hash).publicKey;
        let url = `http://localhost:${port}/api/delegates/get?publicKey=${publicKey}`;

        // let publicKey = "330fce6558acfae682fd720295fbfb07434a2511048d3fa6497887aa3a9521e6"
        // let url = `http://20.188.242.113:${port}/api/delegates/get?publicKey=${publicKey}`;

        await axios.get(url)
            .then(res => {
                // console.log(res);
                if (res.data && res.data.success) {

                    ctx.body = {
                        success: true,
                        results: res.data.delegate
                    };
                }
                else {
                    throw res.data.error;
                }
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
    router.get("/monitor/getNetInfo", getNetInfo);
    router.get("/monitor/getGpuInfo", getGpuInfo);
    router.get("/monitor/getProcInfo", getProcInfo);
    router.get("/monitor/getSyncInfo", getSyncInfo);
    router.get("/monitor/getBlockInfo", getBlockInfo);
};