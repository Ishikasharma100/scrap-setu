import { useState } from "react";
import {
  Cuboid,
  MapPin,
  CalendarDays,
  Gauge,
  ChevronRight,
  CheckCircle2,
  X,
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

function IncomingLots({
  lots = [],
  onAcceptLot,
  onRejectLot,
  onSelectLot,
  searchQuery = "",
  isFullView = false,
  onViewAll,
}) {
  const [statusFilter, setStatusFilter] = useState("All");

  const query = searchQuery.trim().toLowerCase();

  const filteredLots = lots.filter((lot) => {
    const matchesSearch =
      !query ||
      lot.material?.toLowerCase().includes(query) ||
      lot.collector?.toLowerCase().includes(query) ||
      lot.id?.toLowerCase().includes(query) ||
      lot.location?.toLowerCase().includes(query) ||
      lot.category?.toLowerCase().includes(query) ||
      lot.status?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || lot.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const displayLots = isFullView ? filteredLots : filteredLots.slice(0, 3);

  return (
    <div className="panel incoming-panel">
      <div className="panel-header">
        <div className="panel-heading">
          <div className="panel-icon">
            <Cuboid size={20} />
          </div>

          <div>
            <h3>Incoming Lots</h3>
            <p>Review e-waste received from collectors.</p>
          </div>
        </div>

        <button
          type="button"
          className="panel-badge"
          onClick={onViewAll}
          style={{ cursor: onViewAll ? "pointer" : "default" }}
        >
          {lots.length} Lots
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
          {["All", "Pending", "Accepted", "Rejected"].map((status) => (
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

      <div className="lot-list">
        {displayLots.length === 0 ? (
          <div
            style={{
              padding: "36px 16px",
              textAlign: "center",
              color: "#76978c",
              fontSize: "12px",
            }}
          >
            No results found
          </div>
        ) : (
          displayLots.map((lot) => {
            const Icon =
              iconMap[lot.iconName] ||
              (typeof lot.icon === "function" ? lot.icon : Package);

            return (
              <div
                className="lot-row"
                key={lot.id}
                onClick={() => onSelectLot && onSelectLot(lot)}
                style={{ cursor: onSelectLot ? "pointer" : "default" }}
              >
                <div className="lot-icon">
                  <Icon size={21} />
                </div>

                <div className="lot-main">
                  <strong>{lot.material}</strong>

                  <div className="lot-sub">
                    <span>{lot.id}</span>
                    <span className="separator">•</span>
                    <span>{lot.collector}</span>
                  </div>

                  <div className="lot-meta">
                    <span>
                      <MapPin size={12} />
                      {lot.location}
                    </span>

                    <span>
                      <Gauge size={12} />
                      {lot.weight}
                    </span>

                    <span>
                      <CalendarDays size={12} />
                      {lot.date}
                    </span>
                  </div>
                </div>

                <div
                  className="lot-status-area"
                  onClick={(e) => e.stopPropagation()}
                >
                  {lot.status === "Pending" ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                      }}
                    >
                      <button
                        type="button"
                        style={{
                          padding: "5px 11px",
                          borderRadius: "999px",
                          background: "rgba(17, 151, 95, 0.3)",
                          border: "1px solid rgba(67, 229, 163, 0.45)",
                          color: "#43e5a3",
                          fontSize: "10px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => onAcceptLot && onAcceptLot(lot.id)}
                        title="Accept Lot"
                      >
                        <CheckCircle2 size={12} />
                        Accept
                      </button>
                      <button
                        type="button"
                        style={{
                          padding: "5px 11px",
                          borderRadius: "999px",
                          background: "rgba(255, 80, 80, 0.16)",
                          border: "1px solid rgba(255, 90, 90, 0.38)",
                          color: "#ff8282",
                          fontSize: "10px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => onRejectLot && onRejectLot(lot.id)}
                        title="Reject Lot"
                      >
                        <X size={12} />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`status ${
                        lot.status === "Accepted"
                          ? "accepted"
                          : lot.status === "Rejected"
                          ? "rejected"
                          : "pending"
                      }`}
                      style={
                        lot.status === "Rejected"
                          ? {
                              color: "#ff8282",
                              background: "rgba(255, 80, 80, 0.18)",
                            }
                          : {}
                      }
                    >
                      {lot.status}
                    </span>
                  )}

                  <button
                    type="button"
                    style={{
                      background: "transparent",
                      border: 0,
                      color: "#64897c",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => onSelectLot && onSelectLot(lot)}
                    aria-label="View lot details"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default IncomingLots;