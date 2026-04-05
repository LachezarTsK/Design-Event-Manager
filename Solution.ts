
// const {PriorityQueue} = require('@datastructures-js/priority-queue');
/*
 PriorityQueue is internally included in the solution file on leetcode.
 When running the code on leetcode it should stay commented out. 
 It is mentioned here just for information about the external library 
 that is applied for this data structure.
 */

type Event = { ID: number, priority: number };

class EventManager {

    private static NO_ACTIVE_EVENTS = -1;
    private maxHeap = new PriorityQueue<Event>((first, second) => this.comparator(first, second));
    private idToNewestPriority = new Map<number, number>();

    constructor(events: number[][]) {
        for (let [ID, priority] of events) {
            this.maxHeap.enqueue({ ID: ID, priority: priority });
            this.idToNewestPriority.set(ID, priority);
        }
    }

    updatePriority(eventID: number, newPriority: number): void {
        this.maxHeap.enqueue({ ID: eventID, priority: newPriority });
        this.idToNewestPriority.set(eventID, newPriority);
    }

    pollHighest(): number {
        while (!this.maxHeap.isEmpty() && this.idToNewestPriority.size > 0) {
            const event = this.maxHeap.dequeue();
            
            if (this.idToNewestPriority.has(event.ID) && this.idToNewestPriority.get(event.ID) === event.priority) {
                this.idToNewestPriority.delete(event.ID);
                return event.ID;
            }
        }
        return EventManager.NO_ACTIVE_EVENTS;
    }

    private comparator(first: Event, second: Event): number {
        if (first.priority === second.priority) {
            return first.ID - second.ID;
        }
        return second.priority - first.priority;
    }
}
