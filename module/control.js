import FlexibleLoadoutRunner from "./FlexibleLoadoutRunner";
import FlexibleLoadoutSettings from "./FlexibleLoadoutSettings";
import { info } from "./utilities/Utilities";

$(document).ready(() => {

    // Register callback for Setup phase, as we need game.user to be set
    Hooks.once("setup", () => {
        info(`Initializing`);

        // Register settings
        new FlexibleLoadoutSettings();

        // Create the Revitalizer
        new FlexibleLoadoutRunner();
    });
});
