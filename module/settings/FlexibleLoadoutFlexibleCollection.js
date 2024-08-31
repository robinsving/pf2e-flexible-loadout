
export default class FlexibleLoadoutFlexibleCollection {
    constructor() {
        // Flexible collections, have a description and a PF2e SpellCollection
        this.flexibleCollections = new Map();

        // currently selected Flexible collection for this Collection (description)
        this.currentCollection;
    }

    addFlexibleCollection(description, collection) {
        this.flexibleCollections.set(description, collection)
    }

    getFlexibleCollectionCount() {
        return this.flexibleCollections.length;
    }
}