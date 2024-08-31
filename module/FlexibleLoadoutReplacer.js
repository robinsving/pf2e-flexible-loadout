import { id as SCRIPT_ID } from "../module.json";
import { popup, settings, getSettings, info } from "./utilities/Utilities.js";

export const replaceLoadedCollection = SCRIPT_ID + "-selection-actor";

export default class FlexibleLoadoutReplacer {

    constructor() {
        // Wait for app to be ready
        Hooks.on(replaceLoadedCollection, (actor, collection) =>  {
            popup(`Acting on Character Sheet clicking: ${actor.name} will get ${collection}`)


            //const actor = await fromUuid(actorId)

            // re-render?
            //game.actors.get(data.actor._id).sheet.render(true);
        });
    }

}