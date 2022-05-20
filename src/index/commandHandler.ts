import { Permissions } from "discord.js";
import MessageContentExt from "../types/messageContentExt";
import Language from "../types/language";
import { petCalculator } from "../commands/user/petCalculator";
import languageChange from "../commands/admin/languageChange";
import prefixChange from "../commands/admin/prefixChange";

var petCalculatorCalled: any = [];

export { petCalculatorCalled };

export default commandHandler;

async function commandHandler(messageContentExt: MessageContentExt) {
    var message = messageContentExt.message;
	var command = messageContentExt.command;
	var args = messageContentExt.args;
    var language: Language = Object.assign({}, messageContentExt.language);
	var prefix = messageContentExt.prefix;

    if (command == "petstats" || command == "pet" || command == "stats") {
        if (args.length != 5) {
            message.reply({ content: `${language.PetCalculator.wrongFormat[0]}: ${prefix}${language.PetCalculator.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
            return;
        }
        if ((+args[0] < 0 || +args[0] > 600) || (+args[1] < 0 || +args[1] > 600) || (+args[2] < 0 || +args[2] > 600) || (+args[3] < 0 || +args[3] > 600) || (+args[4] < 0 || +args[4] > 600)) {
            message.reply({ content: `${language.PetCalculator.wrongStats}.`, allowedMentions: { repliedUser: false } });
            return;
        }
        if (isNaN(+args[0]) || isNaN(+args[1]) ||isNaN(+args[2]) ||isNaN(+args[3]) ||isNaN(+args[4])) {
            message.reply({ content: `${language.PetCalculator.wrongFormat[0]}: ${prefix}${language.PetCalculator.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
            return;
        }
        
        petCalculatorCalled.push(new petCalculator(messageContentExt));
    }
    else if (command == "language" || command == "lang") {
        if(message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            languageChange.base(messageContentExt);
        }
        else {
            message.reply({ content: `${language.Bot.noPermissions}!`, allowedMentions: { repliedUser: false } });
        }
    }
    else if (command == "prefix") {
        if(message.member?.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
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