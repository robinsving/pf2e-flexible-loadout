
export default class FlexibleLoadoutFlexibleCollection {
    constructor(description, collection) {
        // Flexible collections, have a description and a PF2e SpellCollection
        this.flexibleCollections = new Map();

        addFlexibleCollection(description, collection)
    }

    addFlexibleCollection(description, collection) {
        this.flexibleCollections.set(description, collection)
    }
}