import Language from "../types/language";
import english from "../languages/english.json";
import greek from "../languages/greek.json";
import spanish from "../languages/spanish.json";
import italian from "../languages/italian.json";
import german from "../languages/german.json";
import polish from "../languages/polish.json";
import slovak from "../languages/slovak.json";
import czech from "../languages/czech.json";

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
    else if (lang == "slovak") {
        return Object.assign({}, slovak);
    }
    else if (lang == "czech") {
        return Object.assign({}, czech);
    }

    return Object.assign({}, english);
}