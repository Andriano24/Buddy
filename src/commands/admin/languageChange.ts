import MessageContent from "../../types/messageContent";
import guildSchema from "../../schemas/guild";
import languageSet from "../../index/languageSet";

export default { base }

function base(messageContent: MessageContent) {
    var message = messageContent.message;
	var args = messageContent.args;
    var language = Object.assign({}, messageContent.language);
	var prefix = messageContent.prefix;

    if (args.length != 1) {
        message.reply({ content: `${language.LanguageChange.wrongFormat[0]}: ${prefix}${language.LanguageChange.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
		return;
    }

    guildSchema.findOne({ guildId: message.guildId as string }, (err: any, guild: any) => {
        if (err) {
            console.log(err);
            message.reply({ content: `${language.Bot.error}...`, allowedMentions: { repliedUser: false } });
            return;
        }

        if (args[0] == "english") {
            guild.language = "english";
        }
        else if (args[0] == "greek") {
            guild.language = "greek";
        }
        else if (args[0] == "spanish") {
            guild.language = "spanish";
        }
        else if (args[0] == "italian") {
            guild.language = "italian";
        }
        else if (args[0] == "german") {
            guild.language = "german";
        }
        else if (args[0] == "polish") {
            guild.language = "polish"
        }
        else if (args[0] == "slovak") {
            guild.language = "slovak"
        }
        else if (args[0] == "czech") {
            guild.language = "czech"
        }
        else {
            message.reply({ content: `${language.LanguageChange.noAvailableLanguage}`, allowedMentions: { repliedUser: false } });
            return;
        }

        language = languageSet(args[0]);

        guild.save((err: any) => {
            if(err) {
                console.log(err);
                message.reply({ content: `${language.Bot.error}...`, allowedMentions: { repliedUser: false } });
                return;
            }

            message.reply({ content: `${language.LanguageChange.languageChanged}!`, allowedMentions: { repliedUser: false } });
        })
    })
}