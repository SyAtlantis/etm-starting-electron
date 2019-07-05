const fs = require("fs");
const path = require("path");
const File = require("./file");
const Shell = require("./shell");


const rootDir = File.getRootPath();
const nodeDir = path.resolve(path.join(rootDir, "build/node"));

const nodeSrcPath = {
    win32: path.resolve(nodeDir, "./win32/runner.exe"),
    linux: path.resolve(nodeDir, "./linux/runner"),
    darwin: path.resolve(nodeDir, "./macos/runner")
};
const nodeDstPath = {
    win32: path.resolve(path.join(process.env["SystemRoot"], "System32", "node.exe")),
    linux: "/usr/local/bin/node",
    darwin: "/usr/local/bin/node"
};

let srcPath = nodeSrcPath[process.platform];
let dstPath = nodeDstPath[process.platform];

class Node {

    static async getNodeVersion() {
        try {
            return await Shell.exec("node -v");
        } catch (err) {
            throw err;
        }
    }

    static async linkNode() {
        try {
            Shell.rm("-f", dstPath);
            return await Shell.ln("-sf", srcPath, dstPath);
        } catch (err) {
            throw err;
        }
    }

    static async unlinkNode() {
        return new Promise((resolve, reject) => {
            try {
                fs.unlinkSync(dstPath);
                return resolve(true);
            } catch (err) {
                return reject(new Error(err.toString()));
            }
        });
    }

}

module.exports = Node;