import { REST, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config";

const commands = [
    new SlashCommandBuilder()
        .setName("weather")
        .setDescription("Obtain the weather of any city")
        .addStringOption(option =>
            option.setName("city")
                .setDescription("The name of the city")
                .setRequired(true)
        )
        .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log("Deploying...");
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log("Commands deployed!");
    } catch (error) {
        console.error(error);
    }
})();
