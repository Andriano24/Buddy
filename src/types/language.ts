export default Language;

type Language = {
    Bot: { 
        error: string;
        noPermissions: string;
        commandNotFound: string;
        commandNotAvailable: string;
    };
    PetCalculator: {
        wrongFormat: string[];
        wrongFormatExtra: string[];
        wrongStats: string;
        or: string,
        wrongStatsExtra: string;
        strength: string;
        intellect: string;
        agility: string;
        will: string;
        power: string;
        petStats: string;
        moreStats: string;
        baseTalents: string;
        damageTalents: string;
        dealer: string;
        giver: string;
        painBringer: string;
        totalDamage: string;
        resistTalents: string;
        ward: string;
        proof: string;
        defy: string;
        accuracyTalents: string;
        sniper: string;
        shot: string;
        eye: string;
        pierceTalents: string;
        armorBreaker: string;
        armorPiercer: string;
        moreTalents: string;
        critTalents: string;
        schoolAssailant: string;
        schoolStriker: string;
        critHitter: string;
        critStriker: string;
        blockTalents: string;
        blocker: string;
        defender: string;
        healthTalents: string;
        healer: string;
        healthy: string;
        lively: string;
        medic: string;
        healthAdd: string;
        healthBoost: string;
        healthBounty: string;
        healthGift: string;
        stunTalents: string;
        stunRecal: string;
        stunResist: string;
        embedTitle: string;
        rounding: string;
    };
    LanguageChange: {
        wrongFormat: string[];
        noAvailableLanguage: string;
        languageChanged: string;
    };
    PrefixChange: {
        wrongFormat: string[];
        samePrefix: string;
        prefixChanged: string;
    };
}