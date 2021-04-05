const Discord = require("discord.js");
const config = require("./config.json");

const isCode = (str) => {
    const re = /\(\)|;\n|[a-zA-Z0-9]\s*=>\s*[a-zA-Z0-9]\n|\[|\]|{|}|\+|\*|&&|\||==|!=|::|__|[a-z]+[A-Z]/g
    return str.split("\n").length < 5 ? 0 : parseInt(100 * (((str || '').match(re) || []).length * (str.split("\n").length) / (str.length / 6)))
}

const client = new Discord.Client();

client.login(config.BOT_TOKEN);


client.on("message", function (message) {
    if (message.author.bot) return;
    if(message.content.split("\n").length > 34){
        message.delete(0);
        message.reply(`
        <https://paste.gg/>
        <https://pastecord.com/>
        <https://hatebin.com/>
        <https://del.dog/>`)
    }else
    if (!message.content.match(/```.*```/s)) {
        if (isCode(message.content) > 75) {
            message.reply(`
    Surround code with: 
    \\\`\\\`\\\`language
    foo = 42
    \\\`\\\`\\\`
    This outputs: 
    \`\`\`language
    foo = 42\`\`\`

    Replace "language" in the example with java, cpp, python, etc. There should be no space/line between the language and the first backtick (\`), not to be confused with a single quote (').
            `);
        }
    }

});


