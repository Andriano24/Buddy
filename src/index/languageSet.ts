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
    if (lang == "greek" || lang == "gr") {
        return Object.assign({}, greek);
    }
    else if (lang == "spanish" || lang == "es") {
        return Object.assign({}, spanish);
    }
    else if (lang == "italian" || lang == "it") {
        return Object.assign({}, italian);
    }
    else if (lang == "german" || lang == "de") {
        return Object.assign({}, german);
    }
    else if (lang == "polish" || lang == "pl") {
        return Object.assign({}, polish);
    }
    else if (lang == "slovak" || lang == "sl") {
        return Object.assign({}, slovak);
    }
    else if (lang == "czech" || lang == "cz") {
        return Object.assign({}, czech);
    }

    return Object.assign({}, english);
}