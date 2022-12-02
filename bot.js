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
const { commands, result } = require("./command");
const { python, nodejs } = require("./run");

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
        switch (data[0]) {
            case "js":
                const js = await nodejs(data[1]);
                interaction.editReply(await result(js));
                return;
            case "py":
                const py = await python(data[1]);
                interaction.editReply(await result(py));
                return;
            default:
                interaction.editReply("実行するものがありません");
        }
    } else {
        interaction.reply("実行するものがありません");
    }
});


client.login(token);