"use strict";

const os = require('os');
const axios = require('axios');
const shell = require('shelljs');

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

    ctx.body = {
        success: false,
        message: "todo getGpuInfo"
    };
};

let getProcInfo = async ctx => {
    ctx.body = {
        success: false,
        message: "todo getProcInfo"
    };
};

let getSyncInfo = async ctx => {
    ctx.body = {
        success: false,
        message: "todo getSyncInfo"
    };
};

let getBlockInfo = async ctx => {
    ctx.body = {
        success: false,
        message: "todo getBlockInfo"
    };
};

module.exports = (router) => {
    router.get("/monitor/getNetInfo", getNetInfo);
    router.get("/monitor/getGpuInfo", getGpuInfo);
    router.get("/monitor/getProcInfo", getProcInfo);
    router.get("/monitor/getSyncInfo", getSyncInfo);
    router.get("/monitor/getBlockInfo", getBlockInfo);
};