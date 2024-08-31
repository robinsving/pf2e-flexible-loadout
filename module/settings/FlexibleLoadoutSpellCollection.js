import FlexibleLoadoutFlexibleCollection from "./FlexibleLoadoutFlexibleCollection";

export default class FlexibleLoadoutSpellCollection {
    constructor() {
        // All SpellCollections belonging to Actor
        this.collections = new Map(); // {collectionId, FlexibleCollections}
    }

    addCollection(collection) {
        this.collections.set(collection.id, new FlexibleLoadoutFlexibleCollection())
    }

    getCollection(collectionId) {
        return this.collections.get(collectionId);
    }

    hasCollection(collectionId) {
        return this.collections.has(collectionId);
    }

    getCurrentCollection(collectionId) {
        if (this.hasCollection(collectionId) && this.getCollection(collectionId).currentCollection)
            return this.collections[collectionId].flexibleCollections(this.collections[collectionId].currentCollection);
    }

    setCurrentCollection(collectionId, flexibleCollectionDescription) {
        if (this.hasCollection(collectionId))
            return this.collections[collectionId].currentCollection = flexibleCollectionDescription;
    }
}