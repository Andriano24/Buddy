import { Permissions, Message } from "discord.js";
import messageContentExtType from "../schemas/messageContentExt";
import languageType from "../schemas/language";
import { petCalculator } from "../commands/user/petCalculator";
import languageChange from "../commands/admin/languageChange";
import prefixChange from "../commands/admin/prefixChange";

var petCalculatorCalled: any = [];

export { petCalculatorCalled };

export default commandHandler;

async function commandHandler(messageContentExt: messageContentExtType) {
    var message = messageContentExt.message;
	var command = messageContentExt.command;
	var args = messageContentExt.args;
    var language: languageType = Object.assign({}, messageContentExt.language);
	var prefix = messageContentExt.prefix;

    if (command == "petstats" || command == "pet" || command == "stats") {
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