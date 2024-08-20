import { id as SCRIPT_ID } from "../module.json";
import { settings } from "./utilities/Utilities.js";

export default class FlexibleLoadoutSettings {
    
    constructor() {
        // Print out debug to console.
        game.settings.register(SCRIPT_ID, settings.debug.id, {
            name: settings.debug.name,
            hint: settings.debug.hint,
            scope: 'client',
            config: true,
            default: false,
            type: Boolean
        });

        // List of total preparations
        game.settings.register(SCRIPT_ID,  settings.repertoireCount.id, {
            name: settings.repertoireCount.name,
            scope: 'client',
            config: true,
            default: "2",
            type: Number
        });

        // List of existing preparations
        game.settings.register(SCRIPT_ID,  settings.repertoireStorage.id, {
            name: settings.repertoireStorage.name,
            scope: 'client',
            config: false,
            default: "",
            type: String
        });
    }
}