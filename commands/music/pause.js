const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Met la musique en pause"),

  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guild.id);
    if (!queue || !queue.isPlaying()) return interaction.reply({ content: "Aucune musique ne joue actuellement.", ephemeral: true });
    if (queue.node.isPaused()) return interaction.reply({ content: "La musique est déjà en pause.", ephemeral: true });

    queue.node.setPaused(true);
    return interaction.reply("⏸️ La musique a été mise en pause.");
  }
};
