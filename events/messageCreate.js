const fs = require("fs");
const prefix = require("../config.json").prefix;

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const folders = ["moderation", "music"];
    let commandFound = false;
    
    for (const folder of folders) {
      const commandPath = `./commands/${folder}/${commandName}.js`;
      console.log(`Vérification du chemin: ${commandPath}`); // Log pour déboguer

      if (fs.existsSync(commandPath)) {
        console.log(`Commande trouvée: ${commandPath}`); // Log pour déboguer
        const command = require(commandPath);
        await command.execute(message, args, client);
        commandFound = true;
        break;
      }
    }

    if (!commandFound) {
      message.reply("Commande inconnue.");
    }
  }
};
