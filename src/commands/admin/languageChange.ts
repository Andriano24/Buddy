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

        if (args[0] == "english" || args[0] == "en") {
            guild.language = "english";
        }
        else if (args[0] == "greek" || args[0] == "gr") {
            guild.language = "greek";
        }
        else if (args[0] == "spanish" || args[0] == "es") {
            guild.language = "spanish";
        }
        else if (args[0] == "italian" || args[0] == "it") {
            guild.language = "italian";
        }
        else if (args[0] == "german" || args[0] == "de") {
            guild.language = "german";
        }
        else if (args[0] == "polish" || args[0] == "pl") {
            guild.language = "polish";
        }
        else if (args[0] == "slovak" || args[0] == "sl") {
            guild.language = "slovak";
        }
        else if (args[0] == "czech" || args[0] == "cz") {
            guild.language = "czech";
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