import { Message } from "discord.js";
import languageType from "../schemas/language";

export default message;

type message = {
	message: Message;
	author: string;
	command: string;
	args: string[];
	language: languageType;
	prefix: string;
};