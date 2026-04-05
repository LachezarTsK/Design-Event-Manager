
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class EventManager {

    private record Event(int ID, int priority) {}

    private static final int NO_ACTIVE_EVENTS = -1;

    private final PriorityQueue<Event> maxHeap;
    private final Map<Integer, Integer> idToNewestPriority;

    public EventManager(int[][] events) {
        maxHeap = new PriorityQueue<>((first, second) -> comparator(first, second));
        idToNewestPriority = new HashMap<>();

        for (int[] event : events) {
            int ID = event[0];
            int priority = event[1];

            maxHeap.add(new Event(ID, priority));
            idToNewestPriority.put(ID, priority);
        }
    }

    public void updatePriority(int eventID, int newPriority) {
        maxHeap.add(new Event(eventID, newPriority));
        idToNewestPriority.put(eventID, newPriority);
    }

    public int pollHighest() {
        while (!maxHeap.isEmpty() && !idToNewestPriority.isEmpty()) {
            Event event = maxHeap.poll();

            if (idToNewestPriority.containsKey(event.ID) && idToNewestPriority.get(event.ID) == event.priority) {
                idToNewestPriority.remove(event.ID);
                return event.ID;
            }
        }
        return NO_ACTIVE_EVENTS;
    }

    private static int comparator(Event first, Event second) {
        if (first.priority == second.priority) {
            return first.ID - second.ID;
        }
        return second.priority - first.priority;
    }
}
