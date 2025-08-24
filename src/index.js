import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import {weather} from "./commands/weather.js";
import {ping} from "./commands/ping.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});

client.once("ready", () => {
    console.log(`✅ Connected as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    /*
    Template to add a command:
         if (interaction.commandName === "name_of_the_command") {

            await name_of_the_function(interaction);
        }
     */

    if (interaction.commandName === "weather") {
        const city = interaction.options.getString("city");

        await weather(interaction, city);
    }

    if (interaction.commandName === "ping") {

        await ping(interaction);
    }
});

client.login(process.env.DISCORD_TOKEN);