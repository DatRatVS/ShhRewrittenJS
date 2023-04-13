require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "chinelo",
    description: "Coloca eles no chinelo... >:)",
  },
  {
    name: "pegarchinelo",
    description: "Tira eles do chinelo... :(",
  },
  {
    name: "setarcanal",
    description: "Use esse comando no canal que calarei bocas... :>",
  },
  {
    name: "ping",
    description: "Use esse comando para ver meu ping à API... :3",
  }
];

const guildId = "000000000000000000";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering Slash Commands...");
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
      { body: commands }
    );
    console.log(`Slash Commands registered on ${guildId}!`);
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
})();
