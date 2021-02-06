const Discord = require('discord.js');
const { InputControl, GetImage, CONTROLLER_CODE } = require("./utility");

async function BuildMessage()
{
    const imageLink = await GetImage();

    let embedObj = {
        color: 0x0099ff,
        image: {
            url: imageLink
        }
    };

    return embedObj;
}

module.exports.Help = async () =>
{
    let embedObj = await BuildMessage();
    embedObj.title = "조작법";
    embedObj.url = "https://namu.wiki/w/%ED%8F%AC%EC%BC%93%EB%AA%AC%EC%8A%A4%ED%84%B0%20%EB%A0%88%EB%93%9C%C2%B7%EA%B7%B8%EB%A6%B0"
    embedObj.description = "모든 명령어의 접두사는 !p"
    embedObj.fields = [
        { name: '\u200B', value: '\u200B', inline: true },
        { name: '위', value: 'up', inline: true },
        { name: '\u200B', value: '\u200B', inline: true },
        { name: '왼쪽', value: 'left', inline: true },
        { name: '아래', value: 'down', inline: true },
        { name: '오른쪽', value: 'right', inline: true },
        { name: 'A', value: 'a', inline: true },
        { name: 'B', value: 'b', inline: true },
        { name: '\u200B', value: '\u200B', inline: true },            
        { name: '\u200B', value: '\u200B', inline: true },
        { name: 'Select', value: 'select', inline: true },
        { name: 'Start', value: 'start', inline: true },
        { name: '예시', value: '!p up, !p down, !p select, !p a.....' },
        { name: '축약어', value: '!pu, !pd, !pl, !pr, !pa, !pb, !pse, !pst' }
    ];

    return embedObj;
}

module.exports.Left = async () =>
{
    await InputControl(CONTROLLER_CODE.LEFT);

    let embedObj = await BuildMessage();

    return embedObj;
}

module.exports.Right = async () =>
{
    await InputControl(CONTROLLER_CODE.RIGHT);
    
    let embedObj = await BuildMessage();

    return embedObj;
}

module.exports.Up = async () =>
{
    await InputControl(CONTROLLER_CODE.UP);
    
    let embedObj = await BuildMessage();

    return embedObj;
}

module.exports.Down = async () =>
{
    await InputControl(CONTROLLER_CODE.DOWN);
    
    let embedObj = await BuildMessage();

    return embedObj;
}

module.exports.A = async () =>
{
    await InputControl(CONTROLLER_CODE.A);
    
    let embedObj = await BuildMessage();

    return embedObj;
}

module.exports.B = async () =>
{
    await InputControl(CONTROLLER_CODE.B);
    
    let embedObj = await BuildMessage();

    return embedObj;
}

module.exports.Select = async () =>
{
    await InputControl(CONTROLLER_CODE.SELECT);
    
    let embedObj = await BuildMessage();

    return embedObj;
}

module.exports.Start = async () =>
{
    await InputControl(CONTROLLER_CODE.START);
    
    let embedObj = await BuildMessage();

    return embedObj;
}

module.exports.Image = async () =>
{
    let embedObj = await BuildMessage();

    return embedObj;
}