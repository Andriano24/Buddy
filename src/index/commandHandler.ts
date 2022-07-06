import { Guild, GuildMember, Permissions } from "discord.js";
import MessageContent from "../types/messageContent";
import Language from "../types/language";
import { petCalculator } from "../commands/user/petCalculator";
import languageChange from "../commands/admin/languageChange";
import prefixChange from "../commands/admin/prefixChange";
import shutdownBot from "../commands/owner/shutdownBot";
import config from "../config.json"

var petCalculatorCalled: any = [];

export { petCalculatorCalled };

export default commandHandler;

async function commandHandler(messageContent: MessageContent) {
    var message = messageContent.message;
    var author = messageContent.author;

    if(message.channel.type === "DM") {
        return;
    }
    
    if (!message.guild?.me?.permissionsIn(message.channel)?.has(Permissions.FLAGS.SEND_MESSAGES)) {
        return;
    }
    
    if(!message.guild?.me?.permissionsIn(message.channel)?.has(Permissions.FLAGS.EMBED_LINKS)) {
        return;
    }
    
	var command = messageContent.command;
	var args = messageContent.args;
    var language: Language = Object.assign({}, messageContent.language);
	var prefix = messageContent.prefix;

    if (command == "petstats" || command == "pet" || command == "stats") {
        if (args.length == 5) {
            if (isNaN(+args[0]) || isNaN(+args[1]) ||isNaN(+args[2]) ||isNaN(+args[3]) ||isNaN(+args[4])) {
                message.reply({ content: `${language.PetCalculator.wrongFormat[0]}: ${prefix}${language.PetCalculator.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
                return;
            }

            if ((+args[0] < 0 || +args[0] > 600 || args[0].includes(".")) || (+args[1] < 0 || +args[1] > 600 || args[1].includes(".")) || (+args[2] < 0 || +args[2] > 600 || args[2].includes(".")) || (+args[3] < 0 || +args[3] > 600 || args[3].includes(".")) || (+args[4] < 0 || +args[4] > 600 || args[4].includes("."))) {
                message.reply({ content: `${language.PetCalculator.wrongStats}.`, allowedMentions: { repliedUser: false } });
                return;
            }
        }
        else if (args.length == 8) {
            if (isNaN(+args[0]) || isNaN(+args[1]) || isNaN(+args[2]) || isNaN(+args[3]) || isNaN(+args[4]) || isNaN(+args[5]) || isNaN(+args[6]) || isNaN(+args[7])) {
                message.reply({ content: `${language.PetCalculator.wrongFormatExtra[0]}: ${prefix}${language.PetCalculator.wrongFormatExtra[1]}.`, allowedMentions: { repliedUser: false } });
                return;
            }

            if ((+args[0] < 0 || +args[0] > 600 || args[0].includes(".")) || (+args[1] < 0 || +args[1] > 600 || args[1].includes(".")) || (+args[2] < 0 || +args[2] > 600 || args[2].includes(".")) || (+args[3] < 0 || +args[3] > 600 || args[3].includes(".")) || (+args[4] < 0 || +args[4] > 600 || args[4].includes(".")) || 
                (+args[5] < 0 || +args[5] > 6 || args[5].includes(".")) || (+args[6] < 0 || +args[6] > 6 || args[6].includes(".")) || (+args[7] < 0 || +args[7] > 6 || args[7].includes(".")) || (+args[5] + +args[6] + +args[7] > 6)) {
                message.reply({ content: `${language.PetCalculator.wrongStatsExtra}.`, allowedMentions: { repliedUser: false } });
                return;
            }
        }
        else {
            message.reply({ content: `${language.PetCalculator.wrongFormat[0]}:\n${prefix}${language.PetCalculator.wrongFormat[1]} ${language.PetCalculator.or}\n${prefix}${language.PetCalculator.wrongFormatExtra[1]}.`, allowedMentions: { repliedUser: false } });
            return;
        }
        
        petCalculatorCalled.push(new petCalculator(messageContent));
    }
    else if (command == "language" || command == "lang") {
        if (message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            languageChange.base(messageContent);
        }
        else {
            message.reply({ content: `${language.Bot.noPermissions}!`, allowedMentions: { repliedUser: false } });
        }
    }
    else if (command == "prefix") {
        if (message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            prefixChange.base(messageContent);
        }
        else {
            message.reply({ content: `${language.Bot.noPermissions}!`, allowedMentions: { repliedUser: false } });
        }
    }
    else if (command == "help") {
        message.reply({ content: `${language.Bot.commandNotAvailable}.`, allowedMentions: { repliedUser: false } });
    }
    else if (command == "kill" || command == "shutdown" || command == "restart") {
        if (author.id == config.ownerID) {
            shutdownBot.base(messageContent);
        }
        else {
            message.reply({ content: `You are not my owner...`, allowedMentions: { repliedUser: false } });
        }
    }
    else {
        console.log(`Command ${command} not found.`);
        message.reply({ content: `${language.Bot.commandNotFound}.`, allowedMentions: { repliedUser: false } });
    }
}