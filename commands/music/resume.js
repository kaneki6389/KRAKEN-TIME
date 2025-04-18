const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Reprend la lecture de la musique"),

  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guild.id);
    if (!queue || !queue.isPlaying()) return interaction.reply({ content: "Aucune musique ne joue actuellement.", ephemeral: true });
    if (!queue.node.isPaused()) return interaction.reply({ content: "La musique est déjà en cours de lecture.", ephemeral: true });

    queue.node.setPaused(false);
    return interaction.reply("▶️ La musique a été reprise.");
  }
};
