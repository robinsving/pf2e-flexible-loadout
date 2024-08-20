import { id as SCRIPT_ID, title } from "../../module.json";
export { debug, info, popup, settings, getSettings, getNestedProperty };

const settings = {
    debug: { id: "debugMode", name: "Enable Debugging", hint: "Print debug to console log" },
    repertoireCount: { id: "repertoireCount", name: "Repertoire Amounts", hint: "Amount of pre-planned repertoires" },
    repertoireStorage: { id: "repertoireStorage", name: "Repertoire Storage", hint: "List for storing all pre-planned repertoires" },
}

function getSettings(setting) {
    return game.settings.get(SCRIPT_ID, setting);
}

function getNestedProperty(obj, path) {
    try {
        const value = path.split('.').reduce((acc, key) => acc[key], obj);
        return value !== undefined ? value : null;
    } catch (error) {
        return null;
    }
}

function popup(message) {
    ui.notifications.info(`${title}: ${message}`);
}

function debug(message) {
    if (getSettings(settings.debug.id))
        console.debug(`${title}: ${message}`);
}

function info(message) {
    console.info(`${title}: ${message}`);
}
