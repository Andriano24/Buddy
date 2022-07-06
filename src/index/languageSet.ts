import Language from "../types/language";
import english from "../languages/english.json";
import greek from "../languages/greek.json";
import spanish from "../languages/spanish.json";
import italian from "../languages/italian.json";
import german from "../languages/german.json";
import polish from "../languages/polish.json";

export default languageSet;

function languageSet(lang: string): Language {
    if (lang == "greek") {
        return Object.assign({}, greek);
    }
    else if (lang == "spanish") {
        return Object.assign({}, spanish);
    }
    else if (lang == "italian") {
        return Object.assign({}, italian);
    }
    else if (lang == "german") {
        return Object.assign({}, german);
    }
    else if (lang == "polish") {
        return Object.assign({}, polish);
    }
    return Object.assign({}, english);
}