import { Message, TextChannel } from "discord.js";
import config from "../config.json";
import guildSchema from "../schemas/guild";
import MessageContent from "../types/messageContent";
import Language from "../types/language";
import english from "../languages/english.json";
import commandHandler from "./commandHandler";
import languageSet from "./languageSet";

export async function messageCreate(message: Message) {
	if (message.author.bot || !message.inGuild()) return;

	console.log(`${message.guild} - #${(message.channel as TextChannel).name} => ${message.author.tag}: ${message.content}`);

	var prefix: string = config.prefix;
	var language: Language;

	guildSchema.findOne({ guildId: message.guildId as string }, (err: any, guild: any) => {
		if (err) {
			console.log(err);
			message.reply({content: `${english.Bot.error}`, allowedMentions: { repliedUser: false },});
			return;
		}

		if (!guild) {
			guild = new guildSchema({
				guildId: message.guildId,
				prefix: config.prefix,
				language: config.language,
			});

			guild.save((err: any) => {
				if (err) {
					console.log(err);
					message.reply({content: `${english.Bot.error}.`, allowedMentions: { repliedUser: false },});
					return;
				}
			});
		}

		language = languageSet(guild.language);

		prefix = guild.prefix;
		
		if (message.content.startsWith(prefix)) {
		const [command, ...args] = message.content
			.trim()
			.substring(prefix.length)
			.toLowerCase()
			.split(/\s+/);

		var messageContent: MessageContent = {
			message: message,
			author: message.author,
			command: command,
			args: args,
			language: language,
			lang: guild.language,
			prefix: prefix
		};

		commandHandler(messageContent);
	}
	});
}
