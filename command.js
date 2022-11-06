const { ApplicationCommandType } = require('discord.js');
const { python, nodejs } = require("./run");

const commands = {
    name: 'run',
    type: ApplicationCommandType.Message
};


function start(content) {
    switch (content[0]) {
        case "js":
            return new Promise(async (resolve) => {
                const data = await nodejs(content[1]);
                if (data.isError) {
                    resolve("エラーが発生しました\n```\n" + data.log + "\n```");
                } else if (data.isTimeout) {
                    resolve("タイムアウトしました");
                } else {
                    resolve("処理が完了しました\n```\n" + data.log + "\n```");
                }
            });
        case "py":
            return new Promise(async (resolve) => {
                const data = await python(content[1]);
                if (data.isError) {
                    resolve("エラーが発生しました\n```\n" + data.log + "\n```");
                } else if (data.isTimeout) {
                    resolve("タイムアウトしました");
                } else {
                    resolve("処理が完了しました\n```\n" + data.log + "\n```");
                }
            });
    }
}

module.exports = {
    start: start,
    commands: commands
}