import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";
import "dotenv/config";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});

client.once("ready", () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "weather") {
        const ville = interaction.options.getString("city");

        try {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${process.env.WEATHER_API}&lang=fr&units=metric`;
            const res = await axios.get(url);
            const data = res.data;

            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const emoji = getEmoji(data.weather[0].main);

            await interaction.reply(`${emoji} **${ville}** : ${temp}°C, ${desc}`);
        } catch (err) {
            await interaction.reply("⚠️ City not found or API error.");
        }
    }
});

function getEmoji(condition) {
    switch (condition) {
        case "Clear": return "☀️";
        case "Clouds": return "☁️";
        case "Rain": return "🌧️";
        case "Snow": return "❄️";
        case "Thunderstorm": return "⛈️";
        default: return "🌍";
    }
}

client.login(process.env.DISCORD_TOKEN);