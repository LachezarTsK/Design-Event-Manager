
using System;
using System.Collections.Generic;

public class EventManager
{
    private record Event(int ID, int Priority) { }

    private static readonly int NO_ACTIVE_EVENTS = -1;

    private readonly PriorityQueue<Event, Event> maxHeap = new(Comparer<Event>.Create((first, second) => Comparator(first, second)));
    private readonly Dictionary<int, int> idToNewestPriority = [];

    public EventManager(int[][] events)
    {
        foreach (int[] current in events)
        {
            int ID = current[0];
            int priority = current[1];

            maxHeap.Enqueue(new Event(ID, priority), new Event(ID, priority));
            idToNewestPriority.Add(ID, priority);
        }
    }

    public void UpdatePriority(int eventID, int newPriority)
    {
        maxHeap.Enqueue(new Event(eventID, newPriority), new Event(eventID, newPriority));
        idToNewestPriority[eventID] = newPriority;
    }

    public int PollHighest()
    {
        while (maxHeap.Count > 0 && idToNewestPriority.Count > 0)
        {
            Event current = maxHeap.Dequeue();

            if (idToNewestPriority.ContainsKey(current.ID) && idToNewestPriority[current.ID] == current.Priority)
            {
                idToNewestPriority.Remove(current.ID);
                return current.ID;
            }
        }
        return NO_ACTIVE_EVENTS;
    }

    private static int Comparator(Event first, Event second)
    {
        if (first.Priority == second.Priority)
        {
            return first.ID - second.ID;
        }
        return second.Priority - first.Priority;
    }
}
