import { Interaction, Message } from "discord.js";
import { petCalculatorCalled } from "./commandHandler";

export async function interactionCreate(interaction: Interaction) {
    if (interaction.isButton()) {
        petCalculatorCalled.forEach(async (petCalculator: any) => {
            if (interaction.user.id !== petCalculator.author) return;
            if (interaction.message.id !== (petCalculator.messageBotReply as Message).id) return;

            if (interaction.customId === "baseTalents") {
                if(petCalculator.isRounded) {
                    await (interaction.message as Message).edit({embeds: [petCalculator.embed[0]], components: [petCalculator.buttons[0]], allowedMentions: { repliedUser: false }});
                }
                else {
                    await (interaction.message as Message).edit({embeds: [petCalculator.embed[1]], components: [petCalculator.buttons[1]], allowedMentions: { repliedUser: false }});
                }
            } 
            else if (interaction.customId === "moreTalents") {
                if(petCalculator.isRounded) {
                    await (interaction.message as Message).edit({embeds: [petCalculator.embed[2]], components: [petCalculator.buttons[2]], allowedMentions: { repliedUser: false }});
                }
                else {
                    await (interaction.message as Message).edit({embeds: [petCalculator.embed[3]], components: [petCalculator.buttons[3]], allowedMentions: { repliedUser: false }});
                }
            } 
            else if (interaction.customId === "baseTalentsRoundingOn") {
                petCalculator.isRounded = false;
                await (interaction.message as Message).edit({embeds: [petCalculator.embed[1]], components: [petCalculator.buttons[1]], allowedMentions: { repliedUser: false }});
            }
            else if (interaction.customId === "baseTalentsRoundingOff") {
                petCalculator.isRounded = true;
                await (interaction.message as Message).edit({embeds: [petCalculator.embed[0]], components: [petCalculator.buttons[0]], allowedMentions: { repliedUser: false }});
            }
            else if (interaction.customId === "moreTalentsRoundingOn") {
                petCalculator.isRounded = false;
                await (interaction.message as Message).edit({embeds: [petCalculator.embed[3]], components: [petCalculator.buttons[3]], allowedMentions: { repliedUser: false }});
            }
            else if (interaction.customId === "moreTalentsRoundingOff") {
                petCalculator.isRounded = true;
                await (interaction.message as Message).edit({embeds: [petCalculator.embed[2]], components: [petCalculator.buttons[2]], allowedMentions: { repliedUser: false }});
            }
            petCalculator.timeToDelete = Date.now() + (1000 * 60);
            interaction.deferUpdate();
            return;
        });
    }
}
