import { id as SCRIPT_ID } from "../module.json";
import { popup, settings, getSettings, info } from "./utilities/Utilities.js";

export const replaceLoadedCollection = SCRIPT_ID + "-selection-actor";

export default class FlexibleLoadoutReplacer {

    constructor() {
        // Wait for app to be ready
        Hooks.on(replaceLoadedCollection, (actorId, collection) => {
            info("Acting on Character Sheet clicking")
        });
    }

}