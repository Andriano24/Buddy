import { Message, MessageActionRow, MessageButton, MessageEmbed, User } from "discord.js";
import MessageContent from "../../types/messageContent";
import Language from "../../types/language"
import languageSet from "../../index/languageSet";

var damageTalents: string, resistTalents: string, accuracyTalents: string, pierceTalents: string, critTalents: string, blockTalents: string, healthTalents: string, stunTalents: string, fishingLuckTalents: string;

var dealer: number, giver: number, bringer: number, totalDamage: number;

var ward: number, proof: number, defy: number;

var sniper: number, shot: number, eye: number;

var armorBreaker: number, armorPiercer: number;

var schoolAssailant: number, schoolStriker: number, criticalHitter: number, criticalStriker: number;

var blocker: number, defender: number;

var healer: number, healthy: number, lively: number, medic: number;

var healthAdd: number, healthBoost: number, healthBounty: number, healthGift: number;

var stunRecalcitrant: number, stunResistance: number;

var fishingLuck: number, epicFishingLuck: number;

export class petCalculator {
    messageBotReply: Message | undefined;
    timeToDelete = Date.now() + (1000 * 60 * 5);
    color = Math.round(Math.random() * 0xffffff);
    isRounded = false;
    isDefaultLang = true;
    page = "base";
    message: Message;
    author: User;
    args: string[];
	language: Language;
    lang: string;

    embed: MessageEmbed[] = [];
    buttons: MessageActionRow[] = [];

    strength: number;
    intellect: number;
    agility: number;
    will: number;
    power: number;

	constructor(messageContent: MessageContent) {
        this.message = messageContent.message;
        this.author = messageContent.author;
        this.args = messageContent.args;
        this.language = Object.assign({}, messageContent.language);
        this.lang = messageContent.lang;

        this.strength = +this.args[0];
        this.intellect = +this.args[1];
        this.agility = +this.args[2];
        this.will = +this.args[3];
        this.power = +this.args[4];

        this.calculateTalents();

        if (this.lang == "english" || this.lang == "slovak" || this.lang == "czech") {
            this.embedCallNoTranslation();
            this.message.reply({ embeds: [this.embed[1]], components: [this.buttons[1]], allowedMentions: { repliedUser: false } }).then((messageBotReply: any) => {
                this.messageBotReply = messageBotReply;
            });
        }
        else {
            this.embedCall();
            this.message.reply({ embeds: [this.embed[1]], components: [this.buttons[2]], allowedMentions: { repliedUser: false } }).then((messageBotReply: any) => {
                this.messageBotReply = messageBotReply;
            });
        }

        
    }

    calculateTalents() {
        dealer = ((2 * this.strength + 2 * this.will + this.power) * 0.0075);
        giver = (((2 * this.strength) + (2 * this.will) + (this.power)) / 200);
        bringer = (((2 * this.strength) + (2 * this.will) + (this.power)) / 400);
        totalDamage = ((+this.args[5] * dealer) + (+this.args[6] * giver) + (+this.args[7] * bringer));
    
        ward = (((2 * this.strength) + (2 * this.agility) + (this.power)) * 0.012);
        proof = (((2 * this.strength) + (2 * this.agility) + (this.power)) / 125);
        defy = (((2 * this.strength) + (2 * this.agility) + (this.power)) / 250);
        
        sniper = (((2 * this.intellect) + (2 * this.agility) + (this.power)) * 0.0075);
        shot = (((2 * this.intellect) + (2 * this.agility) + (this.power)) / 200);
        eye = (((2 * this.intellect) + (2 * this.agility) + (this.power)) / 400);
    
        armorBreaker = (((2 * this.strength) + (2 * this.agility) + (this.power)) / 400);
        armorPiercer = (((2 * this.strength) + (2 * this.agility) + (this.power)) * 0.0015);
    
        schoolAssailant = (((2 * this.agility) + (2 * this.will) + this.power) / 40);
        schoolStriker = (((2 * this.agility) + (2 * this.will) + this.power) * 0.02); // 3/150 = 0.02
        criticalHitter = (((2 * this.agility) + (2 * this.will) + this.power) * 0.018); // ! 9/500 = 0.018
        criticalStriker = (((2 * this.agility) + (2 * this.will) + this.power) * 0.024); // 3/125 = 0.024
        
        blocker = (((2 * this.intellect) + (2 * this.will) + this.power) * 0.018); // ! 9/500 = 0.018
        defender = (((2 * this.intellect) + (2 * this.will) + this.power) * 0.024);
    
        healer = (((2 * this.strength) + (2 * this.will) + (this.power)) * 0.003);
        healthy = (((2 * this.intellect) + (2 * this.agility) + (this.power)) * 0.003);
        lively = (((2 * this.intellect) + (2 * this.agility) + (this.power)) * 0.0065);
        medic = (((2 * this.strength) + (2 * this.will) + (this.power)) * 0.0065);
        
        healthAdd = (((2 * this.agility) + (2 * this.will) + this.power) * 0.06);
        healthBoost = (((2 * this.agility) + (2 * this.will) + this.power) * 0.08);
        healthBounty = (((2 * this.agility) + (2 * this.will) + this.power) * 0.12);
        healthGift = (((2 * this.agility) + (2 * this.will) + this.power) / 10);
    
        stunRecalcitrant = (((2 * this.strength) + (2 * this.intellect) + (this.power)) / 125);
        stunResistance = (((2 * this.strength) + (2 * this.intellect) + (this.power)) / 250);

        fishingLuck = ((2 * this.intellect) + (2 * this.will) + this.power) / 400;
        epicFishingLuck = ((2 * this.intellect) + (2 * this.will) + this.power) / 400;
    }

    printType(rounding: boolean) {
        if(rounding) {
            const wizardFloor = 1 - 0.5125; // 0.4875

            damageTalents = `${this.language.PetCalculator.dealer}: ` + Math.floor(dealer + wizardFloor) + "%\n" + `${this.language.PetCalculator.giver}: ` + Math.floor(giver + wizardFloor) + "%\n" + `${this.language.PetCalculator.bringer}: ` + Math.floor(bringer + wizardFloor) + "%\n";

            if(this.args.length == 8) {
                damageTalents += `${this.language.PetCalculator.totalDamage}: ` + Math.floor(totalDamage + wizardFloor) + "%\n";
            }

            resistTalents = `${this.language.PetCalculator.ward}: ` + Math.floor(ward + wizardFloor) + "%\n" + `${this.language.PetCalculator.proof}: ` + Math.floor(proof + wizardFloor) + "%\n" + `${this.language.PetCalculator.defy}: ` + Math.floor(defy + wizardFloor) + "%\n";
            accuracyTalents = `${this.language.PetCalculator.sniper}: ` + Math.floor(sniper + wizardFloor) + "%\n" + `${this.language.PetCalculator.shot}: ` + Math.floor(shot + wizardFloor) + "%\n" + `${this.language.PetCalculator.eye}: ` + Math.floor(eye + wizardFloor) + "%\n";
            pierceTalents = `${this.language.PetCalculator.armorBreaker}: ` + Math.floor(armorBreaker + wizardFloor) + "%\n" + `${this.language.PetCalculator.armorPiercer}: ` + Math.floor(armorPiercer + wizardFloor) + "%\n";
            critTalents = `${this.language.PetCalculator.schoolAssailant}: ` + Math.floor(schoolAssailant + wizardFloor) + "\n" + `${this.language.PetCalculator.schoolStriker}: ` + Math.floor(schoolStriker + wizardFloor) + "\n" + `${this.language.PetCalculator.criticalHitter}: ` + Math.floor(criticalHitter + wizardFloor) + "\n" + `${this.language.PetCalculator.criticalStriker}: ` + Math.floor(criticalStriker + wizardFloor) + "\n";
            blockTalents = `${this.language.PetCalculator.blocker}: ` + Math.floor(blocker + wizardFloor) + "\n" + `${this.language.PetCalculator.defender}: ` + Math.floor(defender + wizardFloor) + "\n";
            healthTalents = `${this.language.PetCalculator.healer}: ` + Math.floor(healer + wizardFloor) + "%\n" + `${this.language.PetCalculator.healthy}: ` + Math.floor(healthy + wizardFloor) + "%\n" + `${this.language.PetCalculator.lively}: ` + Math.floor(lively + wizardFloor) + "%\n" + `${this.language.PetCalculator.medic}: ` + Math.floor(medic + wizardFloor) + "%\n" + `${this.language.PetCalculator.healthAdd}: ` + Math.floor(healthAdd + wizardFloor) + "\n" + `${this.language.PetCalculator.healthBoost}: ` + Math.floor(healthBoost + wizardFloor) + "\n" + `${this.language.PetCalculator.healthBounty}: ` + Math.floor(healthBounty + wizardFloor) + "\n" + `${this.language.PetCalculator.healthGift}: ` + Math.floor(healthGift + wizardFloor) + "\n";
            stunTalents = `${this.language.PetCalculator.stunRecalcitrant}: ` + Math.floor(stunRecalcitrant + wizardFloor) + "%\n" + `${this.language.PetCalculator.stunResistance}: ` + Math.floor(stunResistance + wizardFloor) + "%\n";
            fishingLuckTalents = `${this.language.PetCalculator.fishingLuck}: ` + Math.floor(fishingLuck + wizardFloor) + "%\n" + `${this.language.PetCalculator.epicFishingLuck}: ` + Math.floor(epicFishingLuck + wizardFloor) + "%\n"
        }
        else {
            damageTalents = `${this.language.PetCalculator.dealer}: ` + this.decimalPlacesFixer(dealer) + "%\n" + `${this.language.PetCalculator.giver}: ` + this.decimalPlacesFixer(giver) + "%\n" + `${this.language.PetCalculator.bringer}: ` + this.decimalPlacesFixer(bringer) + "%\n";
            
            if(this.args.length == 8) {
                damageTalents += `${this.language.PetCalculator.totalDamage}: ` + this.decimalPlacesFixer(totalDamage) + "%\n";
            }

            resistTalents = `${this.language.PetCalculator.ward}: ` + this.decimalPlacesFixer(ward) + "%\n" + `${this.language.PetCalculator.proof}: ` + this.decimalPlacesFixer(proof) + "%\n" + `${this.language.PetCalculator.defy}: ` + this.decimalPlacesFixer(defy) + "%\n";
            accuracyTalents = `${this.language.PetCalculator.sniper}: ` + this.decimalPlacesFixer(sniper) + "%\n" + `${this.language.PetCalculator.shot}: ` + this.decimalPlacesFixer(shot) + "%\n" + `${this.language.PetCalculator.eye}: ` + this.decimalPlacesFixer(eye) + "%\n";
            pierceTalents = `${this.language.PetCalculator.armorBreaker}: ` + this.decimalPlacesFixer(armorBreaker) + "%\n" + `${this.language.PetCalculator.armorPiercer}: ` + this.decimalPlacesFixer(armorPiercer) + "%\n";
            critTalents = `${this.language.PetCalculator.schoolAssailant}: ` + this.decimalPlacesFixer(schoolAssailant) + "\n" + `${this.language.PetCalculator.schoolStriker}: ` + this.decimalPlacesFixer(schoolStriker) + "\n" + `${this.language.PetCalculator.criticalHitter}: ` + this.decimalPlacesFixer(criticalHitter) + "\n" + `${this.language.PetCalculator.criticalStriker}: ` + this.decimalPlacesFixer(criticalStriker) + "\n";
            blockTalents = `${this.language.PetCalculator.blocker}: ` + this.decimalPlacesFixer(blocker) + "\n" + `${this.language.PetCalculator.defender}: ` + this.decimalPlacesFixer(defender) + "\n";
            healthTalents = `${this.language.PetCalculator.healer}: ` + this.decimalPlacesFixer(healer) + "%\n" + `${this.language.PetCalculator.healthy}: ` + this.decimalPlacesFixer(healthy) + "%\n" + `${this.language.PetCalculator.lively}: ` + this.decimalPlacesFixer(lively) + "%\n" + `${this.language.PetCalculator.medic}: ` + this.decimalPlacesFixer(medic) + "%\n" + `${this.language.PetCalculator.healthAdd}: ` + this.decimalPlacesFixer(healthAdd) + "\n" + `${this.language.PetCalculator.healthBoost}: ` + this.decimalPlacesFixer(healthBoost) + "\n" + `${this.language.PetCalculator.healthBounty}: ` + this.decimalPlacesFixer(healthBounty) + "\n" + `${this.language.PetCalculator.healthGift}: ` + this.decimalPlacesFixer(healthGift) + "\n";
            stunTalents = `${this.language.PetCalculator.stunRecalcitrant}: ` + this.decimalPlacesFixer(stunRecalcitrant) + "%\n" + `${this.language.PetCalculator.stunResistance}: ` + this.decimalPlacesFixer(stunResistance) + "%\n";
            fishingLuckTalents = `${this.language.PetCalculator.fishingLuck}: ` + this.decimalPlacesFixer(fishingLuck) + "%\n" + `${this.language.PetCalculator.epicFishingLuck}: ` + this.decimalPlacesFixer(epicFishingLuck) + "%\n"
        }
    }

    decimalPlacesFixer(num: number) {
        if(num.toString().includes(".")) {
            var arrNum: string[] = num.toString().split(".");

            if(arrNum[1].length <= 3) {
                return num;
            }
            else {
                return parseFloat((num.toFixed(3) as unknown as string));
            }
        }
        else {
            return num;
        }
    }

    embedCallNoTranslation() {
        this.embed[0] = this.embedCreate("base", true); // Embed with base Talents and rounding
        this.buttons[0] = this.buttonsCreate("base", true, ""); // Base Talents buttons with rounding

        this.embed[1] = this.embedCreate("base", false); // Embed with base Talents and no rounding
        this.buttons[1] = this.buttonsCreate("base", false, ""); // Base Talents buttons without rounding

        this.embed[2] = this.embedCreate("more", true); // Embed with more Talents and rounding
        this.buttons[2] = this.buttonsCreate("more", true, ""); // More Talents buttons with rounding

        this.embed[3] = this.embedCreate("more", false); // Embed with more Talents and rounding
        this.buttons[3] = this.buttonsCreate("more", false, ""); // More Talents buttons without rounding

        this.buttons[4] = this.buttonsCreate("disabled", true, ""); // Disabled buttons with rounding
        this.buttons[5] = this.buttonsCreate("disabled", false, ""); // Disabled buttons without rounding
    }

    embedCall() {
        this.embed[0] = this.embedCreate("base", true); // Embed with base Talents and rounding, default language
        this.buttons[0] = this.buttonsCreate("base", true, "toEnglish"); // Base Talents buttons with rounding and English
        

        this.embed[1] = this.embedCreate("base", false); // Embed with base Talents and no rounding, default language
        this.buttons[2] = this.buttonsCreate("base", false, "toEnglish"); // Base Talents buttons without rounding and English


        this.embed[2] = this.embedCreate("more", true); // Embed with more Talents and rounding, default language
        this.buttons[4] = this.buttonsCreate("more", true, "toEnglish"); // More Talents buttons with rounding and English


        this.embed[3] = this.embedCreate("more", false); // Embed with more Talents and rounding, default language
        this.buttons[6] = this.buttonsCreate("more", false, "toEnglish"); // More Talents buttons without rounding and English


        this.buttons[8] = this.buttonsCreate("disabled", true, "on"); // Disabled buttons with rounding and language, default language
        this.buttons[9] = this.buttonsCreate("disabled", false, "on"); // Disabled buttons without rounding and language, default language

        this.language = languageSet("english");

        this.embed[4] = this.embedCreate("base", true); // Embed with base Talents and rounding, English
        this.buttons[1] = this.buttonsCreate("base", true, "toDefault"); // Base Talents buttons with rounding and default

        this.embed[5] = this.embedCreate("base", false); // Embed with base Talents and no rounding, English
        this.buttons[3] = this.buttonsCreate("base", false, "toDefault"); // Base Talents buttons without rounding and default

        this.embed[6] = this.embedCreate("more", true); // Embed with more Talents and rounding, English
        this.buttons[5] = this.buttonsCreate("more", true, "toDefault"); // More Talents buttons with rounding and default

        this.embed[7] = this.embedCreate("more", false); // Embed with more Talents and rounding, English
        this.buttons[7] = this.buttonsCreate("more", false, "toDefault"); // More Talents buttons without rounding and default

        this.buttons[10] = this.buttonsCreate("disabled", true, "on"); // Disabled buttons with rounding and language, English
        this.buttons[11] = this.buttonsCreate("disabled", false, "on"); // Disabled buttons without rounding and language, English
    }
    
    embedCreate(talents: string, rounding: boolean): MessageEmbed {
        if (rounding) {
            this.printType(true);
        }
        else {
            this.printType(false);
        }
        
        var embed: MessageEmbed = new MessageEmbed()
            .setColor(this.color)
            .setTitle(`<:pig_pet:989164327867129908> **${this.language.PetCalculator.embedTitle}** <:pig_pet:989164327867129908>`)
            .setAuthor({ name: this.author.tag, iconURL: `${this.author.avatarURL()}` })
            .setImage("https://i.imgur.com/wXuMA2N.png")
            .setFooter({ text: "Wizard101 Greek Community's Staff", iconURL: "https://cdn.discordapp.com/icons/497438205340024842/a_d68d06459337bffcfccab1c063f57bda.gif?size=4096"});

        var description = `**${this.language.PetCalculator.petStats}**: <:strength:988444646441091073> ${this.strength} <:intellect:988444648282406942> ${this.intellect} <:agility:988444649905586226> ${this.agility} <:will:988444651272949843> ${this.will} <:power:988444653084889179> ${this.power}\n`;
        
        if (this.args.length == 5) {
            embed
                .setDescription(`${description}\n`)
        }
        else {
            embed
                .setDescription(`${description}**${this.language.PetCalculator.moreStats}**: <:plus:991275688747339786> [${this.args[5]}, ${this.args[6]}, ${this.args[7]}]\n`)
        }
        
        if (talents == "base") {
            embed
                .addFields(
                    { name: `<:damage:989161409055162379> ${this.language.PetCalculator.damageTalents} <:damage:989161409055162379>`, value: `${damageTalents}`, inline: true },
                    { name: `<:resist:989161410535776277> ${this.language.PetCalculator.resistTalents} <:resist:989161410535776277>`, value: `${resistTalents}`, inline: true },
                )
                .addField("\u200B", "\u200B")
                .addFields(
                    { name: `<:accuracy:989161626051682385> ${this.language.PetCalculator.accuracyTalents} <:accuracy:989161626051682385>`, value: `${accuracyTalents}`, inline: true },
                    { name: `<:pierce:989161873322688513> ${this.language.PetCalculator.pierceTalents} <:pierce:989161873322688513>`, value: `${pierceTalents}`, inline: true },
                );
        }
        else {
            var embedFishingLuckTalents = `\n<:fishing_luck:990988916037402674> **${this.language.PetCalculator.fishingLuckTalents}** <:fishing_luck:990988916037402674>\n ${fishingLuckTalents}`;
            embed
                .addFields(
                    { name: `<:crit:989162463566135366> ${this.language.PetCalculator.critTalents} <:crit:989162463566135366>`, value: `${critTalents}`, inline: true },
                    { name: `<:block:989162489977643038> ${this.language.PetCalculator.blockTalents} <:block:989162489977643038>`, value: `${blockTalents}`, inline: true },
                )
                .addField("\u200B", "\u200B")
                .addFields(
                    { name: `<:health:989162519027392522> ${this.language.PetCalculator.healthTalents} <:health:989162519027392522>`, value: `${healthTalents}`, inline: true },
                    { name: `<:stun:989162805401882685> ${this.language.PetCalculator.stunTalents} <:stun:989162805401882685>`, value: `${stunTalents}${embedFishingLuckTalents}`, inline: true },
                );
        }
        
        return embed;
    }
    
    buttonsCreate(talents: string, rounding: boolean, language: string): MessageActionRow {
        var buttons: MessageActionRow = new MessageActionRow();
    
        if (talents == "base") {
            buttons
                .addComponents(
                    new MessageButton()
                        .setCustomId("baseTalents")
                        .setEmoji("<:all:991275396098162749>")
                        .setLabel(`${this.language.PetCalculator.baseTalents}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true)
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId("moreTalents")
                        .setEmoji("<:all_wide:991275428507562014>")
                        .setLabel(`${this.language.PetCalculator.moreTalents}`)
                        .setStyle("SECONDARY")
                );
            if (rounding) {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("baseTalentsRoundingOn")
                            .setEmoji("<:spiral:991275838404304976>")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("SUCCESS")
                    );
            }
            else {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("baseTalentsRoundingOff")
                            .setEmoji("<:spiral:991275838404304976>")
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
                        .setEmoji("<:all:991275396098162749>")
                        .setLabel(`${this.language.PetCalculator.baseTalents}`)
                        .setStyle("SECONDARY")
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId("moreTalents")
                        .setEmoji("<:all_wide:991275428507562014>")
                        .setLabel(`${this.language.PetCalculator.moreTalents}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true)
                );
            if (rounding) {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("moreTalentsRoundingOn")
                            .setEmoji("<:spiral:991275838404304976>")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("SUCCESS")
                    );
            }
            else {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("moreTalentsRoundingOff")
                            .setEmoji("<:spiral:991275838404304976>")
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
                        .setEmoji("<:all:991275396098162749>")
                        .setLabel(`${this.language.PetCalculator.baseTalents}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true)
                )
                .addComponents(
                    new MessageButton()
                        .setCustomId("moreTalents")
                        .setEmoji("<:all_wide:991275428507562014>")
                        .setLabel(`${this.language.PetCalculator.moreTalents}`)
                        .setStyle("SECONDARY")
                        .setDisabled(true)
                );
            if(rounding) {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("roundingOn")
                            .setEmoji("<:spiral:991275838404304976>")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("SUCCESS")
                            .setDisabled(true)
                    );
            }
            else {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("roundingOff")
                            .setEmoji("<:spiral:991275838404304976>")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("DANGER")
                            .setDisabled(true)
                    );
            }
            if (language == "on") {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("lang")
                            .setEmoji("<:school_star:991276866843463691>")
                            .setStyle("SECONDARY")
                            .setDisabled(true)
                    );
            }
        }
        if (language == "toEnglish") { 
            buttons
                .addComponents(
                    new MessageButton()
                        .setCustomId("toEnglish")
                        .setEmoji("????????")
                        .setStyle("SECONDARY")
                );
        }
        else if (language == "toDefault") {
            if (this.lang == "greek") {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("toDefault")
                            .setEmoji("????????")
                            .setStyle("SECONDARY")
                    );
            }
            else if (this.lang == "spanish") {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("toDefault")
                            .setEmoji("????????")
                            .setStyle("SECONDARY")
                    );
            }
            else if (this.lang == "italian") {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("toDefault")
                            .setEmoji("????????")
                            .setStyle("SECONDARY")
                    );
            }
            else if (this.lang == "german") {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("toDefault")
                            .setEmoji("????????")
                            .setStyle("SECONDARY")
                    );
            }
            else if (this.lang == "polish") {
                buttons
                    .addComponents(
                        new MessageButton()
                            .setCustomId("toDefault")
                            .setEmoji("????????")
                            .setStyle("SECONDARY")
                    );
            }
        }

        return buttons;
    }
}
