const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("np")
    .setDescription("Affiche la musique en cours"),

  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guild.id);

    if (!queue || !queue.currentTrack) {
      return interaction.reply({ content: "Aucune musique en cours.", ephemeral: true });
    }

    return interaction.reply({ content: `🎵 Musique en cours : **${queue.currentTrack.title}**` });
  }
};
