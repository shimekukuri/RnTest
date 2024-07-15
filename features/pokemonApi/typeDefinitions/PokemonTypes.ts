// To parse this data:
//
//   import { Convert, PokemonSearchResult } from "./file";
//
//   const pokemonSearchResult = Convert.toPokemonSearchResult(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface PokemonSearchResult {
    abilities?:                Ability[];
    base_experience?:          number;
    cries?:                    Cries;
    forms?:                    Species[];
    game_indices?:             GameIndex[];
    height?:                   number;
    held_items?:               HeldItem[];
    id?:                       number;
    is_default?:               boolean;
    location_area_encounters?: string;
    moves?:                    Move[];
    name?:                     string;
    order?:                    number;
    past_abilities?:           any[];
    past_types?:               any[];
    species?:                  Species;
    sprites?:                  Sprites;
    stats?:                    Stat[];
    types?:                    Type[];
    weight?:                   number;
}

export interface Ability {
    ability?:   Species;
    is_hidden?: boolean;
    slot?:      number;
}

export interface Species {
    name?: string;
    url?:  string;
}

export interface Cries {
    latest?: string;
    legacy?: string;
}

export interface GameIndex {
    game_index?: number;
    version?:    Species;
}

export interface HeldItem {
    item?:            Species;
    version_details?: VersionDetail[];
}

export interface VersionDetail {
    rarity?:  number;
    version?: Species;
}

export interface Move {
    move?:                  Species;
    version_group_details?: VersionGroupDetail[];
}

export interface VersionGroupDetail {
    level_learned_at?:  number;
    move_learn_method?: Species;
    version_group?:     Species;
}

export interface GenerationV {
    "black-white"?: Sprites;
}

export interface GenerationIv {
    "diamond-pearl"?:        Sprites;
    "heartgold-soulsilver"?: Sprites;
    platinum?:               Sprites;
}

export interface Versions {
    "generation-i"?:    GenerationI;
    "generation-ii"?:   GenerationIi;
    "generation-iii"?:  GenerationIii;
    "generation-iv"?:   GenerationIv;
    "generation-v"?:    GenerationV;
    "generation-vi"?:   { [key: string]: Home };
    "generation-vii"?:  GenerationVii;
    "generation-viii"?: GenerationViii;
}

export interface Other {
    dream_world?:        DreamWorld;
    home?:               Home;
    "official-artwork"?: OfficialArtwork;
    showdown?:           Sprites;
}

export interface Sprites {
    back_default?:       string;
    back_female?:        string;
    back_shiny?:         string;
    back_shiny_female?:  null | string;
    front_default?:      string;
    front_female?:       string;
    front_shiny?:        string;
    front_shiny_female?: string;
    other?:              Other;
    versions?:           Versions;
    animated?:           Sprites;
}

export interface GenerationI {
    "red-blue"?: RedBlue;
    yellow?:     RedBlue;
}

export interface RedBlue {
    back_default?:      string;
    back_gray?:         string;
    back_transparent?:  string;
    front_default?:     string;
    front_gray?:        string;
    front_transparent?: string;
}

export interface GenerationIi {
    crystal?: Crystal;
    gold?:    Gold;
    silver?:  Gold;
}

export interface Crystal {
    back_default?:            string;
    back_shiny?:              string;
    back_shiny_transparent?:  string;
    back_transparent?:        string;
    front_default?:           string;
    front_shiny?:             string;
    front_shiny_transparent?: string;
    front_transparent?:       string;
}

export interface Gold {
    back_default?:      string;
    back_shiny?:        string;
    front_default?:     string;
    front_shiny?:       string;
    front_transparent?: string;
}

export interface GenerationIii {
    emerald?:             OfficialArtwork;
    "firered-leafgreen"?: Gold;
    "ruby-sapphire"?:     Gold;
}

export interface OfficialArtwork {
    front_default?: string;
    front_shiny?:   string;
}

export interface Home {
    front_default?:      string;
    front_female?:       string;
    front_shiny?:        string;
    front_shiny_female?: string;
}

export interface GenerationVii {
    icons?:                  DreamWorld;
    "ultra-sun-ultra-moon"?: Home;
}

export interface DreamWorld {
    front_default?: string;
    front_female?:  null | string;
}

export interface GenerationViii {
    icons?: DreamWorld;
}

export interface Stat {
    base_stat?: number;
    effort?:    number;
    stat?:      Species;
}

export interface Type {
    slot?: number;
    type?: Species;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toPokemonSearchResult(json: string): PokemonSearchResult {
        return cast(JSON.parse(json), r("PokemonSearchResult"));
    }

    public static pokemonSearchResultToJson(value: PokemonSearchResult): string {
        return JSON.stringify(uncast(value, r("PokemonSearchResult")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "PokemonSearchResult": o([
        { json: "abilities", js: "abilities", typ: u(undefined, a(r("Ability"))) },
        { json: "base_experience", js: "base_experience", typ: u(undefined, 0) },
        { json: "cries", js: "cries", typ: u(undefined, r("Cries")) },
        { json: "forms", js: "forms", typ: u(undefined, a(r("Species"))) },
        { json: "game_indices", js: "game_indices", typ: u(undefined, a(r("GameIndex"))) },
        { json: "height", js: "height", typ: u(undefined, 0) },
        { json: "held_items", js: "held_items", typ: u(undefined, a(r("HeldItem"))) },
        { json: "id", js: "id", typ: u(undefined, 0) },
        { json: "is_default", js: "is_default", typ: u(undefined, true) },
        { json: "location_area_encounters", js: "location_area_encounters", typ: u(undefined, "") },
        { json: "moves", js: "moves", typ: u(undefined, a(r("Move"))) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "order", js: "order", typ: u(undefined, 0) },
        { json: "past_abilities", js: "past_abilities", typ: u(undefined, a("any")) },
        { json: "past_types", js: "past_types", typ: u(undefined, a("any")) },
        { json: "species", js: "species", typ: u(undefined, r("Species")) },
        { json: "sprites", js: "sprites", typ: u(undefined, r("Sprites")) },
        { json: "stats", js: "stats", typ: u(undefined, a(r("Stat"))) },
        { json: "types", js: "types", typ: u(undefined, a(r("Type"))) },
        { json: "weight", js: "weight", typ: u(undefined, 0) },
    ], false),
    "Ability": o([
        { json: "ability", js: "ability", typ: u(undefined, r("Species")) },
        { json: "is_hidden", js: "is_hidden", typ: u(undefined, true) },
        { json: "slot", js: "slot", typ: u(undefined, 0) },
    ], false),
    "Species": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "url", js: "url", typ: u(undefined, "") },
    ], false),
    "Cries": o([
        { json: "latest", js: "latest", typ: u(undefined, "") },
        { json: "legacy", js: "legacy", typ: u(undefined, "") },
    ], false),
    "GameIndex": o([
        { json: "game_index", js: "game_index", typ: u(undefined, 0) },
        { json: "version", js: "version", typ: u(undefined, r("Species")) },
    ], false),
    "HeldItem": o([
        { json: "item", js: "item", typ: u(undefined, r("Species")) },
        { json: "version_details", js: "version_details", typ: u(undefined, a(r("VersionDetail"))) },
    ], false),
    "VersionDetail": o([
        { json: "rarity", js: "rarity", typ: u(undefined, 0) },
        { json: "version", js: "version", typ: u(undefined, r("Species")) },
    ], false),
    "Move": o([
        { json: "move", js: "move", typ: u(undefined, r("Species")) },
        { json: "version_group_details", js: "version_group_details", typ: u(undefined, a(r("VersionGroupDetail"))) },
    ], false),
    "VersionGroupDetail": o([
        { json: "level_learned_at", js: "level_learned_at", typ: u(undefined, 0) },
        { json: "move_learn_method", js: "move_learn_method", typ: u(undefined, r("Species")) },
        { json: "version_group", js: "version_group", typ: u(undefined, r("Species")) },
    ], false),
    "GenerationV": o([
        { json: "black-white", js: "black-white", typ: u(undefined, r("Sprites")) },
    ], false),
    "GenerationIv": o([
        { json: "diamond-pearl", js: "diamond-pearl", typ: u(undefined, r("Sprites")) },
        { json: "heartgold-soulsilver", js: "heartgold-soulsilver", typ: u(undefined, r("Sprites")) },
        { json: "platinum", js: "platinum", typ: u(undefined, r("Sprites")) },
    ], false),
    "Versions": o([
        { json: "generation-i", js: "generation-i", typ: u(undefined, r("GenerationI")) },
        { json: "generation-ii", js: "generation-ii", typ: u(undefined, r("GenerationIi")) },
        { json: "generation-iii", js: "generation-iii", typ: u(undefined, r("GenerationIii")) },
        { json: "generation-iv", js: "generation-iv", typ: u(undefined, r("GenerationIv")) },
        { json: "generation-v", js: "generation-v", typ: u(undefined, r("GenerationV")) },
        { json: "generation-vi", js: "generation-vi", typ: u(undefined, m(r("Home"))) },
        { json: "generation-vii", js: "generation-vii", typ: u(undefined, r("GenerationVii")) },
        { json: "generation-viii", js: "generation-viii", typ: u(undefined, r("GenerationViii")) },
    ], false),
    "Other": o([
        { json: "dream_world", js: "dream_world", typ: u(undefined, r("DreamWorld")) },
        { json: "home", js: "home", typ: u(undefined, r("Home")) },
        { json: "official-artwork", js: "official-artwork", typ: u(undefined, r("OfficialArtwork")) },
        { json: "showdown", js: "showdown", typ: u(undefined, r("Sprites")) },
    ], false),
    "Sprites": o([
        { json: "back_default", js: "back_default", typ: u(undefined, "") },
        { json: "back_female", js: "back_female", typ: u(undefined, "") },
        { json: "back_shiny", js: "back_shiny", typ: u(undefined, "") },
        { json: "back_shiny_female", js: "back_shiny_female", typ: u(undefined, u(null, "")) },
        { json: "front_default", js: "front_default", typ: u(undefined, "") },
        { json: "front_female", js: "front_female", typ: u(undefined, "") },
        { json: "front_shiny", js: "front_shiny", typ: u(undefined, "") },
        { json: "front_shiny_female", js: "front_shiny_female", typ: u(undefined, "") },
        { json: "other", js: "other", typ: u(undefined, r("Other")) },
        { json: "versions", js: "versions", typ: u(undefined, r("Versions")) },
        { json: "animated", js: "animated", typ: u(undefined, r("Sprites")) },
    ], false),
    "GenerationI": o([
        { json: "red-blue", js: "red-blue", typ: u(undefined, r("RedBlue")) },
        { json: "yellow", js: "yellow", typ: u(undefined, r("RedBlue")) },
    ], false),
    "RedBlue": o([
        { json: "back_default", js: "back_default", typ: u(undefined, "") },
        { json: "back_gray", js: "back_gray", typ: u(undefined, "") },
        { json: "back_transparent", js: "back_transparent", typ: u(undefined, "") },
        { json: "front_default", js: "front_default", typ: u(undefined, "") },
        { json: "front_gray", js: "front_gray", typ: u(undefined, "") },
        { json: "front_transparent", js: "front_transparent", typ: u(undefined, "") },
    ], false),
    "GenerationIi": o([
        { json: "crystal", js: "crystal", typ: u(undefined, r("Crystal")) },
        { json: "gold", js: "gold", typ: u(undefined, r("Gold")) },
        { json: "silver", js: "silver", typ: u(undefined, r("Gold")) },
    ], false),
    "Crystal": o([
        { json: "back_default", js: "back_default", typ: u(undefined, "") },
        { json: "back_shiny", js: "back_shiny", typ: u(undefined, "") },
        { json: "back_shiny_transparent", js: "back_shiny_transparent", typ: u(undefined, "") },
        { json: "back_transparent", js: "back_transparent", typ: u(undefined, "") },
        { json: "front_default", js: "front_default", typ: u(undefined, "") },
        { json: "front_shiny", js: "front_shiny", typ: u(undefined, "") },
        { json: "front_shiny_transparent", js: "front_shiny_transparent", typ: u(undefined, "") },
        { json: "front_transparent", js: "front_transparent", typ: u(undefined, "") },
    ], false),
    "Gold": o([
        { json: "back_default", js: "back_default", typ: u(undefined, "") },
        { json: "back_shiny", js: "back_shiny", typ: u(undefined, "") },
        { json: "front_default", js: "front_default", typ: u(undefined, "") },
        { json: "front_shiny", js: "front_shiny", typ: u(undefined, "") },
        { json: "front_transparent", js: "front_transparent", typ: u(undefined, "") },
    ], false),
    "GenerationIii": o([
        { json: "emerald", js: "emerald", typ: u(undefined, r("OfficialArtwork")) },
        { json: "firered-leafgreen", js: "firered-leafgreen", typ: u(undefined, r("Gold")) },
        { json: "ruby-sapphire", js: "ruby-sapphire", typ: u(undefined, r("Gold")) },
    ], false),
    "OfficialArtwork": o([
        { json: "front_default", js: "front_default", typ: u(undefined, "") },
        { json: "front_shiny", js: "front_shiny", typ: u(undefined, "") },
    ], false),
    "Home": o([
        { json: "front_default", js: "front_default", typ: u(undefined, "") },
        { json: "front_female", js: "front_female", typ: u(undefined, "") },
        { json: "front_shiny", js: "front_shiny", typ: u(undefined, "") },
        { json: "front_shiny_female", js: "front_shiny_female", typ: u(undefined, "") },
    ], false),
    "GenerationVii": o([
        { json: "icons", js: "icons", typ: u(undefined, r("DreamWorld")) },
        { json: "ultra-sun-ultra-moon", js: "ultra-sun-ultra-moon", typ: u(undefined, r("Home")) },
    ], false),
    "DreamWorld": o([
        { json: "front_default", js: "front_default", typ: u(undefined, "") },
        { json: "front_female", js: "front_female", typ: u(undefined, u(null, "")) },
    ], false),
    "GenerationViii": o([
        { json: "icons", js: "icons", typ: u(undefined, r("DreamWorld")) },
    ], false),
    "Stat": o([
        { json: "base_stat", js: "base_stat", typ: u(undefined, 0) },
        { json: "effort", js: "effort", typ: u(undefined, 0) },
        { json: "stat", js: "stat", typ: u(undefined, r("Species")) },
    ], false),
    "Type": o([
        { json: "slot", js: "slot", typ: u(undefined, 0) },
        { json: "type", js: "type", typ: u(undefined, r("Species")) },
    ], false),
};

