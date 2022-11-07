const { ApplicationCommandType } = require('discord.js');

const commands = {
    name: 'run',
    type: ApplicationCommandType.Message
};

function result(data) {
    return new Promise(async (resolve) => {
        if (data.isError) {
            resolve("エラーが発生しました\n```\n" + data.log + "\n```");
        } else if (data.isTimeout) {
            resolve("タイムアウトしました");
        } else {
            resolve("処理が完了しました\n```\n" + data.log + "\n```");
        }
    });
}

module.exports = {
    result: result,
    commands: commands
}