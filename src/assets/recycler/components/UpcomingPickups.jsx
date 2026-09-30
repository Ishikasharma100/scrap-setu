import { useState } from "react";
import {
  Truck,
  MapPin,
  CalendarDays,
  Clock3,
  ChevronRight,
  ArrowUpRight,
  Recycle,
  CheckCircle2,
  Laptop,
  Smartphone,
  Cpu,
  Package,
} from "lucide-react";

const iconMap = {
  Laptop,
  Smartphone,
  Cpu,
  Package,
};

function UpcomingPickups({
  pickups = [],
  onSelectPickup,
  onCompletePickup,
  searchQuery = "",
  isFullView = false,
  onViewAll,
  nextPickup = null,
}) {
  const [statusFilter, setStatusFilter] = useState("All");

  const query = searchQuery.trim().toLowerCase();

  const filteredPickups = pickups.filter((pickup) => {
    const matchesSearch =
      !query ||
      pickup.title?.toLowerCase().includes(query) ||
      pickup.material?.toLowerCase().includes(query) ||
      pickup.collector?.toLowerCase().includes(query) ||
      pickup.id?.toLowerCase().includes(query) ||
      pickup.location?.toLowerCase().includes(query) ||
      pickup.status?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || pickup.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const displayPickups = isFullView
    ? filteredPickups
    : filteredPickups.slice(0, 2);

  const scheduledCount = pickups.filter(
    (p) => p.status === "Scheduled"
  ).length;

  return (
    <div className="panel pickup-panel">
      <div className="panel-header">
        <div className="panel-heading">
          <div className="panel-icon">
            <Truck size={20} />
          </div>

          <div>
            <h3>Upcoming Pickups</h3>
            <p>Scheduled collection activities.</p>
          </div>
        </div>

        <button
          type="button"
          className="panel-badge"
          onClick={onViewAll}
          style={{ cursor: onViewAll ? "pointer" : "default" }}
        >
          {scheduledCount} Scheduled
        </button>
      </div>

      {isFullView && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "0 18px 12px",
            borderBottom: "1px solid rgba(83, 208, 160, 0.1)",
          }}
        >
          {["All", "Scheduled", "Completed"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid",
                borderColor:
                  statusFilter === status
                    ? "rgba(67, 229, 163, 0.6)"
                    : "rgba(72, 212, 158, 0.15)",
                background:
                  statusFilter === status
                    ? "rgba(20, 113, 80, 0.45)"
                    : "rgba(4, 36, 27, 0.6)",
                color: statusFilter === status ? "#43e5a3" : "#86a89c",
                transition: "all 0.2s ease",
              }}
            >
              {status}
            </button>
          ))}
        </div>
      )}

      <div className="pickup-list">
        {displayPickups.length === 0 ? (
          <div
            style={{
              padding: "30px 16px",
              textAlign: "center",
              color: "#76978c",
              fontSize: "12px",
            }}
          >
            No results found
          </div>
        ) : (
          displayPickups.map((pickup) => {
            const Icon =
              iconMap[pickup.iconName] ||
              (typeof pickup.icon === "function" ? pickup.icon : Truck);

            return (
              <div
                className="pickup-row"
                key={pickup.id}
                onClick={() => onSelectPickup && onSelectPickup(pickup)}
                style={{ cursor: onSelectPickup ? "pointer" : "default" }}
              >
                <div className="pickup-icon">
                  <Icon size={20} />
                </div>

                <div className="pickup-info">
                  <strong>{pickup.title}</strong>
                  <span>{pickup.collector}</span>

                  <div>
                    <span>
                      <MapPin size={11} />
                      {pickup.location}
                    </span>

                    <span>
                      <CalendarDays size={11} />
                      {pickup.date}
                    </span>

                    <span>
                      <Clock3 size={11} />
                      {pickup.time}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {pickup.status === "Scheduled" ? (
                    <button
                      type="button"
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "rgba(20, 113, 80, 0.35)",
                        border: "1px solid rgba(67, 229, 163, 0.4)",
                        color: "#43e5a3",
                        fontSize: "9px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                      onClick={() =>
                        onCompletePickup && onCompletePickup(pickup.id)
                      }
                      title="Mark pickup completed"
                    >
                      <CheckCircle2 size={11} />
                      Complete
                    </button>
                  ) : (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        color: "#43e5a3",
                        padding: "3px 8px",
                        borderRadius: "999px",
                        background: "rgba(17, 151, 95, 0.2)",
                      }}
                    >
                      Completed
                    </span>
                  )}

                  <button
                    type="button"
                    style={{
                      background: "transparent",
                      border: 0,
                      color: "#628b7c",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => onSelectPickup && onSelectPickup(pickup)}
                    aria-label="View pickup details"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div
        className="next-collection"
        onClick={() => {
          if (nextPickup && onSelectPickup) {
            onSelectPickup(nextPickup);
          }
        }}
        style={{ cursor: nextPickup ? "pointer" : "default" }}
      >
        <div className="next-icon">
          <Truck size={20} />
        </div>

        <div>
          <span>NEXT COLLECTION</span>
          <strong>
            {nextPickup
              ? `${nextPickup.date}, ${nextPickup.time}`
              : "All collections completed"}
          </strong>
          <small>
            {nextPickup
              ? `${nextPickup.id || nextPickup.lotId} · ${nextPickup.collector}`
              : "No upcoming pickups scheduled"}
          </small>
        </div>

        <ArrowUpRight size={19} />
        <Recycle className="next-watermark" size={65} />
      </div>
    </div>
  );
}

export default UpcomingPickups;