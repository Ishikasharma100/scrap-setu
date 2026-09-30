import { Truck, MapPin, CalendarDays, Clock } from "lucide-react";

const pickups = [
  {
    id: "PICK-201",
    title: "Laptop & Computers",
    collector: "Green Earth Collection",
    location: "Ghaziabad",
    date: "30 Sep 2026",
    time: "10:30 AM",
  },
  {
    id: "PICK-202",
    title: "Mobile Phones",
    collector: "Eco Collectors",
    location: "Noida",
    date: "01 Oct 2026",
    time: "12:00 PM",
  },
];

function UpcomingPickups({ compact = false }) {
  const displayedPickups = compact
    ? pickups.slice(0, 2)
    : pickups;

  return (
    <section className="recycler-panel">
      <div className="recycler-panel-header">
        <div>
          <div className="recycler-panel-title">
            <Truck size={19} />
            <h2>Upcoming Pickups</h2>
          </div>

          <p>Keep track of scheduled collections.</p>
        </div>

        <span className="recycler-count-badge">
          {pickups.length} Scheduled
        </span>
      </div>

      <div className="recycler-pickups-list">
        {displayedPickups.map((pickup) => (
          <article
            className="recycler-pickup-card"
            key={pickup.id}
          >
            <div className="recycler-pickup-date-icon">
              <Truck size={20} />
            </div>

            <div className="recycler-pickup-details">
              <h3>{pickup.title}</h3>

              <p>{pickup.collector}</p>

              <div className="recycler-pickup-meta">
                <span>
                  <MapPin size={14} />
                  {pickup.location}
                </span>

                <span>
                  <CalendarDays size={14} />
                  {pickup.date}
                </span>

                <span>
                  <Clock size={14} />
                  {pickup.time}
                </span>
              </div>

              <small>{pickup.id}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UpcomingPickups;