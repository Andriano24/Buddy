import { Message, User } from "discord.js";
import Language from "./language";

export default MessageContent;

type MessageContent = {
	message: Message;
	author: User;
	command: string;
	args: string[];
	language: Language;
	lang: string;
	prefix: string;
};