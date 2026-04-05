
import java.util.*

class EventManager(events: Array<IntArray>) {

    private data class Event(val ID: Int, val priority: Int)

    private companion object {
        const val NO_ACTIVE_EVENTS = -1
    }

    private val maxHeap = PriorityQueue<Event>() { first, second -> comparator(first, second) }
    private val idToNewestPriority = mutableMapOf<Int, Int>()

    init {
        for ((ID, priority) in events) {
            maxHeap.add(Event(ID, priority))
            idToNewestPriority[ID] = priority
        }
    }

    fun updatePriority(eventID: Int, newPriority: Int) {
        maxHeap.add(Event(eventID, newPriority))
        idToNewestPriority[eventID] = newPriority
    }

    fun pollHighest(): Int {
        while (!maxHeap.isEmpty() && !idToNewestPriority.isEmpty()) {
            val event = maxHeap.poll()

            if (idToNewestPriority.containsKey(event.ID) && idToNewestPriority[event.ID] == event.priority) {
                idToNewestPriority.remove(event.ID)
                return event.ID
            }
        }
        return NO_ACTIVE_EVENTS
    }

    private fun comparator(first: Event, second: Event): Int {
        if (first.priority == second.priority) {
            return first.ID - second.ID
        }
        return second.priority - first.priority
    }
}
