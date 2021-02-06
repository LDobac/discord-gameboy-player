require("dotenv").config();
require("./cron");

const express = require("express");
const queryString = require('query-string');
const Discord = require("discord.js");

const { PrefixHit, CommandParser, PARSE_ERROR } = require("./utility");
const log = require("./simple-logger");
const action = require("./actions");

const expressApp = express();
const discordApp = new Discord.Client();

discordApp.once("ready", () => {
    log.i("Discord client is ready.");
})

discordApp.on("message", async (message) => {
    const command = CommandParser(message);

    if (command === PARSE_ERROR.BOT_MESSAGE) return;
    if (PrefixHit(message.content) && Object.values(PARSE_ERROR).includes(command))
    {
        // Show usage
        message.channel.send("잘못된 조작법!\n조작법 확인은 !p help 또는 !ph 또는 !p helloworld 또는 !p hell 또는 !p 도움! 또는 !p 도움말 또는 !p 헬프");
        return;
    }

    switch (command) {
        case "d":
            message.channel.send('라');
            break;
        case "g":
            message.channel.send('!');
            break;
        case "help":
            message.channel.send({ embed : await action.Help()});
            break;
        case "left":
            message.channel.send({ embed : await action.Left()});
            break;
        case "right":
            message.channel.send({ embed : await action.Right()});
            break;
        case "up":
            message.channel.send({ embed : await action.Up()});
            break;
        case "down":
            message.channel.send({ embed : await action.Down()});
            break;
        case "a":
            message.channel.send({ embed : await action.A()});
            break;
        case "b":
            message.channel.send({ embed : await action.B()});
            break;
        case "select":
            message.channel.send({ embed : await action.Select()});
            break;
        case "start":
            message.channel.send({ embed : await action.Start()});
            break;
        case "image":
            message.channel.send({ embed : await action.Image()});
            break;
        default:
            log.w("undefined action at this command :", command);
            break;
    }
});

expressApp.use(express.static("public"));

expressApp.get("/", (req, res) => {
    return res.send("Hello, World!");
});

expressApp.get("/register", (req, res) => {
    const DiscordBaseURL = "https://discord.com/api";

    let authAPI = new URL("/oauth2/authorize", DiscordBaseURL).href;

    const query = {
        client_id : process.env.DISCORD_CLIENT_ID,
        permissions : 0,
        scope : "bot"
    };

    const url = queryString.stringifyUrl({
        url : authAPI,
        query
    })

    return res.redirect(url);
});

const port = process.env.PORT || 8080;
expressApp.listen(port, () => {
    log.i(`Pokemon-bot listening at ${port}`);
});

discordApp.login(process.env.DISCORD_BOT_TOKEN);