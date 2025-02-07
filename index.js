const {Client, Events, IntentsBitField, Guild, EmbedBuilder, Collection} = require("discord.js");
const config = require("./config.json");
const path = require("node:path");
const fs = require("node:fs");
const client = new Client({
    intents:[
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildModeration,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent
]});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolder = fs.readdirSync(foldersPath);
for (const folder of commandFolder) {
    const commandsPath = path.join(foldersPath, folder);
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const commands = require(filePath);
        if ('data' in commands && 'execute' in commands) {
            client.commands.set(commands.data.name, commands);
        }
        else {
            console.log(`Error: ${file} is missing data or execute function`);
        }
    }
}


client.once(Events.ClientReady, bot => {
    console.log(`logged in as ${bot.user.username}`)
})



client.on('messageCreate', (msg) => {
    if (msg.content == 'praxis') {
        msg.reply('Praxis is always here to serve you')
    }
})


client.on(Events.InteractionCreate, async interaction => {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    }catch(error){
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});


client.login(config["token"])