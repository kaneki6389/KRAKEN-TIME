const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Arrête la musique et déconnecte le bot du canal vocal"),

  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guild.id);
    if (!queue || !queue.isPlaying()) return interaction.reply({ content: "Aucune musique ne joue actuellement.", ephemeral: true });

    queue.node.stop();
    return interaction.reply("⏹️ La musique a été arrêtée et je suis déconnecté du salon vocal.");
  }
};
