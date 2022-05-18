import { Message } from "discord.js";
import { petCalculatorCalled } from "./commandHandler";

export function checkPetCalculatorCalled() {
    var time = Date.now();
    console.log(time);
    petCalculatorCalled.forEach(async (petCalculator: any) => {
        console.log("petcalc time to delete: " + petCalculator.timeToDelete + " current time: " + time);
        if (time >= petCalculator.timeToDelete) {
            await petCalculator.messageBotReply.edit({embeds: [(petCalculator.messageBotReply as Message).embeds[0]], components: [petCalculator.buttons[4]], allowedMentions: { repliedUser: false }});
            petCalculatorCalled.splice(petCalculatorCalled.indexOf(petCalculator), 1);
            return;
        }
    });
}