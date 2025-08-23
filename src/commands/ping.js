import axios from "axios";

export async function ping(interaction)
{
    try {
        await interaction.reply("pong! Online and ready to tell you the weather.");
    } catch (err) {
        console.error(err);
    }
}