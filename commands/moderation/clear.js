module.exports = {
  name: "clear",
  description: "Supprimer un nombre de messages",
  async execute(message, args) {
    if (!message.member.permissions.has("ManageMessages")) return message.reply("Tu n'as pas la permission.");
    const amount = parseInt(args[0]);
    if (isNaN(amount) || amount <= 0 || amount > 100) return message.reply("Donne un nombre entre 1 et 100.");
    await message.channel.bulkDelete(amount, true);
    message.channel.send(`${amount} messages supprimés.`).then(m => setTimeout(() => m.delete(), 3000));
  },
};