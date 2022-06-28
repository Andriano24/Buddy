import Language from "../types/language";
import english from "../languages/english.json";
import greek from "../languages/greek.json";
import spanish from "../languages/spanish.json";
import italian from "../languages/italian.json";
import german from "../languages/german.json";

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
    return Object.assign({}, english);
}