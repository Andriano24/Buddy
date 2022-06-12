import { Message, MessageActionRow, MessageEmbed, User } from "discord.js";
import Language from "./language";

export default PetCalculator;

type PetCalculator = {
	messageBotReply: Message | undefined;
    timeToDelete: number;
    color: number;
    isRounded: boolean;
    isDefaultLang: boolean;
    page: string;
    message: Message;
    author: User;
    args: string[];
	language: Language;
    lang: string;

    embed: MessageEmbed[];
    buttons: MessageActionRow[];

    strength: number;
    intellect: number;
    agility: number;
    will: number;
    power: number;
};