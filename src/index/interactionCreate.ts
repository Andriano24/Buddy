import { Interaction, Message } from "discord.js";
import PetCalculator from "../types/petCalculator";
import { petCalculatorCalled } from "./commandHandler";

export async function interactionCreate(interaction: Interaction) {
    if (interaction.isButton()) {
        petCalculatorCalled.forEach(async (petCalculator: PetCalculator) => {
            if (interaction.user.id !== petCalculator.author.id) return;
            if (interaction.message.id !== (petCalculator.messageBotReply as Message).id) return;

            if(petCalculator.lang == "english") {
                if (interaction.customId == "baseTalents") {
                    if(petCalculator.isRounded) {
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[0]], components: [petCalculator.buttons[0]], allowedMentions: { repliedUser: false }});
                    }
                    else {
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[1]], components: [petCalculator.buttons[1]], allowedMentions: { repliedUser: false }});
                    }
                } 
                else if (interaction.customId == "moreTalents") {
                    if(petCalculator.isRounded) {
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[2]], components: [petCalculator.buttons[2]], allowedMentions: { repliedUser: false }});
                    }
                    else {
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[3]], components: [petCalculator.buttons[3]], allowedMentions: { repliedUser: false }});
                    }
                } 
                else if (interaction.customId == "baseTalentsRoundingOn") {
                    petCalculator.isRounded = false;
                    await (interaction.message as Message).edit({embeds: [petCalculator.embed[1]], components: [petCalculator.buttons[1]], allowedMentions: { repliedUser: false }});
                }
                else if (interaction.customId == "baseTalentsRoundingOff") {
                    petCalculator.isRounded = true;
                    await (interaction.message as Message).edit({embeds: [petCalculator.embed[0]], components: [petCalculator.buttons[0]], allowedMentions: { repliedUser: false }});
                }
                else if (interaction.customId == "moreTalentsRoundingOn") {
                    petCalculator.isRounded = false;
                    await (interaction.message as Message).edit({embeds: [petCalculator.embed[3]], components: [petCalculator.buttons[3]], allowedMentions: { repliedUser: false }});
                }
                else if (interaction.customId == "moreTalentsRoundingOff") {
                    petCalculator.isRounded = true;
                    await (interaction.message as Message).edit({embeds: [petCalculator.embed[2]], components: [petCalculator.buttons[2]], allowedMentions: { repliedUser: false }});
                }
            }
            else {
                if (petCalculator.isDefaultLang) {
                    if (interaction.customId == "baseTalents") {
                        petCalculator.page = "base";
                        if(petCalculator.isRounded) {
                            await (interaction.message as Message).edit({embeds: [petCalculator.embed[0]], components: [petCalculator.buttons[0]], allowedMentions: { repliedUser: false }});
                        }
                        else {
                            await (interaction.message as Message).edit({embeds: [petCalculator.embed[1]], components: [petCalculator.buttons[2]], allowedMentions: { repliedUser: false }});
                        }
                    } 
                    else if (interaction.customId == "moreTalents") {
                        petCalculator.page = "more";
                        if(petCalculator.isRounded) {
                            await (interaction.message as Message).edit({embeds: [petCalculator.embed[2]], components: [petCalculator.buttons[4]], allowedMentions: { repliedUser: false }});
                        }
                        else {
                            await (interaction.message as Message).edit({embeds: [petCalculator.embed[3]], components: [petCalculator.buttons[6]], allowedMentions: { repliedUser: false }});
                        }
                    } 
                    else if (interaction.customId == "baseTalentsRoundingOn") {
                        petCalculator.isRounded = false;
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[1]], components: [petCalculator.buttons[2]], allowedMentions: { repliedUser: false }});
                    }
                    else if (interaction.customId == "baseTalentsRoundingOff") {
                        petCalculator.isRounded = true;
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[0]], components: [petCalculator.buttons[0]], allowedMentions: { repliedUser: false }});
                    }
                    else if (interaction.customId == "moreTalentsRoundingOn") {
                        petCalculator.isRounded = false;
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[3]], components: [petCalculator.buttons[6]], allowedMentions: { repliedUser: false }});
                    }
                    else if (interaction.customId == "moreTalentsRoundingOff") {
                        petCalculator.isRounded = true;
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[2]], components: [petCalculator.buttons[4]], allowedMentions: { repliedUser: false }});
                    }
                    else if (interaction.customId == "toEnglish") {
                        petCalculator.isDefaultLang = false;
                        if (petCalculator.page == "base") {
                            if (petCalculator.isRounded) {
                                await (interaction.message as Message).edit({embeds: [petCalculator.embed[4]], components: [petCalculator.buttons[1]], allowedMentions: { repliedUser: false }});
                            }
                            else {
                                await (interaction.message as Message).edit({embeds: [petCalculator.embed[5]], components: [petCalculator.buttons[3]], allowedMentions: { repliedUser: false }});
                            }
                        }
                        else {
                            if (petCalculator.isRounded) {
                                await (interaction.message as Message).edit({embeds: [petCalculator.embed[6]], components: [petCalculator.buttons[5]], allowedMentions: { repliedUser: false }});
                            }
                            else {
                                await (interaction.message as Message).edit({embeds: [petCalculator.embed[7]], components: [petCalculator.buttons[7]], allowedMentions: { repliedUser: false }});
                            }
                        }
                    }
                }
                else {
                    if (interaction.customId == "baseTalents") {
                        petCalculator.page = "base";
                        if(petCalculator.isRounded) {
                            await (interaction.message as Message).edit({embeds: [petCalculator.embed[4]], components: [petCalculator.buttons[1]], allowedMentions: { repliedUser: false }});
                        }
                        else {
                            await (interaction.message as Message).edit({embeds: [petCalculator.embed[5]], components: [petCalculator.buttons[3]], allowedMentions: { repliedUser: false }});
                        }
                    } 
                    else if (interaction.customId == "moreTalents") {
                        petCalculator.page = "more";
                        if(petCalculator.isRounded) {
                            await (interaction.message as Message).edit({embeds: [petCalculator.embed[6]], components: [petCalculator.buttons[5]], allowedMentions: { repliedUser: false }});
                        }
                        else {
                            await (interaction.message as Message).edit({embeds: [petCalculator.embed[7]], components: [petCalculator.buttons[7]], allowedMentions: { repliedUser: false }});
                        }
                    } 
                    else if (interaction.customId == "baseTalentsRoundingOn") {
                        petCalculator.isRounded = false;
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[5]], components: [petCalculator.buttons[3]], allowedMentions: { repliedUser: false }});
                    }
                    else if (interaction.customId == "baseTalentsRoundingOff") {
                        petCalculator.isRounded = true;
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[4]], components: [petCalculator.buttons[1]], allowedMentions: { repliedUser: false }});
                    }
                    else if (interaction.customId == "moreTalentsRoundingOn") {
                        petCalculator.isRounded = false;
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[7]], components: [petCalculator.buttons[7]], allowedMentions: { repliedUser: false }});
                    }
                    else if (interaction.customId == "moreTalentsRoundingOff") {
                        petCalculator.isRounded = true;
                        await (interaction.message as Message).edit({embeds: [petCalculator.embed[6]], components: [petCalculator.buttons[5]], allowedMentions: { repliedUser: false }});
                    }
                    else if (interaction.customId == "toDefault") {
                        petCalculator.isDefaultLang = true;
                        if (petCalculator.page == "base") {
                            if (petCalculator.isRounded) {
                                await (interaction.message as Message).edit({embeds: [petCalculator.embed[0]], components: [petCalculator.buttons[0]], allowedMentions: { repliedUser: false }});
                            }
                            else {
                                await (interaction.message as Message).edit({embeds: [petCalculator.embed[1]], components: [petCalculator.buttons[2]], allowedMentions: { repliedUser: false }});
                            }
                        }
                        else {
                            if (petCalculator.isRounded) {
                                await (interaction.message as Message).edit({embeds: [petCalculator.embed[2]], components: [petCalculator.buttons[4]], allowedMentions: { repliedUser: false }});
                            }
                            else {
                                await (interaction.message as Message).edit({embeds: [petCalculator.embed[3]], components: [petCalculator.buttons[6]], allowedMentions: { repliedUser: false }});
                            }
                        }
                    }
                }
            }
            
            interaction.deferUpdate();
            petCalculator.timeToDelete = Date.now() + (1000 * 60);
            return;
        });
    }
}
