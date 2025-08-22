import axios from "axios";

export async function ping(interaction)
{
    try {
        await interaction.reply("pong!");
    } catch (err) {
        console.error(err);
    }
}