import {
  Package,
  Clock,
  CheckCircle2,
  Recycle,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Incoming Lots",
    value: "24",
    note: "Lots received",
    icon: Package,
    color: "blue",
  },
  {
    title: "Pending Requests",
    value: "08",
    note: "Awaiting confirmation",
    icon: Clock,
    color: "orange",
  },
  {
    title: "Completed Pickups",
    value: "16",
    note: "Successfully collected",
    icon: CheckCircle2,
    color: "green",
  },
  {
    title: "Total Recycled Weight",
    value: "1,240 kg",
    note: "Material processed",
    icon: Recycle,
    color: "purple",
  },
];

function RecyclerStats() {
  return (
    <div className="recycler-stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article className="recycler-stat-card" key={stat.title}>
            <div className="recycler-stat-top">
              <div className={`recycler-stat-icon ${stat.color}`}>
                <Icon size={21} />
              </div>

              <ArrowUpRight
                size={17}
                className="recycler-stat-arrow"
              />
            </div>

            <p>{stat.title}</p>

            <h3>{stat.value}</h3>

            <span className="recycler-stat-note">
              {stat.note}
            </span>
          </article>
        );
      })}
    </div>
  );
}

export default RecyclerStats;