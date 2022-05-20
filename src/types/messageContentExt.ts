import { Message } from "discord.js";
import Language from "./language";

export default MessageContentExt;

type MessageContentExt = {
	message: Message;
	author: string;
	command: string;
	args: string[];
	language: Language;
	prefix: string;
};