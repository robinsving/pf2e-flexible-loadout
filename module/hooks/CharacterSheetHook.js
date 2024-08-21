import { id as SCRIPT_ID, title as SCRIPT_NAME } from "../../module.json";
import { replaceLoadedCollection } from "../FlexibleLoadoutReplacer.js";
import { info, getNestedProperty, getSettings, settings } from "../utilities/Utilities.js";

export default class CharacterSheetHook {
    
    constructor() {
        // Wait for app to be ready
        Hooks.once('ready', () => {
            info("Creating Hooks for Spell Sheet rendering")

            /**
             * Register hooks for all Character sheets
             */
            Object.values(CONFIG.Actor.sheetClasses.character)
                .map((sheetClass) => sheetClass.cls)
                .map((sheet) => sheet.name)
                .forEach((sheet) => { this.#registerHook(sheet) });
        });
    }

    #registerHook(sheet) {
        Hooks.on("render" + sheet, (app, html, data) => {
            // Determine if button should be visible to user
            // If we don't own this actor, then don't draw anything
            if (!game.user.isGM && !data.actor.ownership.hasOwnProperty(game.userId))
                return;

            const actorId = getNestedProperty(data, "actor._id");

            if (!actorId)
                return;

            const actor = getNestedProperty(data, "actor");

            // fetch current Actor's collections
            //TODO1: this actor does not seem to have "spellcasting"
            const actorCollections = getNestedProperty(actor, "spellcasting.collections").filter(collection => collection.size)
            
            // if there are no spell collections, we needn't continue
            if (!actorCollections)
                return;

            /* TODO
                Remove any existing versions of button
            */
           
            // load Collections for Actor
            const collectionCount = getSettings(settings.repertoireCount.id);
            const repertoireStorage = getSettings(settings.repertoireStorage.id);

            // If this Actor has nothing stored
            if (!repertoireStorage.hasActor(actorId))
                repertoireStorage.addActor(actorId);

            const flexibleCollections = repertoireStorage.getActor(actorId);

            actorCollections.forEach(collection => {
                info(collection);

                // TODO: Create the missing flexible cllections
                // Create new flexible collections if there are lacking for this actor
                for (let index = actorCollections.length; index < collectionCount; index++) {
                    actorCollections[index] = 
                    info(actorCollections.length);
                }
            });


            /* TODO

            for each Collection belonging to actor
                Check if they exist, otherwise copy from actorId's default Collection
                Create a button for each, with name and appropriate Collection

                Create a button.click(() => Hooks.call(replaceCollection, [data.actor._id], Collection[i]));

                Add the button in appropriate place
            end
            */

            const className = `${SCRIPT_ID}-initiate-single-actor`;
            const button = $(`
                <a class="${className}" title="Do something using ${SCRIPT_NAME}">
                    <i class="fas fa-solid fa-code-compare"></i>
                    Load different Collection
                </a>`
            );

            // add onclick event to start a Revitalizer run for Actor Id
            button.click(() => Hooks.call(replaceLoadedCollection, [data.actor._id], 1));

            // remove any existing versions of button
            html.closest('.app').find(`.${className}`).remove();

            // add the new button
            let titleElement = html.closest('.app').find('.window-title');
            if (!app._minimized) button.insertAfter(titleElement);
        });
    }
}