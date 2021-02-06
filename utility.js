const axios = require("axios");
const queryString = require("query-string");
const fs = require('fs');
const path = require('path');
const randomstring = require("randomstring");

const Commands = require("./command.json");
const log = require("./simple-logger");

const gbCloudServer = process.env.GB_CLOUD_URL || "http://localhost:1989/";
const gbImageURL = new URL("/image", gbCloudServer).href;

const PARSE_ERROR = {
    BOT_MESSAGE : "__BOT__",
    COMMAND_EMPTY : "__EMPTY__",
    PARAMS_EMPTY : "__PARAM_EMPTY__",
    INVALID_PREFIX : "__INVALID_PREFIX__",
    UNABLE_COMMAND : "__UNABLE_COMMAND__"
}

const CONTROLLER_CODE = {
    RIGHT : 0,
    LEFT : 1,
    UP : 2,
    DOWN : 3,
    A : 4,
    B : 5,
    SELECT : 6,
    START : 7
}

function PrefixHit(command)
{
    for (prefix of Commands.prefix) 
    {
        if (command.startsWith(prefix))
        {
            return true;
        }
    }

    return false;
}

/**
 * @param {Discord.Message} message 
 * @returns {string}
 */
function CommandParser(message)
{
    let command = "";
    let useShortCommand = false;

    log.d("Start parsing command");
    log.d("Parsing content : ", message.content);

    if (message.author.bot)
    {
        log.d("This command from bot. Terminate.");

        return PARSE_ERROR.BOT_MESSAGE;
    }

    let args = message.content.toLowerCase().trim().split(" ");
    if (args.length === 0)
    {
        log.d("Command nothing sent");

        return PARSE_ERROR.BOT_MESSAGE;
    }

    let isPrefixHit = PrefixHit(args[0]);
    if (isPrefixHit)
    {
        if (args[0].length > prefix.length)
        {
            log.d("Short command detected. Use short command.");

            command = args[0].slice(prefix.length);
            useShortCommand = true;
        }
        else
        {
            if (args.length <= 1)
            {
                log.d("Parameters didn't pass! Terminate.");
        
                return PARSE_ERROR.PARAMS_EMPTY;
            }

            command = args[1];
        }
    }
    else
    {
        log.d("Command prefix not hitted!. Terminate.");

        return PARSE_ERROR.INVALID_PREFIX;
    }

    for (commandName in Commands.commands)
    {
        let commandList = [];
        if (useShortCommand)
        {
            commandList = Commands.commands[commandName].short;
        }
        else
        {
            commandList = Commands.commands[commandName].default;
        }

        for (let i = 0 ; i < commandList.length ; i++)
        {
            if (command === commandList[i])
            {
                log.d("Command parsing success!", commandName);

                return commandName;
            }
        }
    }

    log.d("Failed to find command!");
    return PARSE_ERROR.UNABLE_COMMAND;
}

async function GetImage()
{
    const hash = randomstring.generate(10);
    const image = `gb-poke-${hash}.png`;

    const newImagePath = path.join(__dirname, "/public", `/${image}`);
    let response = await axios.get(gbImageURL, {responseType: "stream"});
    response.data.pipe(fs.createWriteStream(newImagePath));

    return new URL(`/${image}`, process.env.HOST_URL).href;
} 

async function InputControl(controllerCode)
{
    const query = {
        button : controllerCode,
        callback : gbImageURL
    }

    const controlURL = queryString.stringifyUrl({
        url : new URL("/control", gbCloudServer).href,
        query
    });

    await axios.get(controlURL);
}

module.exports = {
    PrefixHit,
    CommandParser,
    GetImage,
    InputControl,
    gbImageURL,
    CONTROLLER_CODE,
    PARSE_ERROR
};