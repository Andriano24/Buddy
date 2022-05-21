import { Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import MessageContentExt from "../../types/messageContentExt";
import Language from "../../types/language"

var damageTalents: string, resistTalents: string, accuracyTalents: string, pierceTalents: string, critTalents: string, blockTalents: string, healthTalents: string, stunTalents: string;

var dealer: number, giver: number, painBringer: number, totalDamage: number;

var ward: number, proof: number, defy: number;

var sniper: number, shot: number, eye: number;

var armorBreaker: number, armorPiercer: number;

var schoolAssailant: number, schoolStriker: number, critHitter: number, critStriker: number;

var blocker: number, defender: number;

var healer: number, healthy: number, lively: number, medic: number;

var healthAdd: number, healthBoost: number, healthBounty: number, healthGift: number;

var stunRecal: number, stunResist: number;

export class petCalculator {
    public messageBotReply: any;
    public timeToDelete = Date.now() + (1000 * 60);
    color = Math.round(Math.random() * 0xffffff);
    isRounded = false;
    message: Message;
    author: string;
    args: string[];
	language: Language;

    embed: MessageEmbed[] = [];
    buttons: MessageActionRow[] = [];

    strength: number;
    intellect: number;
    agility: number;
    will: number;
    power: number;

	constructor(messageContentExt: MessageContentExt) {
        this.message = messageContentExt.message;
        this.author = messageContentExt.author;
        this.args = messageContentExt.args;
        this.language = Object.assign({}, messageContentExt.language);;

        this.strength = +this.args[0];
        this.intellect = +this.args[1];
        this.agility = +this.args[2];
        this.will = +this.args[3];
        this.power = +this.args[4];

        this.embedCall(this.message);

        this.message.reply({ embeds: [this.embed[1]], components: [this.buttons[1]], allowedMentions: { repliedUser: false } }).then(messageBotReply => {
            this.messageBotReply = messageBotReply;
        });
    }

    calculateTalents() {
        dealer = (2 * this.strength + 2 * this.will + this.power) * 0.0075;
        giver = ((((2 * this.strength) + (2 * this.will) + (this.power)) / 200));
        painBringer = ((((2 * this.strength) + (2 * this.will) + (this.power)) / 400));
        totalDamage = (+this.args[5] * dealer) + (+this.args[6] * giver) + (+this.args[7] * painBringer);
    
        ward = (((2 * this.strength) + (2 * this.agility) + (this.power)) * 0.012);
        proof = ((((2 * this.strength) + (2 * this.agility) + (this.power)) / 125));
        defy = ((((2 * this.strength) + (2 * this.agility) + (this.power)) / 250));
        
        sniper = (((2 * this.intellect) + (2 * this.agility) + (this.power)) * 0.0075);
        shot = (((2 * this.intellect) + (2 * this.agility) + (this.power)) / 200);
        eye = (((2 * this.intellect) + (2 * this.agility) + (this.power)) / 400);
    
        armorBreaker = ((((2 * this.strength) + (2 * this.agility) + (this.power)) / 400));
        armorPiercer = ((((2 * this.strength) + (2 * this.agility) + (this.power)) * 0.0015));
    
        schoolAssailant = ((2 * this.agility) + (2 * this.will) + this.power) / 40;
        schoolStriker = ((2 * this.agility) + (2 * this.will) + this.power) * 0.02; // 3/150 = 0.02
        critHitter = ((2 * this.agility) + (2 * this.will) + this.power) * 0.018; // ! 9/500 = 0.018
        critStriker = ((2 * this.agility) + (2 * this.will) + this.power) * 0.024; // 3/125 = 0.024
        
        blocker = ((2 * this.intellect) + (2 * this.will) + this.power) * 0.018; // ! 9/500 = 0.018
        defender = ((2 * this.intellect) + (2 * this.will) + this.power) * 0.024;
    
        healer = ((((2 * this.strength) + (2 * this.will) + (this.power)) * 0.003));
        healthy = (((2 * this.intellect) + (2 * this.agility) + (this.power)) * 0.003);
        lively = (((2 * this.intellect) + (2 * this.agility) + (this.power)) * 0.0065);
        medic = ((((2 * this.strength) + (2 * this.will) + (this.power)) * 0.0065));
        
        healthAdd = ((2 * this.agility) + (2 * this.will) + this.power) * 0.06;
        healthBoost = ((2 * this.agility) + (2 * this.will) + this.power) * 0.08;
        healthBounty = (((2 * this.agility) + (2 * this.will) + this.power) * 0.12);
        healthGift = ((2 * this.agility) + (2 * this.will) + this.power) / 10;
    
        stunRecal = ((((2 * this.strength) + (2 * this.intellect) + (this.power)) / 125));
        stunResist = ((((2 * this.strength) + (2 * this.intellect) + (this.power)) / 250));
    }

    printType(rounding: boolean) {
        if(rounding) {
            const wizardFloor = 1 - 0.5125; // 0.4875

            damageTalents = `${this.language.PetCalculator.dealer}: ` + Math.floor(dealer + wizardFloor) + "%\n" + `${this.language.PetCalculator.giver}: ` + Math.floor(giver + wizardFloor) + "%\n" + `${this.language.PetCalculator.painBringer}: ` + Math.floor(painBringer + wizardFloor) + "%\n";

            if(this.args.length == 8) {
                damageTalents += `${this.language.PetCalculator.totalDamage}: ` + Math.floor(totalDamage + wizardFloor) + "%\n";
            }

            resistTalents = `${this.language.PetCalculator.ward}: ` + Math.floor(ward + wizardFloor) + "%\n" + `${this.language.PetCalculator.proof}: ` + Math.floor(proof + wizardFloor) + "%\n" + `${this.language.PetCalculator.defy}: ` + Math.floor(defy + wizardFloor) + "%\n";
            accuracyTalents = `${this.language.PetCalculator.sniper}: ` + Math.floor(sniper + wizardFloor) + "%\n" + `${this.language.PetCalculator.shot}: ` + Math.floor(shot + wizardFloor) + "%\n" + `${this.language.PetCalculator.eye}: ` + Math.floor(eye + wizardFloor) + "%\n";
            pierceTalents = `${this.language.PetCalculator.armorBreaker}: ` + Math.floor(armorBreaker + wizardFloor) + "%\n" + `${this.language.PetCalculator.armorPiercer}: ` + Math.floor(armorPiercer + wizardFloor) + "%\n";
            critTalents = `${this.language.PetCalculator.schoolAssailant}: ` + Math.floor(schoolAssailant + wizardFloor) + "%\n" + `${this.language.PetCalculator.schoolStriker}: ` + Math.floor(schoolStriker + wizardFloor) + "%\n" + `${this.language.PetCalculator.critHitter}: ` + Math.floor(critHitter + wizardFloor) + "%\n" + `${this.language.PetCalculator.critStriker}: ` + Math.floor(critStriker + wizardFloor) + "%\n";
            blockTalents = `${this.language.PetCalculator.blocker}: ` + Math.floor(blocker + wizardFloor) + "%\n" + `${this.language.PetCalculator.defender}: ` + Math.floor(defender + wizardFloor) + "%\n";
            healthTalents = `${this.language.PetCalculator.healer}: ` + Math.floor(healer + wizardFloor) + "%\n" + `${this.language.PetCalculator.healthy}: ` + Math.floor(healthy + wizardFloor) + "%\n" + `${this.language.PetCalculator.lively}: ` + Math.floor(lively + wizardFloor) + "%\n" + `${this.language.PetCalculator.medic}: ` + Math.floor(medic + wizardFloor) + "%\n" + `${this.language.PetCalculator.healthAdd}: ` + Math.floor(healthAdd + wizardFloor) + "\n" + `${this.language.PetCalculator.healthBoost}: ` + Math.floor(healthBoost + wizardFloor) + "\n" + `${this.language.PetCalculator.healthBounty}: ` + Math.floor(healthBounty + wizardFloor) + "\n" + `${this.language.PetCalculator.healthGift}: ` + Math.floor(healthGift + wizardFloor) + "\n";
            stunTalents = `${this.language.PetCalculator.stunRecal}: ` + Math.floor(stunRecal + wizardFloor) + "%\n" + `${this.language.PetCalculator.stunResist}: ` + Math.floor(stunResist + wizardFloor) + "%\n";
        }
        else {
            damageTalents = `${this.language.PetCalculator.dealer}: ` + this.hasDecimalPlaces(dealer) + "%\n" + `${this.language.PetCalculator.giver}: ` + this.hasDecimalPlaces(giver) + "%\n" + `${this.language.PetCalculator.painBringer}: ` + this.hasDecimalPlaces(painBringer) + "%\n";
            
            if(this.args.length == 8) {
                damageTalents += `${this.language.PetCalculator.totalDamage}: ` + this.hasDecimalPlaces(totalDamage) + "%\n";
            }

            resistTalents = `${this.language.PetCalculator.ward}: ` + this.hasDecimalPlaces(ward) + "%\n" + `${this.language.PetCalculator.proof}: ` + this.hasDecimalPlaces(proof) + "%\n" + `${this.language.PetCalculator.defy}: ` + this.hasDecimalPlaces(defy) + "%\n";
            accuracyTalents = `${this.language.PetCalculator.sniper}: ` + this.hasDecimalPlaces(sniper) + "%\n" + `${this.language.PetCalculator.shot}: ` + this.hasDecimalPlaces(shot) + "%\n" + `${this.language.PetCalculator.eye}: ` + this.hasDecimalPlaces(eye) + "%\n";
            pierceTalents = `${this.language.PetCalculator.armorBreaker}: ` + this.hasDecimalPlaces(armorBreaker) + "%\n" + `${this.language.PetCalculator.armorPiercer}: ` + this.hasDecimalPlaces(armorPiercer) + "%\n";
            critTalents = `${this.language.PetCalculator.schoolAssailant}: ` + this.hasDecimalPlaces(schoolAssailant) + "%\n" + `${this.language.PetCalculator.schoolStriker}: ` + this.hasDecimalPlaces(schoolStriker) + "%\n" + `${this.language.PetCalculator.critHitter}: ` + this.hasDecimalPlaces(critHitter) + "%\n" + `${this.language.PetCalculator.critStriker}: ` + this.hasDecimalPlaces(critHitter) + "%\n";
            blockTalents = `${this.language.PetCalculator.blocker}: ` + this.hasDecimalPlaces(blocker) + "%\n" + `${this.language.PetCalculator.defender}: ` + this.hasDecimalPlaces(defender) + "%\n";
            healthTalents = `${this.language.PetCalculator.healer}: ` + this.hasDecimalPlaces(healer) + "%\n" + `${this.language.PetCalculator.healthy}: ` + this.hasDecimalPlaces(healthy) + "%\n" + `${this.language.PetCalculator.lively}: ` + this.hasDecimalPlaces(lively) + "%\n" + `${this.language.PetCalculator.medic}: ` + this.hasDecimalPlaces(medic) + "%\n" + `${this.language.PetCalculator.healthAdd}: ` + this.hasDecimalPlaces(healthAdd) + "\n" + `${this.language.PetCalculator.healthBoost}: ` + this.hasDecimalPlaces(healthBoost) + "\n" + `${this.language.PetCalculator.healthBounty}: ` + this.hasDecimalPlaces(healthBounty) + "\n" + `${this.language.PetCalculator.healthGift}: ` + this.hasDecimalPlaces(healthGift) + "\n";
            stunTalents = `${this.language.PetCalculator.stunRecal}: ` + this.hasDecimalPlaces(stunRecal) + "%\n" + `${this.language.PetCalculator.stunResist}: ` + this.hasDecimalPlaces(stunResist) + "%\n";
        }
    }

    hasDecimalPlaces(num: number) {
        if(num.toString().includes(".")) {
            var arrNum: string[] = num.toString().split(".");

            if(arrNum[1].length <= 3) {
                return num;
            }
            else {
                return num.toFixed(3);
            }
        }
        else {
            return num;
        }
    }

    embedCall(message: Message) {
        this.calculateTalents();
        this.embed[0] = this.embedCreate(message, "base", true); // Embed with base Talents and rounding
        this.buttons[0] = this.buttonsCreate("base", true); // Base Talents buttons with rounding
        this.embed[1] = this.embedCreate(message, "base", false); // Embed with base Talents and no rounding
        this.buttons[1] = this.buttonsCreate("base", false); // Base Talents buttons without rounding
        this.embed[2] = this.embedCreate(message, "more", true); // Embed with more Talents and rounding
        this.buttons[2] = this.buttonsCreate("more", true); // More Talents buttons with rounding
        this.embed[3] = this.embedCreate(message, "more", false); // Embed with more Talents and rounding
        this.buttons[3] = this.buttonsCreate("more", false); // More Talents buttons without rounding
        this.buttons[4] = this.buttonsCreate("disabled", true); // Disabled buttons with rounding
        this.buttons[5] = this.buttonsCreate("disabled", false); // Disabled buttons without rounding
    }
    
    embedCreate(message: Message, talents: string, rounding: boolean): MessageEmbed {
        if (rounding) {
            this.printType(true);
        }
        else {
            this.printType(false);
        }
        
        var embed: MessageEmbed = new MessageEmbed()
            .setColor(this.color)
            .setTitle(`:magic_wand: **${this.language.PetCalculator.embedTitle}** :magic_wand:`)
            .setAuthor({ name: message.author.tag, iconURL: `${message.author.avatarURL()}` })
            .setImage("https://i.imgur.com/wXuMA2N.png")
            .setFooter({ text: "Wizard101 Greek Community's Staff", iconURL: "https://cdn.discordapp.com/icons/497438205340024842/a_d68d06459337bffcfccab1c063f57bda.gif?size=4096"});

        if (this.args.length == 5) {
            embed
                .setDescription(`**${this.language.PetCalculator.petStats}**: :muscle: ${this.strength}, :brain: ${this.intellect}, :athletic_shoe: ${this.agility}, :handshake: ${this.will}, :zap: ${this.power}\n\u200B`)
        }
        else {
            embed
                .setDescription(`**${this.language.PetCalculator.petStats}**: :muscle: ${this.strength}, :brain: ${this.intellect}, :athletic_shoe: ${this.agility}, :handshake: ${this.will}, :zap: ${this.power}\n:anatomical_heart: [${this.args[5]}/${this.args[6]}/${this.args[7]}]\n\u200B`)
        }
        
        if (talents == "base") {
            embed
            .addFields(
                { name: `${this.language.PetCalculator.damageTalents}`, value: `${damageTalents}`, inline: true },
                { name: `${this.language.PetCalculator.resistTalents}`, value: `${resistTalents}`, inline: true },
            )
            .addField("\u200B", "\u200B")
            .addFields(
                { name: `${this.language.PetCalculator.accuracyTalents}`, value: `${accuracyTalents}`, inline: true },
                { name: `${this.language.PetCalculator.pierceTalents}`, value: `${pierceTalents}`, inline: true },
            )
            .setImage("https://i.imgur.com/wXuMA2N.png")
            .setFooter({ text: "Wizard101 Greek Community's Staff", iconURL: "https://cdn.discordapp.com/icons/497438205340024842/a_d68d06459337bffcfccab1c063f57bda.gif?size=4096"});
        }
        else {
            embed
            .addFields(
                { name: `${this.language.PetCalculator.critTalents}`, value: `${critTalents}`, inline: true },
                { name: `${this.language.PetCalculator.blockTalents}`, value: `${blockTalents}`, inline: true },
            )
            .addField("\u200B", "\u200B")
            .addFields(
                { name: `${this.language.PetCalculator.healthTalents}`, value: `${healthTalents}`, inline: true },
                { name: `${this.language.PetCalculator.stunTalents}`, value: `${stunTalents}`, inline: true },
            )
        }
        
        return embed;
    }
    
    buttonsCreate(talents: string, rounding: boolean): MessageActionRow {
        var buttons: MessageActionRow = new MessageActionRow();
    
        if (talents == "base") {
            buttons
                .addComponents(
                    new MessageButton()
                        .setCustomId("baseTalents")
                        .setEmoji("👊")
                        .setLabel(`${this.language.PetCalculator.baseTalents}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true)
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId("moreTalents")
                        .setEmoji("🤲")
                        .setLabel(`${this.language.PetCalculator.moreTalents}`)
                        .setStyle("SECONDARY")
                );
            if (rounding) {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("baseTalentsRoundingOn")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("SUCCESS")
                    );
            }
            else {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("baseTalentsRoundingOff")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("DANGER")
                    );
            }
        }
        else if (talents == "more") {
            buttons
                .addComponents(
                    new MessageButton()
                        .setCustomId("baseTalents")
                        .setEmoji("👊")
                        .setLabel(`${this.language.PetCalculator.baseTalents}`)
                        .setStyle("SECONDARY")
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId("moreTalents")
                        .setEmoji("🤲")
                        .setLabel(`${this.language.PetCalculator.moreTalents}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true)
                );
            if (rounding) {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("moreTalentsRoundingOn")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("SUCCESS")
                    );
            }
            else {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("moreTalentsRoundingOff")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("DANGER")
                    );
            }
        }
        else {
            buttons
                .addComponents(
                    new MessageButton()
                        .setCustomId("baseTalents")
                        .setEmoji("👊")
                        .setLabel(`${this.language.PetCalculator.baseTalents}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true)
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId("moreTalents")
                        .setEmoji("🤲")
                        .setLabel(`${this.language.PetCalculator.moreTalents}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true)
                );
            if(rounding) {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("moreTalentsRoundingOn")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("SUCCESS")
                            .setDisabled(true)
                    );
            }
            else {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("moreTalentsRoundingOff")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("DANGER")
                            .setDisabled(true)
                    );
            }
        }

        return buttons;
    }
}
