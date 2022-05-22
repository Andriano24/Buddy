import { Guild, GuildMember, Permissions } from "discord.js";
import MessageContentExt from "../types/messageContentExt";
import Language from "../types/language";
import { petCalculator } from "../commands/user/petCalculator";
import languageChange from "../commands/admin/languageChange";
import prefixChange from "../commands/admin/prefixChange";
import { botClient } from "./ready";

var petCalculatorCalled: any = [];

export { petCalculatorCalled };

export default commandHandler;

async function commandHandler(messageContentExt: MessageContentExt) {
    var message = messageContentExt.message;

    if(message.channel.type === "DM") {
        return;
    }

    var guild = botClient.guilds.cache.get((message.guild as Guild).id);
    
    if (!((guild as Guild).me as GuildMember).permissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
        return;
    }
    
	var command = messageContentExt.command;
	var args = messageContentExt.args;
    var language: Language = Object.assign({}, messageContentExt.language);
	var prefix = messageContentExt.prefix;


    if (command == "petstats" || command == "pet" || command == "stats") {
        if (args.length == 5) {
            if (isNaN(+args[0]) || isNaN(+args[1]) ||isNaN(+args[2]) ||isNaN(+args[3]) ||isNaN(+args[4])) {
                message.reply({ content: `${language.PetCalculator.wrongFormat[0]}: ${prefix}${language.PetCalculator.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
                return;
            }

            if ((+args[0] < 0 || +args[0] > 600) || (+args[1] < 0 || +args[1] > 600) || (+args[2] < 0 || +args[2] > 600) || (+args[3] < 0 || +args[3] > 600) || (+args[4] < 0 || +args[4] > 600)) {
                message.reply({ content: `${language.PetCalculator.wrongStats}.`, allowedMentions: { repliedUser: false } });
                return;
            }
        }
        else if (args.length == 8) {
            if (isNaN(+args[0]) || isNaN(+args[1]) || isNaN(+args[2]) || isNaN(+args[3]) || isNaN(+args[4]) || isNaN(+args[5]) || isNaN(+args[6]) || isNaN(+args[7])) {
                message.reply({ content: `${language.PetCalculator.wrongFormatExtra[0]}: ${prefix}${language.PetCalculator.wrongFormatExtra[1]}.`, allowedMentions: { repliedUser: false } });
                return;
            }

            if ((+args[0] < 0 || +args[0] > 600) || (+args[1] < 0 || +args[1] > 600) || (+args[2] < 0 || +args[2] > 600) || (+args[3] < 0 || +args[3] > 600) || (+args[4] < 0 || +args[4] > 600) || 
                (+args[5] < 0 || +args[5] > 6) || (+args[6] < 0 || +args[6] > 6) || (+args[7] < 0 || +args[7] > 6) || (+args[5] + +args[6] + +args[7] > 6)) {
                message.reply({ content: `${language.PetCalculator.wrongStatsExtra}.`, allowedMentions: { repliedUser: false } });
                return;
            }
        }
        else {
            message.reply({ content: `${language.PetCalculator.wrongFormat[0]}:\n${prefix}${language.PetCalculator.wrongFormat[1]} ${language.PetCalculator.or}\n${prefix}${language.PetCalculator.wrongFormatExtra[1]}.`, allowedMentions: { repliedUser: false } });
            return;
        }
        
        petCalculatorCalled.push(new petCalculator(messageContentExt));
    }
    else if (command == "language" || command == "lang") {
        if (message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            languageChange.base(messageContentExt);
        }
        else {
            message.reply({ content: `${language.Bot.noPermissions}!`, allowedMentions: { repliedUser: false } });
        }
    }
    else if (command == "prefix") {
        if (message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            prefixChange.base(messageContentExt);
        }
        else {
            message.reply({ content: `${language.Bot.noPermissions}!`, allowedMentions: { repliedUser: false } });
        }
    }
    else if (command == "help") {
        message.reply({ content: `${language.Bot.commandNotAvailable}.`, allowedMentions: { repliedUser: false } });
    }
    else {
        message.reply({ content: `${language.Bot.commandNotFound}.`, allowedMentions: { repliedUser: false } });
    }
}