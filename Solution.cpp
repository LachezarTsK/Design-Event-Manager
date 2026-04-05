
#include <queue>
#include <vector>
#include <unordered_map>
using namespace std;

class EventManager {

    struct  Event {
        int ID{};
        int priority{};
        Event(int ID, int priority) : ID{ ID }, priority{ priority } {}
    };

    struct Comparator {
        bool operator()(const Event& first, const Event& second) const {
            if (first.priority == second.priority) {
                return first.ID > second.ID;
            }
            return second.priority > first.priority;
        }
    };

    const static int NO_ACTIVE_EVENTS = -1;

    priority_queue<Event, vector<Event>, Comparator> maxHeap;
    unordered_map<int, int> idToNewestPriority;

public:
    EventManager(vector<vector<int>>& events) {
        for (const auto& event : events) {
            int ID = event[0];
            int priority = event[1];

            maxHeap.emplace(ID, priority);
            idToNewestPriority[ID] = priority;
        }
    }

    void updatePriority(int eventID, int newPriority) {
        maxHeap.emplace(eventID, newPriority);
        idToNewestPriority[eventID] = newPriority;
    }

    int pollHighest() {
        while (!maxHeap.empty() && !idToNewestPriority.empty()) {

            Event event = maxHeap.top();
            maxHeap.pop();

            if (idToNewestPriority.contains(event.ID) && idToNewestPriority[event.ID] == event.priority) {
                idToNewestPriority.erase(event.ID);
                return event.ID;
            }
        }
        return NO_ACTIVE_EVENTS;
    }
};
