import MessageContent from "../../types/messageContent";

export default { base }

async function base(messageContent: MessageContent) {
    var message = messageContent.message;
    await message.reply({ content: `I shall now rest...`, allowedMentions: { repliedUser: false } });
    process.exit();
}