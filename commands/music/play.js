const { SlashCommandBuilder } = require("discord.js");
const { Player } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Joue une musique")
    .addStringOption(option =>
      option.setName("query")
        .setDescription("Titre ou URL de la musique")
        .setRequired(true)
    ),

  async execute(interaction, player) {
    const query = interaction.options.getString("query");
    const channel = interaction.member.voice.channel;

    if (!channel) return interaction.reply({ content: "Tu dois être dans un salon vocal pour jouer de la musique.", ephemeral: true });

    const result = await player.search(query, {
      requestedBy: interaction.user,
    });

    if (!result || !result.tracks.length) {
      return interaction.reply({ content: "Aucune musique trouvée.", ephemeral: true });
    }

    await player.play(channel, result.tracks[0], {
      nodeOptions: {
        metadata: {
          channel: interaction.channel,
          client: interaction.guild.members.me,
          requestedBy: interaction.user,
        }
      }
    });

    return interaction.reply(`🎶 Lecture de : **${result.tracks[0].title}**`);
  }
};
