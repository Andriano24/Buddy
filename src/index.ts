import { Client, Intents, Interaction, Message } from "discord.js";
import config from "./config.json";
import { ready } from "./index/ready";
import { messageCreate } from "./index/messageCreate";
import { interactionCreate } from "./index/interactionCreate";
import { checkPetCalculatorCalled } from "./index/checkPetCalculatorCalled";

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES,
	],
	partials: ["CHANNEL"],
});

client.login(config.token);

client.once("ready", async () => {
	ready(client);

	setInterval(checkPetCalculatorCalled, 1000 * 10);
});

client.on("messageCreate", async (message: Message) => {
	messageCreate(message);
});

client.on("interactionCreate", (interaction: Interaction) => {
	interactionCreate(interaction);
});