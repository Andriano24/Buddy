import messageContentExtType from "../../schemas/messageContentExt";
import guildSchema from "../../schemas/guild";
import languageType from "../../schemas/language"
import { owner } from "../../index/ready";

export default { base }

function base(messageContentExt: messageContentExtType) {
    var message = messageContentExt.message;
	var args = messageContentExt.args;
    var language: languageType = Object.assign({}, messageContentExt.language);
	var prefix = messageContentExt.prefix;

    if (args.length != 1) {
        message.reply({ content: `${language.PrefixChange.wrongFormat[0]}: ${prefix}${language.PrefixChange.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
		return;
    }

    guildSchema.findOne({ guild_id: message.guildId }, (err: any, guild: any) => {
        if (err) {
            owner?.send(err);
            message.reply({ content: "An error has been occured.", allowedMentions: { repliedUser: false } });
            return;
        }

        guild.save((err: any) => {
            if (err) {
                owner?.send(err);
            message.reply({ content: "An error has been occured.", allowedMentions: { repliedUser: false } });
                return;
            }

            message.reply({ content: `The prefix has been set to ${guild.prefix}.`, allowedMentions: { repliedUser: false } });
        })
    })
}