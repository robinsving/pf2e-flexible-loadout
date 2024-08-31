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


            // Create a button to create clones
            // Create a feature, that when loading the Sheet, it removes all clones that aren't the selected clone
            // Create a button to a page to list the clones
            // Create a feature to choose the main clone
            
            // Get the spellcasting entry
            // Location for the prepared slots
            Array.from(game.actors.get(data.actor._id).spellcasting.collections.values()).filter(s => s.entry?.system?.prepared?.value == "prepared")
            //.filter(s => spellcollections.contains(s.id))[0].system.slots
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

            // fetch current Actor's collections
            const spellCollectionGroup = data.spellCollectionGroups["known-spells"]
                .filter(s => s.isPrepared && s.hasCollection); // || s.isFlexible)

            // if there are no spell collections, we needn't continue
            if (!spellCollectionGroup.length)
                return;

            /* TODO
                Remove any existing versions of button
            */
           
            // load Collections for Actor
            const settingsFlexibleCount = getSettings(settings.repertoireCount.id);
            const repertoireStorage = getSettings(settings.repertoireStorage.id);

            // If this Actor has nothing stored
            if (!repertoireStorage.hasActor(actorId))
                repertoireStorage.addActor(actorId);

            const flexbleActor = repertoireStorage.getActor(actorId);

            spellCollectionGroup.forEach(collection => {
                info(collection.id);

                if (!flexbleActor.hasCollection(collection.id))
                    flexbleActor.addCollection(collection)

                const storedCollection = flexbleActor.getCollection(collection.id);

                // Create new flexible collections if they are lacking for this collection
                for (let index = storedCollection.getFlexibleCollectionCount(); index < settingsFlexibleCount; index++) {
                    storedCollection.addFlexibleCollection(`${collection.id}_${index}`, collection);
                }

                let currentCollection = flexbleActor.getCurrentCollection(collection.id);
                if (currentCollection)
                    collection = currentCollection;
                else {
                    // TODO: Let's do a test, and manipulate the collections by changing places of two spells, just to make sure that we can replace the current collection on click
                    // it may be that we need to manipulate the object before the call to render the sheet. This may require re-rendering.

                    delete collection.groups[0].active[4];
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

            // add onclick event to replace collection for Actor
            button.click(() => Hooks.call(replaceLoadedCollection, data.actor, spellCollectionGroup[0]));

            // remove any existing versions of button
            html.closest('.app').find(`.${className}`).remove();

            // add the new button
            let titleElement = html.closest('.app').find('.window-title');
            if (!app._minimized) button.insertAfter(titleElement);
        });
    }
}