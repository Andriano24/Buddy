import { ColorResolvable, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import messageContentExtType from "../../schemas/messageContentExt";
import languageType from "../../schemas/language"

var damageTalents: string, resistTalents: string, accuracyTalents: string, pierceTalents: string, critTalents: string, blockTalents: string, healthTalents: string, stunTalents: string;

var dealer: number, giver: number, painBringer: number, totalOf5Damage: number;

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
    onBaseTalents = true;
    message: Message;
    author: string;
    args: string[];
	language: languageType;
	prefix: string;

    embed: MessageEmbed[] = [];
    buttons: MessageActionRow[] = [];

    strength: number;
    intellect: number;
    agility: number;
    will: number;
    power: number;

	constructor(messageContentExt: messageContentExtType) {
        this.message = messageContentExt.message;
        this.author = messageContentExt.author;
        this.args = messageContentExt.args;
        this.language = Object.assign({}, messageContentExt.language);;
        this.prefix = messageContentExt.prefix;

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
        totalOf5Damage = dealer + (2 * giver) + (2 * painBringer);
    
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
            damageTalents = `${this.language.PetCalculator.dealer}: ` + Math.floor(dealer + wizardFloor) + '%\n' + `${this.language.PetCalculator.giver}: ` + Math.floor(giver + wizardFloor) + '%\n' + `${this.language.PetCalculator.painBringer}: ` + Math.floor(painBringer + wizardFloor) + '%\n' + `${this.language.PetCalculator.totalOf5Damage}: ` + Math.floor(totalOf5Damage + wizardFloor) + "%\n";
            resistTalents = `${this.language.PetCalculator.ward}: ` + Math.floor(ward + wizardFloor) + '%\n' + `${this.language.PetCalculator.proof}: ` + Math.floor(proof + wizardFloor) + '%\n' + `${this.language.PetCalculator.defy}: ` + Math.floor(defy + wizardFloor) + '%\n';
            accuracyTalents = `${this.language.PetCalculator.sniper}: ` + Math.floor(sniper + wizardFloor) + '%\n' + `${this.language.PetCalculator.shot}: ` + Math.floor(shot + wizardFloor) + '%\n' + `${this.language.PetCalculator.eye}: ` + Math.floor(eye + wizardFloor) + '%\n';
            pierceTalents = `${this.language.PetCalculator.armorBreaker}: ` + Math.floor(armorBreaker + wizardFloor) + '%\n' + `${this.language.PetCalculator.armorPiercer}: ` + Math.floor(armorPiercer + wizardFloor) + '%\n';
            critTalents = `${this.language.PetCalculator.schoolAssailant}: ` + Math.floor(schoolAssailant + wizardFloor) + '%\n' + `${this.language.PetCalculator.schoolStriker}: ` + Math.floor(schoolStriker + wizardFloor) + '%\n' + `${this.language.PetCalculator.critHitter}: ` + Math.floor(critHitter + wizardFloor) + '%\n' + `${this.language.PetCalculator.critStriker}: ` + Math.floor(critStriker + wizardFloor) + '%\n';
            blockTalents = `${this.language.PetCalculator.blocker}: ` + Math.floor(blocker + wizardFloor) + '%\n' + `${this.language.PetCalculator.defender}: ` + Math.floor(defender + wizardFloor) + '%\n';
            healthTalents = `${this.language.PetCalculator.healer}: ` + Math.floor(healer + wizardFloor) + '%\n' + `${this.language.PetCalculator.healthy}: ` + Math.floor(healthy + wizardFloor) + '%\n' + `${this.language.PetCalculator.lively}: ` + Math.floor(lively + wizardFloor) + '%\n' + `${this.language.PetCalculator.medic}: ` + Math.floor(medic + wizardFloor) + '%\n' + `${this.language.PetCalculator.healthAdd}: ` + Math.floor(healthAdd + wizardFloor) + '\n' + `${this.language.PetCalculator.healthBoost}: ` + Math.floor(healthBoost + wizardFloor) + '\n' + `${this.language.PetCalculator.healthBounty}: ` + Math.floor(healthBounty + wizardFloor) + '\n' + `${this.language.PetCalculator.healthGift}: ` + Math.floor(healthGift + wizardFloor) + '\n';
            stunTalents = `${this.language.PetCalculator.stunRecal}: ` + Math.floor(stunRecal + wizardFloor) + '%\n' + `${this.language.PetCalculator.stunResist}: ` + Math.floor(stunResist + wizardFloor) + '%\n';
        }
        else {
            damageTalents = `${this.language.PetCalculator.dealer}: ` + dealer.toFixed(3) + '%\n' + `${this.language.PetCalculator.giver}: ` + giver.toFixed(3) + '%\n' + `${this.language.PetCalculator.painBringer}: ` + painBringer.toFixed(3) + '%\n' + `${this.language.PetCalculator.totalOf5Damage}: ` + totalOf5Damage.toFixed(3) + "%\n";
            resistTalents = `${this.language.PetCalculator.ward}: ` + ward.toFixed(3) + '%\n' + `${this.language.PetCalculator.proof}: ` + proof.toFixed(3) + '%\n' + `${this.language.PetCalculator.defy}: ` + defy.toFixed(3) + '%\n';
            accuracyTalents = `${this.language.PetCalculator.sniper}: ` + sniper.toFixed(3) + '%\n' + `${this.language.PetCalculator.shot}: ` + shot.toFixed(3) + '%\n' + `${this.language.PetCalculator.eye}: ` + eye + '%\n';
            pierceTalents = `${this.language.PetCalculator.armorBreaker}: ` + armorBreaker.toFixed(3) + '%\n' + `${this.language.PetCalculator.armorPiercer}: ` + armorPiercer.toFixed(3) + '%\n';
            critTalents = `${this.language.PetCalculator.schoolAssailant}: ` + schoolAssailant.toFixed(3) + '%\n' + `${this.language.PetCalculator.schoolStriker}: ` + schoolStriker.toFixed(3) + '%\n' + `${this.language.PetCalculator.critHitter}: ` + critHitter.toFixed(3) + '%\n' + `${this.language.PetCalculator.critStriker}: ` + critStriker.toFixed(3) + '%\n';
            blockTalents = `${this.language.PetCalculator.blocker}: ` + blocker.toFixed(3) + '%\n' + `${this.language.PetCalculator.defender}: ` + defender.toFixed(3) + '%\n';
            healthTalents = `${this.language.PetCalculator.healer}: ` + healer.toFixed(3) + '%\n' + `${this.language.PetCalculator.healthy}: ` + healthy.toFixed(3) + '%\n' + `${this.language.PetCalculator.lively}: ` + lively.toFixed(3) + '%\n' + `${this.language.PetCalculator.medic}: ` + medic.toFixed(3) + '%\n' + `${this.language.PetCalculator.healthAdd}: ` + healthAdd.toFixed(3) + '\n' + `${this.language.PetCalculator.healthBoost}: ` + healthBoost.toFixed(3) + '\n' + `${this.language.PetCalculator.healthBounty}: ` + healthBounty.toFixed(3) + '\n' + `${this.language.PetCalculator.healthGift}: ` + healthGift.toFixed(3) + '\n';
            stunTalents = `${this.language.PetCalculator.stunRecal}: ` + stunRecal.toFixed(3) + '%\n' + `${this.language.PetCalculator.stunResist}: ` + stunResist.toFixed(3) + '%\n';
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
        this.buttons[4] = this.buttonsCreate("disabled", false); // Disabled buttons without rounding
    }
    
    embedCreate(message: Message, talents: string, rounding: boolean): MessageEmbed {
        if (rounding) {
            this.printType(true);
        }
        else {
            this.printType(false);
        }
        
        if (talents == "base") {
            return new MessageEmbed()
            .setColor(this.color)
            .setTitle(`:magic_wand: **${this.language.PetCalculator.embedTitle}** :magic_wand:`)
            .setAuthor({ name: message.author.tag, iconURL: `${message.author.avatarURL()}` })
            .setDescription(`**${this.language.PetCalculator.petStats}**: ${this.strength}, ${this.intellect}, ${this.agility}, ${this.will}, ${this.power}\n\u200B`)
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
            return new MessageEmbed()
            .setColor(this.color)
            .setTitle(`:magic_wand: **${this.language.PetCalculator.embedTitle}** :magic_wand:`)
            .setAuthor({ name: message.author.tag, iconURL: `${message.author.avatarURL()}` })
            .setDescription(`**${this.language.PetCalculator.petStats}**: ${this.strength}, ${this.intellect}, ${this.agility}, ${this.will}, ${this.power}\n\u200B`)
            .addFields(
                { name: `${this.language.PetCalculator.critTalents}`, value: `${critTalents}`, inline: true },
                { name: `${this.language.PetCalculator.blockTalents}`, value: `${blockTalents}`, inline: true },
            )
            .addField("\u200B", "\u200B")
            .addFields(
                { name: `${this.language.PetCalculator.healthTalents}`, value: `${healthTalents}`, inline: true },
                { name: `${this.language.PetCalculator.stunTalents}`, value: `${stunTalents}`, inline: true },
            )
            .setImage("https://i.imgur.com/wXuMA2N.png")
            .setFooter({ text: "Wizard101 Greek Community's Staff", iconURL: "https://cdn.discordapp.com/icons/497438205340024842/a_d68d06459337bffcfccab1c063f57bda.gif?size=4096"});
        }
        
    }
    
    buttonsCreate(talents: string, rounding: boolean): MessageActionRow {
        var buttons: MessageActionRow;
    
        if (talents == "base") {
            if (rounding) {
                buttons = new MessageActionRow()
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
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId("baseTalentsRoundingOn")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("SUCCESS")
                    );
            }
            else {
                buttons = new MessageActionRow()
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
                    )
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
            if (rounding) {
                buttons = new MessageActionRow()
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
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId("moreTalentsRoundingOn")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("SUCCESS")
                    );
            }
            else {
                buttons = new MessageActionRow()
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
                    )
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
            buttons = new MessageActionRow()
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
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId("moreTalentsRoundingOff")
                            .setEmoji("🔄")
                            .setLabel(`${this.language.PetCalculator.rounding}`)
                            .setStyle("DANGER")
                            .setDisabled(true)
                    );
        }
    
        return buttons;
    }
}
