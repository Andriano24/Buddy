import MessageContentExt from "../../types/messageContentExt";
import guildSchema from "../../schemas/guild";
import Language from "../../types/language"
import { owner } from "../../index/ready";
import english from "../../languages/english.json";
import greek from "../../languages/greek.json";

export default { base }

function base(messageContentExt: MessageContentExt) {
    var message = messageContentExt.message;
	var args = messageContentExt.args;
    var language: Language = Object.assign({}, messageContentExt.language);
	var prefix = messageContentExt.prefix;

    if (args.length != 1) {
        message.reply({ content: `${language.LanguageChange.wrongFormat[0]}: ${prefix}${language.LanguageChange.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
		return;
    }

    guildSchema.findOne({ guildId: message.guildId }, (err: any, guild: any) => {
        if (err) {
            console.log(err);
            owner?.send(err);
            message.reply({ content: `${language.Bot.error}`, allowedMentions: { repliedUser: false } });
            return;
        }

        if (args[0] == "en" || args[0] == "english") {
            guild.language = "en";
            Object.assign(language, english);
        }
        else if (args[0] == "gr" || args[0] == "greek") {
            guild.language = "gr";
            Object.assign(language, greek);
        }
        else {
            message.reply({ content: `${language.LanguageChange.noAvailableLanguage}`, allowedMentions: { repliedUser: false } });
            return;
        }

        guild.save((err: any) => {
            if(err) {
                console.log(err);
                owner?.send(err);
                message.reply({ content: `${language.Bot.error}`, allowedMentions: { repliedUser: false } });
                return;
            }

            message.reply({ content: `${language.LanguageChange.languageChanged}!`, allowedMentions: { repliedUser: false } });
        })
    })
}