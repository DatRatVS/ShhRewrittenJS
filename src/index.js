require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");
const fs = require("fs");

let chinelo;
let chosenChannel = fs.readFileSync("channel.json").toString();

const phrases = [
  "na minha epoca as pessoas não falavam, fica xiu",
  "vai dar meia hora de bunda com o relógio parado",
  "eu não quero conversar com você cara, some",
  "você só fala mano meu deus",
  "<https://bit.ly/36jQxzk>",
  "minha vontade é encher a sua boca na porrada",
  "CALA A BOCA PORRAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "mano, acho que tu ja percebeu que eu quero que tu cale a porra da boca",
  "aooooo vai toma no cu google CALA A BOCA",
  "VOCÊ NÃO PODE SE AJUDAR A CALAR A BOCA?",
  "vai ser contratado pro vasco se continuar falando mlk, para logo",
  "uiuiui, um sistema unificado pras universidades, CALA A PORRA DA BOCA NINGUEM LIGA",
  "que corte de cabelo dahora mano, KKKKKKKKKKKKKKKKK AGORA TE CALA",
  "deu até ânsia de tanto que tu fala mlk, fica xiu",
  "mano tu parece o voyager 3, PARA, DE, FALAR",
  "tu tem problema mlk só pode",
  "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk seu inútil, CALA A PORRA DA BOCA",
  "pindamonhangabaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "🤫🤫🤫🤫🤫🤫🤫🤫",
  "parou?",
  "vai dormir caralho, tu tem que calar a porra da boca",
  "paraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "meu deeeeeeeeeeeeeeeus vai arrumar algo pra fazer seu vagabundo inútil",
  "porra de rolê cosmico caralho, kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
  "vascoooooooooooooooo",
  "neeeee noooooo neeeeee nooooooo",
  "tu chega fede feijoada mano",
  "fala mais algo pra tu ver ai, duvido",
  "tenta dnv mano",
  "hoje não kkkkkkkkkkkkkk",
  "me manda um pix que eu te deixo falar",
  "falou tudo mas falou nada",
  "qual foi?",
  "tá ratiando mlk, só cala a boca",
  "pena é a nossa diferença de idade",
  "sai filho da puta",
  "mastiga biscoito no meu ouvido mano, vai",
  "esse vermelho tá mais pra rosa, só calar a boquinha",
  "seu miserável (não desmerecendo sua história)",
  "vai a bosta",
  "to perdendo minhas redeas, só para, tá bom amigão?",
  "vai se foder lambisgoia filha da puta",
  "seu projetinho de nerdola 🤓🤓🤓🤓🤓",
  "👍",
  "positivo capitão broxa, agora vai pro caralho",
];

const activities = [
  "calando boquinhas desde 21/02/2022",
  "fica xiu mano, to te vendo",
  "eu não quero conversar com você cara, some",
  "puta que pariu que cara chato",
  "https://bit.ly/36jQxzk",
  "cope",
  "ratio",
  "didn't ask",
  "cringe",
  "you fell off",
  "don't care",
  "skill issue",
  "cancelled",
  "quote tweet",
  "counter ratio",
  "blocked",
  "pinged owner",
  "erration",
  "cry about it",
];

const pickPhrase = () => {
  let randomPhrase = Math.floor(Math.random() * phrases.length);
  phrase = phrases[randomPhrase];

  return phrase;
};

const randomActivity = () => {
  let getRandomActivity = Math.floor(Math.random() * activities.length);
  activity = activities[getRandomActivity];

  client.user.setPresence({
    activities: [{ name: activity, type: ActivityType.Playing }],
    status: "idle",
  });

  setTimeout(randomActivity, 1000 * 24);
};

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log("================================");
  console.log("");
  console.log(`Logged @ ${c.user.tag}`);
  console.log(`ID Info: ${c.user.id}`);
  console.log("");
  console.log("================================");

  chinelo = false;

  randomActivity();
});

client.on("messageCreate", (message) => {
  if (message.author.id === client.user.id) return;
  if (message.content === "chosenChannel") {
    message.reply(chosenChannel);
    return;
  }
  if (chosenChannel != `{"channelid":"${String(message.channel)}"}`) return;
  if (chinelo) {
    message.reply(pickPhrase()).then(() => message.delete());
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.member.permissions.has("0x0000000000002000")) {
    interaction.reply("menó, cê nem tem permissão, rala fora doente");
    return;
  }

  if (interaction.commandName === "chinelo") {
    if (!chinelo) {
      interaction.reply("é pra já kkkkkkkkkk");
    } else interaction.reply("mas eu já peguei o chinelo caralho");

    chinelo = true;

    client.user.setPresence({ status: "online" });
  }

  if (interaction.commandName === "pegarchinelo") {
    if (chinelo) {
      interaction.reply("beleza chefia tá liberado");
    } else interaction.reply("eu nem tirei a porra do chinelo ainda, tá ficando louco?");

    chinelo = false;

    client.user.setPresence({ status: "idle" });
  }

  if (interaction.commandName === "setarcanal") {
    chosenChannel = `{"channelid":"<#${interaction.channel.id}>"}`;
    const newChannel = {
      channelid: `<#${interaction.channel.id}>`,
    };

    fs.writeFile("channel.json", JSON.stringify(newChannel), (error) => {
      if (error) console.error(error);
      console.log('Data in "channel.json" were written correctly...');
    });

    interaction.reply("setei pra esse canalzinho aqui, estrala os dedos ae");
  }
});

client.login(process.env.TOKEN);
