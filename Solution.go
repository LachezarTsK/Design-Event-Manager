
package main
import "container/heap"

const NO_ACTIVE_EVENTS = -1

type Event struct {
    ID       int
    priority int
}

type EventManager struct {
    maxHeap            PriorityQueue
    idToNewestPriority map[int]int
}

func Constructor(events [][]int) EventManager {
    eventManager := EventManager{
        maxHeap:            PriorityQueue{},
        idToNewestPriority: map[int]int{},
    }

    for i := range events {
        ID := events[i][0]
        priority := events[i][1]
        heap.Push(&eventManager.maxHeap, Event{ID, priority})
        eventManager.idToNewestPriority[ID] = priority
    }
    return eventManager
}

func (this *EventManager) UpdatePriority(eventID int, newPriority int) {
    heap.Push(&this.maxHeap, Event{eventID, newPriority})
    this.idToNewestPriority[eventID] = newPriority
}

func (this *EventManager) PollHighest() int {
    for !this.maxHeap.isEmpty() && len(this.idToNewestPriority) > 0 {
        event := heap.Pop(&this.maxHeap).(Event)

        if containsKey(this.idToNewestPriority, event.ID) && this.idToNewestPriority[event.ID] == event.priority {
            delete(this.idToNewestPriority, event.ID)
            return event.ID
        }
    }
    return NO_ACTIVE_EVENTS
}

func containsKey[Key comparable, Value any](mapToCheck map[Key]Value, key Key) bool {
    var has bool
    _, has = mapToCheck[key]
    return has
}

func comparator(first *Event, second *Event) bool {
    if first.priority == second.priority {
        return first.ID < second.ID
    }
    return second.priority < first.priority
}

type PriorityQueue []Event

func (this PriorityQueue) Len() int {
    return len(this)
}

func (this PriorityQueue) Less(first int, second int) bool {
    return comparator(&this[first], &this[second])
}

func (this PriorityQueue) Swap(first int, second int) {
    this[first], this[second] = this[second], this[first]
}

func (this *PriorityQueue) Push(object any) {
    *this = append(*this, object.(Event))
}

func (this *PriorityQueue) Pop() any {
    event := (*this)[this.Len() - 1]
    *this = (*this)[0 : this.Len() - 1]
    return event
}

func (this PriorityQueue) isEmpty() bool {
    return this.Len() == 0
}
