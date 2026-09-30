import {
  Activity,
  CheckCircle2,
  PackageCheck,
  Truck,
  Recycle,
  XCircle,
  Settings,
} from "lucide-react";

const iconMap = {
  CheckCircle2,
  PackageCheck,
  Truck,
  Recycle,
  XCircle,
  Settings,
};

function RecentActivities({
  activities = [],
  onViewAll,
  isFullView = false,
}) {
  const displayedActivities = isFullView
    ? activities
    : activities.slice(0, 4);

  return (
    <section className="panel activities-panel">
      <div className="panel-header">
        <div className="panel-heading">
          <div className="panel-icon">
            <Activity size={20} />
          </div>

          <div>
            <h3>Recent Activities</h3>
            <p>Latest updates from your recycling operations.</p>
          </div>
        </div>

        {!isFullView && (
          <button
            type="button"
            className="panel-badge"
            onClick={onViewAll}
            style={{ cursor: onViewAll ? "pointer" : "default" }}
          >
            View All →
          </button>
        )}
      </div>

      <div className="activity-list">
        {displayedActivities.length === 0 ? (
          <div
            style={{
              padding: "24px 16px",
              textAlign: "center",
              color: "#76978c",
              fontSize: "12px",
            }}
          >
            No recent activities logged yet.
          </div>
        ) : (
          displayedActivities.map((activity, index) => {
            const Icon =
              iconMap[activity.iconName] ||
              (typeof activity.icon === "function"
                ? activity.icon
                : Activity);

            return (
              <div
                className="activity-row"
                key={activity.id || `${activity.title}-${index}`}
              >
                <div
                  className={`activity-icon ${activity.type || "green"}`}
                >
                  <Icon size={18} />
                </div>

                <div className="activity-copy">
                  <strong>{activity.title}</strong>
                  <span>{activity.subtitle || activity.description}</span>
                </div>

                <span className="activity-time">{activity.time}</span>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default RecentActivities;