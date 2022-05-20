import { Message } from "discord.js";
import config from "../config.json";
import guildSchema from "../schemas/guild";
import { owner } from "../index/ready";
import MessageContentExt from "../types/messageContentExt";
import Language from "../types/language";
import english from "../languages/english.json";
import greek from "../languages/greek.json";
import commandHandler from "./commandHandler";

export async function messageCreate(message: Message) {
	if (message.author.bot || !message.inGuild()) return;

	// console.log(
	// 	`${message.guild} - #${(message.channel as TextChannel).name} => ${message.author.tag}: ${message.content}`
	// );

	var prefix: string = config.prefix;
	var language: Language;

	guildSchema.findOne({ guildId: message.guildId }, (err: any, guild: any) => {
		if (err) {
			console.log(err);
			owner?.send(err);
			message.reply({
				content: `${english.Bot.error}`,
				allowedMentions: { repliedUser: false },
			});
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
					owner?.send(err);
					message.reply({
						content: `${english.Bot.error}`,
						allowedMentions: { repliedUser: false },
					});
					return;
				}
			});
		}

		if (guild.language == "en") {
			language = Object.assign({}, english);
		}
		if (guild.language == "gr") {
			language = Object.assign({}, greek);
		}

		prefix = guild.prefix;
		
		if (message.content.startsWith(prefix)) {
		const [command, ...args] = message.content
			.trim()
			.substring(prefix.length)
			.toLowerCase()
			.split(/\s+/);

		var messageContentExt: MessageContentExt = {
			message: message,
			author: message.author.id,
			command: command,
			args: args,
			language: language,
			prefix: prefix,
		};

		commandHandler(messageContentExt);
	}
	});

	
}
