require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
});

// Créer une instance du player de musique
client.player = new Player(client);

// Initialisation des événements
client.on("ready", () => {
  console.log(`${client.user.tag} est connecté !`);
});

// Intégration des commandes
const fs = require("fs");
const path = require("path");
client.commands = new Map();

const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(path.join(__dirname, "commands", folder)).filter(file => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", folder, file));
    client.commands.set(command.name, command);
  }
}

// Événement pour recevoir les messages
const messageCreate = require("./events/messageCreate");
client.on("messageCreate", (message) => messageCreate.execute(message, client));

// Connexion du bot avec le token
client.login(process.env.TOKEN);
