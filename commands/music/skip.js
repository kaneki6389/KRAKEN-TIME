module.exports = {
  name: "skip",
  description: "Passe à la musique suivante",
  execute(message, args, client) {
    const queue = client.player.nodes.get(message.guild.id);
    if (!queue || !queue.isPlaying()) return message.reply("Rien à passer.");
    queue.node.skip();
    message.channel.send("⏭️ Musique suivante !");
  }
};