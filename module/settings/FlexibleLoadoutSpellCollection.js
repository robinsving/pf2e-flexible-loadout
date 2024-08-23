import FlexibleLoadoutFlexibleCollection from "./FlexibleLoadoutFlexibleCollection";

export default class FlexibleLoadoutSpellCollection {
    constructor() {
        // All SpellCollections belonging to Actor
        this.collections = new Map(); // {collectionId, FlexibleCollections}
    }

    addCollection(collectionId, collection) {
        this.collections.set(collectionId, new FlexibleLoadoutFlexibleCollection(description, collection))
    }

    getCollections(collectionId) {
        return this.collections[collectionId];
    }

    hasCollections(collectionId) {
        return this.collections.has(collectionId);
    }
}