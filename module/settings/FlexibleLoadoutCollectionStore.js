import FlexibleLoadoutSpellCollection from "./FlexibleLoadoutSpellCollection";

export default class FlexibleLoadoutCollectionStore {
    constructor(parsedJson) {
        //TODO: Use the parsedJson, Luke
        this.actorSpellCollections = new Map();

        // Initialize the Set from parsed JSON data
        //this._initializeFromJson(parsedJson);
    }

    addActor(actorId) {
        this.actorSpellCollections.set(actorId, new FlexibleLoadoutSpellCollection())
    }

    hasActor(actorId) {
        return this.actorSpellCollections.has(actorId);
    }

    getActor(actorId) {
        return this.actorSpellCollections.get(actorId);
    }

    // initialize the Set from JSON data
    _initializeFromJson(parsedJson) {
        if (!parsedJson)
            return;

        //TODO: Handle Set containing Map
        parsedJson.forEach(entry => {
            const actorId = entry.actorId;
            const collectionSet = entry.collectionSet;

            this.actorSpellCollections.add({ actorId, collectionSet });
        });
    }

    // Optional: Add a method to add more entries
    addCollection(actorId, name, collection) {
        const actor = this.actorSpellCollections[actorId];
        if (!actor)
            return new Set(name, collection);
        
        this.actorSpellCollections[actorId].push(name, collection);
    }
}