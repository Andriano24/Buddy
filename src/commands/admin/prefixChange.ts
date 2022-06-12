import MessageContent from "../../types/messageContent";
import guildSchema from "../../schemas/guild";

export default { base }

function base(messageContent: MessageContent) {
    var message = messageContent.message;
	var args = messageContent.args;
    var language = Object.assign({}, messageContent.language);
	var prefix = messageContent.prefix;

    if (args.length != 1) {
        message.reply({ content: `${language.PrefixChange.wrongFormat[0]}: ${prefix}${language.PrefixChange.wrongFormat[1]}.`, allowedMentions: { repliedUser: false } });
		return;
    }

    guildSchema.findOne({ guildId: message.guildId }, (err: any, guild: any) => {
        if (err) {
            console.log(err);
            message.reply({ content: `${language.Bot.error}...`, allowedMentions: { repliedUser: false } });
            return;
        }

        if (guild.prefix == args[0]) {
            message.reply({ content: `${language.PrefixChange.samePrefix[0]}.`, allowedMentions: { repliedUser: false } });
            return;
        }

        guild.prefix = args[0];

        guild.save((err: any) => {
            if (err) {
                console.log(err);
                message.reply({ content: `${language.Bot.error}...`, allowedMentions: { repliedUser: false } });
                return;
            }

            message.reply({ content: `${language.PrefixChange.prefixChanged} ${guild.prefix}.`, allowedMentions: { repliedUser: false } });
        })
    })
}