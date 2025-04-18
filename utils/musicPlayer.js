const { Player } = require("discord-player");

function setupPlayer(client) {
  const player = new Player(client, {
    ytdlOptions: {
      quality: "highestaudio",
      highWaterMark: 1 << 25
    }
  });

  player.extractors.loadDefault();

  // Logs
  player.events.on("playerStart", (queue, track) => {
    queue.metadata.channel.send(`🎵 Lecture : **${track.title}**`);
  });

  player.events.on("error", (queue, error) => {
    console.error(`❌ Erreur dans la file : ${error.message}`);
  });

  // Injecter le player dans le client pour l’utiliser dans les commandes
  client.player = player;
}

module.exports = setupPlayer;
