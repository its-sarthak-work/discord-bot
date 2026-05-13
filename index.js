const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

const ROLE_ID = "1503623505533468692";

client.on("guildMemberAdd", async (member) => {
  console.log(`${member.user.tag} joined`);

  if (member.user.bot) {
    console.log("Bot detected");

    try {
      await member.roles.add(ROLE_ID);
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