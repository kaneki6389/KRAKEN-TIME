const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Active ou désactive la boucle pour la musique en cours"),

  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guild.id);

    if (!queue || !queue.isPlaying()) {
      return interaction.reply({ content: "Aucune musique en cours.", ephemeral: true });
    }

    const currentTrack = queue.currentTrack;
    const isLooping = queue.repeatMode === 1;

    if (isLooping) {
      queue.setRepeatMode(0); // Désactive la boucle
      return interaction.reply({ content: `🔁 Boucle désactivée pour **${currentTrack.title}**.` });
    } else {
      queue.setRepeatMode(1); // Active la boucle
      return interaction.reply({ content: `🔁 Boucle activée pour **${currentTrack.title}**.` });
    }
  }
};
