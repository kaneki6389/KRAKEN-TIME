const { prefix } = require("../config.json");
const fs = require("fs");

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    console.log("Message reçu:", message.content); // Ajouter un log pour vérifier les messages

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    console.log("Commande reçue:", commandName); // Ajouter un log pour voir la commande

    const folders = ["moderation", "music"];
    for (const folder of folders) {
      const commandPath = `./commands/${folder}/${commandName}.js`;
      if (fs.existsSync(commandPath)) {
        const command = require(commandPath);
        return command.execute(message, args, client);
      }
    }

    message.reply("Commande inconnue.");
  }
};
