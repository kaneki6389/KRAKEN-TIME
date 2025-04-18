const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bannit un utilisateur du serveur")
    .addUserOption(option => 
      option.setName("target")
        .setDescription("L'utilisateur à bannir")
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    
    if (!interaction.member.permissions.has("BAN_MEMBERS")) {
      return interaction.reply({ content: "Vous n'avez pas la permission de bannir des membres.", ephemeral: true });
    }
    
    try {
      const member = await interaction.guild.members.fetch(target.id);
      if (!member.bannable) {
        return interaction.reply({ content: "Je ne peux pas bannir cet utilisateur.", ephemeral: true });
      }

      await member.ban({ reason: "Action de modération" });
      return interaction.reply({ content: `${target.tag} a été banni du serveur.` });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: "Une erreur s'est produite lors du bannissement.", ephemeral: true });
    }
  }
};
