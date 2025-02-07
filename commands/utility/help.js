const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
    data: 
    new SlashCommandBuilder()
    .setName("help")
    .setDescription("Don't worry, we got you!"),
    async execute(interaction){
        
        const help = new EmbedBuilder()
            .setTitle("Praxis support")
            .setURL("https://getpraxis.web.app")
            .setColor(0x507da0)
            .setAuthor({name : interaction.client.user.username, iconURL : interaction.client.user.displayAvatarURL()})
            .setDescription("Please visit the webiste for more information")
        await interaction.reply({embeds: [help]});
    }
}