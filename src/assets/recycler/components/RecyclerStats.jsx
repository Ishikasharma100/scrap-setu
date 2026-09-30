import {
  PackageCheck,
  CalendarDays,
  Gauge,
  Clock3,
} from "lucide-react";

function StatCard({
  icon: Icon,
  iconClass,
  title,
  value,
  change,
  caption,
  bars,
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconClass}`}>
        <Icon size={20} />
      </div>

      <span className="stat-title">{title}</span>

      <strong className="stat-value">{value}</strong>

      <div className="stat-bottom">
        <span className="stat-change">{change}</span>
        <span>{caption}</span>
      </div>

      <div className="mini-bars">
        {bars.map((height, index) => (
          <span
            key={index}
            style={{ height: `${height}%` }}
          ></span>
        ))}
      </div>
    </div>
  );
}

function RecyclerStats({
  totalLots = "24",
  scheduledPickups = "16",
  recycledMaterial = "1,240 kg",
  pendingRequests = "08",
  totalLotsChange = "+12%",
  scheduledChange = "+8%",
  materialChange = "+15%",
  pendingChange = "−5%",
}) {
  return (
    <section className="stats-grid">
      <StatCard
        icon={PackageCheck}
        iconClass="green"
        title="Total Incoming Lots"
        value={totalLots}
        change={totalLotsChange}
        caption="+2 today"
        bars={[30, 43, 56, 46, 67]}
      />

      <StatCard
        icon={CalendarDays}
        iconClass="purple"
        title="Scheduled Pickups"
        value={scheduledPickups}
        change={scheduledChange}
        caption="+3 this week"
        bars={[35, 50, 43, 60, 73]}
      />

      <StatCard
        icon={Gauge}
        iconClass="orange"
        title="Recycled Material"
        value={recycledMaterial}
        change={materialChange}
        caption="this month"
        bars={[30, 48, 40, 62, 75]}
      />

      <StatCard
        icon={Clock3}
        iconClass="blue"
        title="Pending Requests"
        value={pendingRequests}
        change={pendingChange}
        caption="+1 today"
        bars={[35, 48, 38, 59, 72]}
      />
    </section>
  );
}

export default RecyclerStats;
export { StatCard };