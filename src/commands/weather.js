import axios from "axios";

function getEmoji(condition) {
    let hour = new Date().getHours()
    if (hour === (6 || 7 || 8 || 9 || 10 || 11 || 12 || 13 || 14 || 15 || 16 || 17))
    {
        switch (condition) {
            case "Clear": return "☀️";
            case "Clouds": return "☁️";
            case "Rain": return "🌧️";
            case "Snow": return "❄️";
            case "Thunderstorm": return "⛈️";
            default: return "🌍";
        }
    }
    else {
        switch (condition) {
            case "Clear": return "🌕";
            case "Clouds": return "☁️";
            case "Rain": return "🌧️";
            case "Snow": return "❄️";
            case "Thunderstorm": return "⛈️";
            default: return "🌍";
        }
    }
}

export async function weather(interaction, city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API}&lang=fr&units=metric`;
        const res = await axios.get(url);
        const data = res.data;

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const emoji = getEmoji(data.weather[0].main);

        await interaction.reply({
            content: `${emoji} **${city}** : ${temp}°C, ${desc}`,
            flags: 64
        });
    } catch (err) {
        await interaction.reply({
            content: "⚠️ City not found or API error.",
            flags: 64
        });
    }
}
