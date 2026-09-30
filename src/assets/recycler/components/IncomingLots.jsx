import { Package, MapPin, CalendarDays } from "lucide-react";

const lots = [
  {
    id: "LOT-1024",
    material: "Laptop & Computers",
    collector: "Green Earth Collection",
    location: "Ghaziabad, UP",
    weight: "85 kg",
    date: "30 Sep 2026",
    status: "Pending",
  },
  {
    id: "LOT-1025",
    material: "Mobile Phones",
    collector: "Eco Collectors",
    location: "Noida, UP",
    weight: "32 kg",
    date: "01 Oct 2026",
    status: "Accepted",
  },
  {
    id: "LOT-1026",
    material: "Electronic Components",
    collector: "City E-Waste Team",
    location: "Delhi, India",
    weight: "120 kg",
    date: "02 Oct 2026",
    status: "Pending",
  },
];

function IncomingLots({ compact = false }) {
  const displayedLots = compact ? lots.slice(0, 3) : lots;

  return (
    <section className="recycler-panel">
      <div className="recycler-panel-header">
        <div>
          <div className="recycler-panel-title">
            <Package size={19} />
            <h2>Incoming Lots</h2>
          </div>

          <p>Review e-waste lots from collectors.</p>
        </div>

        <span className="recycler-count-badge">
          {lots.length} Lots
        </span>
      </div>

      <div className="recycler-lots-list">
        {displayedLots.map((lot) => (
          <article className="recycler-lot-card" key={lot.id}>
            <div className="recycler-lot-icon">
              <Package size={21} />
            </div>

            <div className="recycler-lot-details">
              <div className="recycler-lot-title-row">
                <h3>{lot.material}</h3>

                <span
                  className={`recycler-status ${
                    lot.status === "Accepted"
                      ? "status-accepted"
                      : "status-pending"
                  }`}
                >
                  {lot.status}
                </span>
              </div>

              <p>{lot.id} · {lot.collector}</p>

              <div className="recycler-lot-meta">
                <span>
                  <MapPin size={14} />
                  {lot.location}
                </span>

                <span>
                  <Package size={14} />
                  {lot.weight}
                </span>

                <span>
                  <CalendarDays size={14} />
                  {lot.date}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default IncomingLots;