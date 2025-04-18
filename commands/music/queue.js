const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Affiche la file d'attente des musiques"),

  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guild.id);

    if (!queue || queue.tracks.length === 0) {
      return interaction.reply({ content: "La file d'attente est vide.", ephemeral: true });
    }

    const tracks = queue.tracks.slice(0, 10);
    const trackList = tracks.map((track, i) => `${i + 1}. **${track.title}**`).join("\n");

    return interaction.reply({ content: `🎧 File d'attente :\n${trackList}`, ephemeral: false });
  }
};
