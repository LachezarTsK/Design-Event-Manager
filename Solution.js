
// const {PriorityQueue} = require('@datastructures-js/priority-queue');
/*
 PriorityQueue is internally included in the solution file on leetcode.
 When running the code on leetcode it should stay commented out. 
 It is mentioned here just for information about the external library 
 that is applied for this data structure.
 */

class Event {

    /**
     * @param {number} ID
     * @param {number} priority
     */
    constructor(ID, priority) {
        this.ID = ID;
        this.priority = priority;
    }
}

class EventManager {

    static #NO_ACTIVE_EVENTS = -1;
    // PriorityQueue<Event>
    #maxHeap;
    // Map<number, number>
    #idToNewestPriority

    /**
     * @param {number[][]} events
     */
    constructor(events) {
        this.#maxHeap = new PriorityQueue((first, second) => this.#comparator(first, second));
        this.#idToNewestPriority = new Map();

        for (let [ID, priority] of events) {
            this.#maxHeap.enqueue(new Event(ID, priority));
            this.#idToNewestPriority.set(ID, priority);
        }
    }

    /** 
     * @param {number} eventID 
     * @param {number} newPriority
     * @return {void}
     */
    updatePriority(eventID, newPriority) {
        this.#maxHeap.enqueue(new Event(eventID, newPriority));
        this.#idToNewestPriority.set(eventID, newPriority);
    }

    /**
     * @return {number}
     */
    pollHighest() {
        while (!this.#maxHeap.isEmpty() && this.#idToNewestPriority.size > 0) {
            const event = this.#maxHeap.dequeue();

            if (this.#idToNewestPriority.has(event.ID) && this.#idToNewestPriority.get(event.ID) === event.priority) {
                this.#idToNewestPriority.delete(event.ID);
                return event.ID;
            }
        }
        return EventManager.#NO_ACTIVE_EVENTS;
    }

    /** 
     * @param {Event} first 
     * @param {Event} second
     * @return {number}
     */
    #comparator(first, second) {
        if (first.priority === second.priority) {
            return first.ID - second.ID;
        }
        return second.priority - first.priority;
    }
}
