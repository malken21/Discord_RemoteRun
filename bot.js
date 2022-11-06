const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const { token, ServerID } = require("./Config.json");
const { start, commands } = require("./command");

client.on(Events.ClientReady, async () => {

    client.application.commands.set([commands], ServerID);//コマンド生成
    console.log(`login: (${client.user.tag})`);
});


client.on(Events.InteractionCreate, async interaction => {
    const message = interaction.targetMessage;

    let content = message.content.split("```");
    if (content.length == 3) {
        await interaction.deferReply();
        content = content[1].split(/\n/);
        const data = [];
        data.unshift(content.shift());
        data.push(content.join("\n"));
        interaction.editReply(await start(data));
    } else {
        interaction.reply("実行するものがありません");
    }
});


client.login(token);