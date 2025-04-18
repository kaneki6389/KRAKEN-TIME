const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Change le volume de la musique")
    .addIntegerOption(option =>
      option.setName("pourcentage")
        .setDescription("Volume (0-100)")
        .setRequired(true)
    ),

  async execute(interaction, player) {
    const volume = interaction.options.getInteger("pourcentage");

    if (volume < 0 || volume > 100) {
      return interaction.reply({ content: "Le volume doit être entre 0 et 100.", ephemeral: true });
    }

    const queue = player.getQueue(interaction.guild.id);

    if (!queue || !queue.isPlaying()) {
      return interaction.reply({ content: "Aucune musique en cours.", ephemeral: true });
    }

    queue.setVolume(volume);
    return interaction.reply({ content: `🔊 Volume réglé à ${volume}%` });
  }
};
