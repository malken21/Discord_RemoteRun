const childProcess = require('child_process');
const fs = require('fs');
const { command, timeout } = require("./Config.json");

function python(text) {// Python
    return new Promise(async (resolve) => {
        await writeFile("run.py", text);
        const result = await run(command.python);
        resolve(result);
    });
}
function nodejs(text) {// Node.js
    return new Promise(async (resolve) => {
        await writeFile("run.js", text);
        const result = await run(command.nodejs);
        resolve(result);
    });
}

//ファイル作成
function writeFile(fileName, text) {
    //ディレクトリがなかったら 作成
    if (!fs.existsSync("./run")) fs.mkdirSync("./run");
    // await 対応
    return new Promise((resolve) => {
        // 書き込み
        fs.writeFile(`./run/${fileName}`, text, resolve);
    });
}
//コマンド実行
function run(text) {
    return new Promise((resolve) => {
        const exec = childProcess.exec(text, (error, stdout, stderr) => {
            if (error) {
                resolve({ log: stderr, isError: true });
                return;
            }
            else {
                resolve({ log: stdout });
            }
        });

        setTimeout(() => {//タイムアウト
            exec.kill()
            resolve({ isTimeout: true });
        }, timeout);

        exec.stdin.end();
    });
}

module.exports = {
    python: python,
    nodejs: nodejs
}