const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tempmute")
    .setDescription("Mute un utilisateur pour une durée spécifiée (texte et vocal)")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("L'utilisateur à mute")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("duration")
        .setDescription("Durée du mute en secondes")
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    const duration = interaction.options.getInteger("duration");

    if (!interaction.member.permissions.has("MUTE_MEMBERS")) {
      return interaction.reply({ content: "Vous n'avez pas la permission de muter des membres.", ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(target.id);
      
      if (!member.manageable) {
        return interaction.reply({ content: "Je ne peux pas mute cet utilisateur.", ephemeral: true });
      }

      // Mute l'utilisateur sur le texte
      await member.timeout(duration * 1000, "Mute temporaire").catch((err) => {
        return interaction.reply({ content: "Impossible de mute cet utilisateur sur le texte.", ephemeral: true });
      });

      // Mute l'utilisateur dans le vocal
      await member.voice.setMute(true).catch((err) => {
        return interaction.reply({ content: "Impossible de mute cet utilisateur dans le vocal.", ephemeral: true });
      });

      // Confirmation
      await interaction.reply({ content: `${target.tag} a été mute pendant ${duration} secondes.` });

      // Après la durée du mute, on réactive l'utilisateur
      setTimeout(async () => {
        try {
          await member.timeout(null); // Annule le mute sur le texte
          await member.voice.setMute(false); // Annule le mute dans le vocal
          await interaction.followUp({ content: `${target.tag} a été démuté après ${duration} secondes.` });
        } catch (error) {
          console.error(error);
        }
      }, duration * 1000);
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: "Une erreur est survenue lors du mute de l'utilisateur.", ephemeral: true });
    }
  }
};
