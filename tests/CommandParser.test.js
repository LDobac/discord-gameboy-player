const Commands = require("../command.json");
const { CommandParser } = require("../utility");

const GetCorrectCommandData = () => {
    let testCommands = { };

    for (prefix of Commands.prefix)
    {
        for (commandName in Commands.commands)
        {
            const defaultCommand = Commands.commands[commandName].default;
            const shortCommand = Commands.commands[commandName].short;

            let testCommandList = [];
            if (testCommands[commandName])
            {
                testCommandList = testCommands[commandName];
            }

            for (let i = 0 ; i < defaultCommand.length ; i++)
            {
                testCommandList.push(prefix + " " + defaultCommand[i]);
            }

            for (let i = 0 ; i < shortCommand.length ; i++)
            {
                testCommandList.push(prefix + shortCommand[i]);
            }

            testCommands[commandName] = testCommandList;
        }
    }

    return testCommands;
};

test("Command Parsing test", () => {
    const testData = GetCorrectCommandData();

    // simple mock Discord.Message
    let message = {
        content : "",
        author : {
            bot : false
        }
    }

    for (commandName in testData)
    {
        for (command of testData[commandName])
        {
            message.content = command;

            expect(CommandParser(message)).toMatch(commandName);
        }
    }
});