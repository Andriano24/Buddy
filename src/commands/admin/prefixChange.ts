import MessageContentExt from "../../types/messageContentExt";
import guildSchema from "../../schemas/guild";
import Language from "../../types/language"
import { owner } from "../../index/ready";

export default { base }

function base(messageContentExt: MessageContentExt) {
    var message = messageContentExt.message;
	var args = messageContentExt.args;
    var language: Language = Object.assign({}, messageContentExt.language);
	var prefix = messageContentExt.prefix;

    if (args.length != 1) {
        message.reply({ content: `${language.PrefixChange.wrongFormat[0]}: ${prefix}${language.PrefixChange.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
		return;
    }

    guildSchema.findOne({ guildId: message.guildId }, (err: any, guild: any) => {
        if (err) {
            owner?.send(err);
            message.reply({ content: `${language.Bot.error}`, allowedMentions: { repliedUser: false } });
            return;
        }

        if (guild.prefix == args[0]) {
            message.reply({ content: `${language.PrefixChange.samePrefix[0]}.`, allowedMentions: { repliedUser: false } });
            return;
        }

        guild.prefix = args[0];

        guild.save((err: any) => {
            if (err) {
                owner?.send(err);
                message.reply({ content: `${language.Bot.error}`, allowedMentions: { repliedUser: false } });
                return;
            }

            message.reply({ content: `${language.PrefixChange.prefixChanged} ${guild.prefix}.`, allowedMentions: { repliedUser: false } });
        })
    })
}