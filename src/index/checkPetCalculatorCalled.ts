import { Message } from "discord.js";
import PetCalculator from "../types/petCalculator";
import { petCalculatorCalled } from "./commandHandler";

export function checkPetCalculatorCalled() {
    var time = Date.now();

    petCalculatorCalled.forEach(async (petCalculator: PetCalculator) => {
        if (time >= petCalculator.timeToDelete) {
            if (petCalculator.lang == "english" || petCalculator.lang == "slovak" || petCalculator.lang == "czech") {
                if (petCalculator.isRounded) {
                await (petCalculator.messageBotReply as Message).edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[4]], allowedMentions: { repliedUser: false }});
                }
                else {
                    await (petCalculator.messageBotReply as Message).edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[5]], allowedMentions: { repliedUser: false }});
                }
            }
            else {
                if (petCalculator.isDefaultLang) {
                    if (petCalculator.isRounded) {
                        await (petCalculator.messageBotReply as Message).edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[8]], allowedMentions: { repliedUser: false }});
                    }
                    else {
                        await (petCalculator.messageBotReply as Message).edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[9]], allowedMentions: { repliedUser: false }});
                    }
                }
                else {
                    if (petCalculator.isRounded) {
                        await (petCalculator.messageBotReply as Message).edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[10]], allowedMentions: { repliedUser: false }});
                    }
                    else {
                        await (petCalculator.messageBotReply as Message).edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[11]], allowedMentions: { repliedUser: false }});
                    }
                }
            }
            
            petCalculatorCalled.splice(petCalculatorCalled.indexOf(petCalculator), 1);
            return;
        }
    });
}