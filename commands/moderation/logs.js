const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Affiche les logs de modération"),
  
  async execute(interaction) {
    const logsChannel = interaction.guild.channels.cache.find(channel => channel.name === "mod-logs");
    
    if (!logsChannel) {
      return interaction.reply({ content: "Aucun canal de logs trouvé.", ephemeral: true });
    }

    // On suppose ici que les logs sont dans un canal spécifique comme "mod-logs"
    const logs = await logsChannel.messages.fetch({ limit: 5 });
    const logMessages = logs.map(msg => `${msg.author.tag}: ${msg.content}`).join("\n");

    if (!logMessages) {
      return interaction.reply({ content: "Aucun log récent trouvé.", ephemeral: true });
    }

    return interaction.reply({ content: `Derniers logs de modération :\n${logMessages}`, ephemeral: true });
  }
};
