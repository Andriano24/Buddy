import english from "../languages/english.json";
import greek from "../languages/greek.json";
import spanish from "../languages/spanish.json";
import Language from "../types/language";

export default languageSet;

function languageSet(lang: string): Language {
    if (lang == "greek") {
        return Object.assign({}, greek);
    }
    else if (lang == "spanish") {
        return Object.assign({}, spanish);
    }
    
    return Object.assign({}, english);
}