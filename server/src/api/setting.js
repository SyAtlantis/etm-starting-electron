"use strict";

let setVulue = async ctx => {
    ctx.body = {
        success: true,
        data: "test success"
    };
}

// let setPublicTp = async ctx => {
//     ctx.body = {
//         success: true,
//         data: "test success"
//     };
// }

// let setPort = async ctx => {
//     ctx.body = {
//         success: true,
//         data: "test success"
//     };
// }

// let setSecret = async ctx => {
//     ctx.body = {
//         success: true,
//         data: "test success"
//     };
// }

module.exports = (router) => {
    router.put("/setting/setVulue", setVulue);
    // router.put("/setting/setPort", setPort);
    // router.put("/setting/setSecret", setSecret);
};