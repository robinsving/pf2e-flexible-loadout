import { id as SCRIPT_ID, title as SCRIPT_NAME } from "../module.json";
import { popup, settings, getSettings } from "./utilities/Utilities.js";

export const replaceCollection = SCRIPT_ID + "-selection-actor";

export default class FlexibleLoadoutRunner {

    constructor() {
        if (getSettings(settings.repertoireCount.id) < 2 || getSettings(settings.repertoireCount.id) > 6) {
            popup("Bad configuration");
            return
        }

        // Register Sheet link for everyone
        //new SpellSheetHook();
    }


    /**
     * Runs comparison for all Items in actors, comparing them to the Items in the PF2e Compendium
     * @param {_CharacterPF2e[]} actors list of Actors to display
     * @returns Array containing object with data required to display data
     *
    async #renderElementForSelection(actors) {
        await new Dialog({
            title: SCRIPT_NAME,
            content: rendered_html,
            buttons: {
                ok: {
                    icon: '<i class="fas fa-selection"></i>',
                    label: "Proceed",
                    callback: () => this.#replaceCollection(),
                },
                cancel: {
                    icon: '<i class="fas fa-close"></i>',
                    label: "Close",
                },
            },
        }).render(true);
    }*/
}