import { Message } from "discord.js";
import { petCalculatorCalled } from "./commandHandler";

export function checkPetCalculatorCalled() {
    var time = Date.now();
    petCalculatorCalled.forEach(async (petCalculator: any) => {
        if (time >= petCalculator.timeToDelete) {
            if (petCalculator.isRounded) {
                await petCalculator.messageBotReply.edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[4]], allowedMentions: { repliedUser: false }});
            }
            else {
                await petCalculator.messageBotReply.edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[5]], allowedMentions: { repliedUser: false }});
            }
            petCalculatorCalled.splice(petCalculatorCalled.indexOf(petCalculator), 1);
            return;
        }
    });
}