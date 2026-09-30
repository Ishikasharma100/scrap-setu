import {
  Activity,
  CheckCircle2,
  Package,
  Truck,
  Recycle,
} from "lucide-react";

const activities = [
  {
    title: "Lot accepted",
    description: "LOT-1025 · Mobile Phones",
    time: "Today, 11:30 AM",
    icon: CheckCircle2,
    color: "green",
  },
  {
    title: "New lot received",
    description: "LOT-1026 · Electronic Components",
    time: "Today, 10:15 AM",
    icon: Package,
    color: "blue",
  },
  {
    title: "Pickup scheduled",
    description: "PICK-201 · Ghaziabad",
    time: "Yesterday, 04:30 PM",
    icon: Truck,
    color: "orange",
  },
  {
    title: "Recycling completed",
    description: "LOT-1018 · 45 kg processed",
    time: "Yesterday, 12:20 PM",
    icon: Recycle,
    color: "purple",
  },
];

function RecentActivities({ compact = false }) {
  const displayedActivities = compact
    ? activities.slice(0, 4)
    : activities;

  return (
    <section className="recycler-panel recycler-activities-panel">
      <div className="recycler-panel-header">
        <div>
          <div className="recycler-panel-title">
            <Activity size={19} />
            <h2>Recent Activities</h2>
          </div>

          <p>Latest updates from your recycling operations.</p>
        </div>
      </div>

      <div className="recycler-activities-list">
        {displayedActivities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              className="recycler-activity-item"
              key={`${activity.title}-${index}`}
            >
              <div
                className={`recycler-activity-icon ${activity.color}`}
              >
                <Icon size={18} />
              </div>

              <div className="recycler-activity-copy">
                <strong>{activity.title}</strong>
                <p>{activity.description}</p>
              </div>

              <span className="recycler-activity-time">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentActivities;