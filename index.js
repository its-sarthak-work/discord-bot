const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive!");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const ROLE_IDS = [
  "1503623505533468692",
  "1503623623636684893"
];
client.on("guildMemberAdd", async (member) => {
  console.log(`${member.user.tag} joined`);

  if (member.user.bot) {
    console.log("Bot detected");

    try {
      await member.roles.add(ROLE_IDS);
      console.log(`Role added to ${member.user.tag}`);
    } catch (err) {
      console.error("ERROR:", err);
    }
  }
});

client.once("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);