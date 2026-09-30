import recyclerImage from "./recycler_image.png";
import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Clock3,
  Cuboid,
  Gauge,
  Home,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  PackageCheck,
  Recycle,
  Search,
  Settings,
  Truck,
  UserRound,
  X,
  Activity,
  BarChart3,
  ShieldCheck,
  Smartphone,
  Laptop,
  Cpu,
  CalendarDays,
  ArrowUpRight,
  CheckCircle2,
  Factory,
} from "lucide-react";

import "./RecyclerDashboard.css";

const chartData = [
  { day: "Mon", value: 48 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 59 },
  { day: "Fri", value: 82 },
  { day: "Sat", value: 63 },
  { day: "Sun", value: 71 },
];

const lots = [
  {
    icon: Laptop,
    title: "Laptop & Computers",
    id: "LOT-1024",
    collector: "Green Earth Collection",
    location: "Ghaziabad",
    weight: "85 kg",
    date: "30 Sep 2026",
    status: "Pending",
  },
  {
    icon: Smartphone,
    title: "Mobile Phones",
    id: "LOT-1025",
    collector: "Eco Collectors",
    location: "Noida",
    weight: "32 kg",
    date: "01 Oct 2026",
    status: "Accepted",
  },
  {
    icon: Cpu,
    title: "Electronic Components",
    id: "LOT-1026",
    collector: "City E-Waste Team",
    location: "Delhi",
    weight: "120 kg",
    date: "02 Oct 2026",
    status: "Pending",
  },
];

const pickups = [
  {
    icon: Laptop,
    title: "Laptop & Computers",
    collector: "Green Earth Collection",
    location: "Ghaziabad",
    date: "30 Sep 2026",
    time: "10:30 AM",
  },
  {
    icon: Smartphone,
    title: "Mobile Phones",
    collector: "Eco Collectors",
    location: "Noida",
    date: "01 Oct 2026",
    time: "12:00 PM",
  },
];

const activities = [
  {
    icon: CheckCircle2,
    title: "Lot accepted",
    subtitle: "LOT-1025 · Mobile Phones",
    time: "11:30 AM",
    type: "green",
  },
  {
    icon: PackageCheck,
    title: "New lot received",
    subtitle: "LOT-1026 · Electronic Components",
    time: "10:15 AM",
    type: "blue",
  },
  {
    icon: Truck,
    title: "Pickup scheduled",
    subtitle: "PICK-201 · Ghaziabad",
    time: "Yesterday",
    type: "orange",
  },
  {
    icon: Recycle,
    title: "Recycling completed",
    subtitle: "LOT-1018 · 45 kg processed",
    time: "Yesterday",
    type: "purple",
  },
];

function RecyclerDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [week, setWeek] = useState("This Week");

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Incoming Lots", icon: Cuboid },
    { name: "Upcoming Pickups", icon: Truck },
    { name: "Recent Activities", icon: Activity },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="recycler-app">
      {/* LEFT SIDEBAR */}
      <aside className={`recycler-sidebar ${mobileMenu ? "open" : ""}`}>
        <div className="sidebar-leaves">
          <span className="leaf leaf-1"></span>
          <span className="leaf leaf-2"></span>
          <span className="leaf leaf-3"></span>
          <span className="leaf leaf-4"></span>
          <span className="leaf leaf-5"></span>
          <span className="leaf leaf-6"></span>
          <span className="leaf leaf-7"></span>
          <span className="leaf leaf-8"></span>
        </div>

        <div className="sidebar-top">
          <div className="brand-mark">
            <Recycle size={29} strokeWidth={2.5} />
          </div>

          <div className="brand-copy">
            <h1>SCRAPSETU</h1>
            <span>RECYCLER PORTAL</span>
          </div>

          <button
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeMenu === item.name;

            return (
              <button
                key={item.name}
                className={`sidebar-link ${active ? "active" : ""}`}
                onClick={() => {
                  setActiveMenu(item.name);
                  setMobileMenu(false);
                }}
              >
                <Icon size={20} />
                <span>{item.name}</span>

                {active && <span className="active-dot"></span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-message">
            <div className="message-icon">
              <Leaf size={20} />
            </div>

            <div>
              <strong>Responsible Recycling</strong>
              <p>Manage e-waste responsibly with ScrapSetu.</p>
            </div>
          </div>

          <button className="exit-button">
            <LogOut size={18} />
            <span>Exit Dashboard</span>
            <ChevronRight size={17} />
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="recycler-main">
        {/* TOP BAR */}
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={22} />
          </button>

          <div className="top-search">
            <Search size={18} />
            <input
              placeholder="Search material, collector, lot details..."
              type="text"
            />
          </div>

          <div className="topbar-right">
            <div className="notification-wrapper">
              <button
                className="notification-button"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <Bell size={20} />
                <span className="notification-dot"></span>
              </button>

              {notificationOpen && (
                <div className="notification-panel">
                  <div className="notification-header">
                    <strong>Notifications</strong>
                    <span>3 new</span>
                  </div>

                  <div className="notification-item">
                    <CheckCircle2 size={18} />
                    <div>
                      <strong>Lot accepted</strong>
                      <span>LOT-1025 was accepted</span>
                    </div>
                  </div>

                  <div className="notification-item">
                    <Truck size={18} />
                    <div>
                      <strong>Pickup scheduled</strong>
                      <span>Ghaziabad · 10:30 AM</span>
                    </div>
                  </div>

                  <div className="notification-item">
                    <PackageCheck size={18} />
                    <div>
                      <strong>New lot received</strong>
                      <span>Electronic components</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-divider"></div>

            <div className="profile">
              <div className="profile-avatar">R</div>

              <div className="profile-info">
                <strong>Recycler</strong>
                <span>Recycling Partner</span>
              </div>

              <ChevronDown size={17} />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="dashboard-content">
          {/* HERO */}
          <section className="recycler-hero">
            <img
              src={recyclerImage}
              alt="ScrapSetu recycling facility"
              className="hero-image"
            />

            <div className="hero-overlay"></div>
            <div className="hero-vignette"></div>

            <div className="hero-content">
              <span className="hero-eyebrow">WELCOME BACK,</span>

              <h2>
                Recycler <Leaf className="hero-leaf" size={39} />
              </h2>

              <p>Together for a cleaner planet</p>

              <div className="hero-actions">
                <button>
                  <Recycle size={17} />
                  Recycle
                </button>

                <button>
                  <ShieldCheck size={17} />
                  Verify Lots
                </button>

                <button>
                  <Leaf size={17} />
                  Reduce Waste
                </button>
              </div>
            </div>

            <div className="hero-quote">
              <span>“</span>
              <p>
                Waste is not
                <br />
                the end, it's
                <br />
                <em>a new beginning.</em>
              </p>
              <div className="quote-line"></div>
            </div>

            <div className="hero-bottom-glow"></div>
          </section>

          {/* STATS */}
          <section className="stats-grid">
            <StatCard
              icon={PackageCheck}
              iconClass="green"
              title="Total Incoming Lots"
              value="24"
              change="+12%"
              caption="+2 today"
              bars={[30, 43, 56, 46, 67]}
            />

            <StatCard
              icon={CalendarDays}
              iconClass="purple"
              title="Scheduled Pickups"
              value="16"
              change="+8%"
              caption="+3 this week"
              bars={[35, 50, 43, 60, 73]}
            />

            <StatCard
              icon={Gauge}
              iconClass="orange"
              title="Recycled Material"
              value="1,240 kg"
              change="+15%"
              caption="this month"
              bars={[30, 48, 40, 62, 75]}
            />

            <StatCard
              icon={Clock3}
              iconClass="blue"
              title="Pending Requests"
              value="08"
              change="−5%"
              caption="+1 today"
              bars={[35, 48, 38, 59, 72]}
            />
          </section>

          {/* TWO COLUMN AREA */}
          <section className="dashboard-two-column">
            {/* INCOMING LOTS */}
            <div className="panel incoming-panel">
              <PanelHeader
                icon={Cuboid}
                title="Incoming Lots"
                subtitle="Review e-waste received from collectors."
                badge="3 Lots"
              />

              <div className="lot-list">
                {lots.map((lot) => {
                  const Icon = lot.icon;

                  return (
                    <div className="lot-row" key={lot.id}>
                      <div className="lot-icon">
                        <Icon size={21} />
                      </div>

                      <div className="lot-main">
                        <strong>{lot.title}</strong>

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

                      <div className="lot-status-area">
                        <span
                          className={`status ${
                            lot.status === "Accepted"
                              ? "accepted"
                              : "pending"
                          }`}
                        >
                          {lot.status}
                        </span>

                        <ChevronRight size={18} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PICKUPS */}
            <div className="panel pickup-panel">
              <PanelHeader
                icon={Truck}
                title="Upcoming Pickups"
                subtitle="Scheduled collection activities."
                badge="2 Scheduled"
              />

              <div className="pickup-list">
                {pickups.map((pickup) => {
                  const Icon = pickup.icon;

                  return (
                    <div className="pickup-row" key={pickup.title}>
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

                      <ChevronRight size={17} />
                    </div>
                  );
                })}
              </div>

              <div className="next-collection">
                <div className="next-icon">
                  <Truck size={20} />
                </div>

                <div>
                  <span>NEXT COLLECTION</span>
                  <strong>Today, 10:30 AM</strong>
                  <small>LOT-1024 · Green Earth Collection</small>
                </div>

                <ArrowUpRight size={19} />
                <Recycle className="next-watermark" size={65} />
              </div>
            </div>
          </section>

          {/* ANALYTICS + SIDE METRICS */}
          <section className="analytics-grid">
            <div className="panel analytics-panel">
              <div className="analytics-header">
                <div className="panel-title-wrap">
                  <div className="analytics-icon">
                    <BarChart3 size={21} />
                  </div>

                  <div>
                    <h3>Weekly Recycling Activity</h3>
                    <p>Material processed this week.</p>
                  </div>
                </div>

                <select
                  value={week}
                  onChange={(e) => setWeek(e.target.value)}
                >
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>

              <div className="chart">
                <div className="chart-y-labels">
                  <span>80kg</span>
                  <span>60kg</span>
                  <span>40kg</span>
                  <span>20kg</span>
                  <span>0kg</span>
                </div>

                <div className="chart-area">
                  <div className="chart-grid-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="bars">
                    {chartData.map((item) => (
                      <div className="bar-column" key={item.day}>
                        <div
                          className="bar"
                          style={{ height: `${item.value}%` }}
                        >
                          <span>{item.value}kg</span>
                        </div>

                        <small>{item.day}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="analytics-footer">
                <div>
                  <span>TOTAL PROCESSED</span>
                  <strong>84.5 kg</strong>
                </div>

                <div>
                  <span>COMPLETED LOTS</span>
                  <strong>16</strong>
                </div>

                <div>
                  <span>VS LAST WEEK</span>
                  <strong className="positive">+18%</strong>
                </div>
              </div>
            </div>

            <div className="analytics-side">
              <div className="mini-stat-row">
                <div className="mini-stat green-mini">
                  <div className="mini-icon">
                    <Recycle size={18} />
                  </div>

                  <span>RECYCLING RATE</span>
                  <strong>92%</strong>
                  <small>↑ 6% this month</small>
                </div>

                <div className="mini-stat orange-mini">
                  <div className="mini-icon">
                    <Truck size={18} />
                  </div>

                  <span>ON-TIME PICKUPS</span>
                  <strong>87%</strong>
                  <small>↑ 4% this month</small>
                </div>
              </div>

              <div className="processing-card">
                <div className="processing-top">
                  <div className="processing-icon">
                    <Factory size={19} />
                  </div>

                  <ArrowUpRight size={18} />
                </div>

                <span>PROCESSING CENTER</span>

                <h3>ScrapSetu Recycler Hub</h3>

                <p>3 active processing units · 240 kg capacity</p>

                <Recycle className="processing-watermark" size={95} />
              </div>
            </div>
          </section>

          {/* RECENT ACTIVITIES */}
          <section className="panel activities-panel">
            <PanelHeader
              icon={Activity}
              title="Recent Activities"
              subtitle="Latest updates from your recycling operations."
              badge="View All →"
            />

            <div className="activity-list">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div className="activity-row" key={activity.title}>
                    <div className={`activity-icon ${activity.type}`}>
                      <Icon size={18} />
                    </div>

                    <div className="activity-copy">
                      <strong>{activity.title}</strong>
                      <span>{activity.subtitle}</span>
                    </div>

                    <span className="activity-time">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* BOTTOM IMPACT STRIP */}
          <section className="impact-strip">
            <div className="impact-leaf">
              <Leaf size={28} />
            </div>

            <div>
              <span>SCRAPSETU IMPACT</span>
              <h3>Every recycled device keeps valuable material in circulation.</h3>
            </div>

            <div className="impact-metrics">
              <div>
                <strong>1.24T</strong>
                <span>Material recycled</span>
              </div>

              <div>
                <strong>92%</strong>
                <span>Recycling rate</span>
              </div>

              <div>
                <strong>240kg</strong>
                <span>Daily capacity</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

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

function PanelHeader({ icon: Icon, title, subtitle, badge }) {
  return (
    <div className="panel-header">
      <div className="panel-heading">
        <div className="panel-icon">
          <Icon size={20} />
        </div>

        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      <button className="panel-badge">{badge}</button>
    </div>
  );
}

export default RecyclerDashboard;