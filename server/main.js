"use strict";

const fs = require("fs");
const path = require("path");
// const SocketIO = require("socket.io");
const program = require("commander");
const Koa = require("koa");
const KoaRouter = require("koa-router");
const cors = require("koa2-cors");

const Logger = require("./src/utils/logger");

const modules = [
    ["test", "./src/modules/test"]
]


let _init = async opt => {
    // logger
    let logger = new Logger({
        filename: path.resolve(__dirname, "logs", "etm-starting.log"),
        echo: program.deamon ? null : "debug",
        errorLevel: "debug"
    });
    library.logger = logger;

    // modules
    for (let module of modules) {
        try {
            const ClzModule = require(module[1]);
            const inst = new ClzModule();
            inst && await inst.init(opt);
            // inst && appContext.appendModule(module[0], inst);
            library.logger.info(`[App-init] module(${module[0]}) inited`);
        } catch (error) {
            library.logger.error(`[App-init] module(${module[0]}) init failure, `, error);
        }
    }

}

let _setup = async opt => {
    let app = new Koa();

    // koa cors Access-Control-Allow-Origin
    app.use(cors());

    // router
    const apiDir = path.resolve(__dirname, "src", "api");
    const APIs = fs.readdirSync(apiDir);
    const router = new KoaRouter();
    APIs.forEach(el => {
        if (el.endsWith(".js")) {
            const APIModule = require(path.resolve(apiDir, el));
            APIModule(router);
        }
    });
    app.use(router.routes());

    // server listening
    const server = app.listen(opt.port, opt.host, () => {
        library.logger.info(`[Server] Listening on ${opt.host}:${opt.port}.`);
    });

    // socket
    // const socketio = SocketIO(server);
}

function main() {
    global.library = {};

    program.version("1.0.0")
        .option("--host <host>", "service host", "127.0.0.1")
        .option("--port <port>", "service port", 7788)
        .parse(process.argv)

    let opt = {};
    opt.host = program.host;
    opt.port = Number(program.port);

    _init(opt)
        .then(() => {
            return _setup(opt);
        });
}

main();