const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Expulse un utilisateur du serveur")
    .addUserOption(option => 
      option.setName("target")
        .setDescription("L'utilisateur à expulser")
        .setRequired(true)
    ),
  
  async execute(interaction) {
    const target = interaction.options.getUser("target");
    
    if (!interaction.member.permissions.has("KICK_MEMBERS")) {
      return interaction.reply({ content: "Vous n'avez pas la permission d'expulser des membres.", ephemeral: true });
    }
    
    try {
      const member = await interaction.guild.members.fetch(target.id);
      if (!member.kickable) {
        return interaction.reply({ content: "Je ne peux pas expulser cet utilisateur.", ephemeral: true });
      }

      await member.kick("Action de modération");
      return interaction.reply({ content: `${target.tag} a été expulsé du serveur.` });
    } catch (error) {
      console.error(error);
      return interaction.reply({ content: "Une erreur s'est produite lors de l'expulsion.", ephemeral: true });
    }
  }
};
