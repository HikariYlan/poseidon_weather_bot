import axios from "axios";

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

export async function weather(interaction, city) {
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}&lang=fr&units=metric`;
        const res = await axios.get(url);
        const data = res.data;

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const emoji = getEmoji(data.weather[0].main);

        await interaction.reply(`${emoji} **${city}** : ${temp}°C, ${desc}`);
    } catch (err) {
        await interaction.reply("⚠️ City not found or API error.");
    }
}