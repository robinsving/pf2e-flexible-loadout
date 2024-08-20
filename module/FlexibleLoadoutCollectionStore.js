import { info } from "./utilities/Utilities";

export default class FlexibleLoadoutCollectionStore {
    constructor(parsedJson) {
        this.actorCollection = new Set();

        // Initialize the Set from parsed JSON data
        this._initializeFromJson(parsedJson);
    }

    // initialize the Set from JSON data
    _initializeFromJson(parsedJson) {
        if (!parsedJson)
            return;

        //TODO: Handle Set containing Set
        parsedJson.forEach(entry => {
            const actorId = entry.actorId;
            const collectionSet = entry.collectionSet;

            this.actorCollection.add({ actorId, collectionSet });
        });
    }

    // Optional: Add a method to add more entries
    addCollection(actorId, name, collection) {
        const actor = this.actorCollection[actorId];
        if (!actor)
            return;
        
        //TODO: add new item to CollectionSet (name)
        this.actorCollection[actorId].push(collection);
    }

    // Optional: Method to find collections by actorId
    getCollectionsByActorId(actorId) {
        for (const entry of this.actorCollection) {
            if (entry.actorId === actorId) {
                return entry.collectionSet;
            }
        }
        return null;
    }
}