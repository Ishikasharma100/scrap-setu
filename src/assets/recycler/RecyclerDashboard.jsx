import { useState, useEffect } from "react";
import recyclerImage from "./recycler_image.png";
import {
  Bell,
  ChevronDown,
  Leaf,
  LogOut,
  Menu,
  PackageCheck,
  Recycle,
  Search,
  Truck,
  UserRound,
  X,
  BarChart3,
  ShieldCheck,
  ArrowUpRight,
  CheckCircle2,
  Factory,
  Settings as SettingsIcon,
  Save,
  Cuboid,
  XCircle,
} from "lucide-react";

import "./RecyclerDashboard.css";
import RecyclerSidebar from "./components/RecyclerSidebar.jsx";
import RecyclerStats from "./components/RecyclerStats.jsx";
import IncomingLots from "./components/IncomingLots.jsx";
import UpcomingPickups from "./components/UpcomingPickups.jsx";
import RecentActivities from "./components/RecentActivities.jsx";

const STORAGE_KEYS = {
  LOTS: "scrapsetu_recycler_lots",
  PICKUPS: "scrapsetu_recycler_pickups",
  ACTIVITIES: "scrapsetu_recycler_activities",
  NOTIFICATIONS: "scrapsetu_recycler_notifications",
  SETTINGS: "scrapsetu_recycler_settings",
};

const INITIAL_LOTS = [
  {
    id: "LOT-1024",
    material: "Laptop & Computers",
    category: "Computing & IT",
    collector: "Green Earth Collection",
    location: "Ghaziabad",
    weight: "85 kg",
    date: "30 Sep 2026",
    status: "Pending",
    iconName: "Laptop",
  },
  {
    id: "LOT-1025",
    material: "Mobile Phones",
    category: "Telecommunications",
    collector: "Eco Collectors",
    location: "Noida",
    weight: "32 kg",
    date: "01 Oct 2026",
    status: "Accepted",
    iconName: "Smartphone",
  },
  {
    id: "LOT-1026",
    material: "Electronic Components",
    category: "Circuitry & PCBs",
    collector: "City E-Waste Team",
    location: "Delhi",
    weight: "120 kg",
    date: "02 Oct 2026",
    status: "Pending",
    iconName: "Cpu",
  },
  {
    id: "LOT-1027",
    material: "Printers & Peripherals",
    category: "Office Electronics",
    collector: "Clean NCR Recyclers",
    location: "Gurugram",
    weight: "64 kg",
    date: "03 Oct 2026",
    status: "Pending",
    iconName: "Laptop",
  },
];

const INITIAL_PICKUPS = [
  {
    id: "PICK-201",
    lotId: "LOT-1024",
    title: "Laptop & Computers",
    material: "Laptop & Computers",
    collector: "Green Earth Collection",
    location: "Ghaziabad",
    date: "30 Sep 2026",
    time: "10:30 AM",
    status: "Scheduled",
    iconName: "Laptop",
  },
  {
    id: "PICK-202",
    lotId: "LOT-1025",
    title: "Mobile Phones",
    material: "Mobile Phones",
    collector: "Eco Collectors",
    location: "Noida",
    date: "01 Oct 2026",
    time: "12:00 PM",
    status: "Scheduled",
    iconName: "Smartphone",
  },
  {
    id: "PICK-203",
    lotId: "LOT-1026",
    title: "Electronic Components",
    material: "Electronic Components",
    collector: "City E-Waste Team",
    location: "Delhi",
    date: "02 Oct 2026",
    time: "03:30 PM",
    status: "Scheduled",
    iconName: "Cpu",
  },
];

const INITIAL_ACTIVITIES = [
  {
    id: "ACT-1",
    iconName: "CheckCircle2",
    title: "Lot accepted",
    subtitle: "LOT-1025 · Mobile Phones",
    time: "11:30 AM",
    type: "green",
    timestamp: Date.now() - 3600000,
  },
  {
    id: "ACT-2",
    iconName: "PackageCheck",
    title: "New lot received",
    subtitle: "LOT-1026 · Electronic Components",
    time: "10:15 AM",
    type: "blue",
    timestamp: Date.now() - 7200000,
  },
  {
    id: "ACT-3",
    iconName: "Truck",
    title: "Pickup scheduled",
    subtitle: "PICK-201 · Ghaziabad",
    time: "Yesterday",
    type: "orange",
    timestamp: Date.now() - 86400000,
  },
  {
    id: "ACT-4",
    iconName: "Recycle",
    title: "Recycling completed",
    subtitle: "LOT-1018 · 45 kg processed",
    time: "Yesterday",
    type: "purple",
    timestamp: Date.now() - 100000000,
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "NOTIF-1",
    title: "Lot accepted",
    subtitle: "LOT-1025 was accepted",
    time: "11:30 AM",
    iconName: "CheckCircle2",
    read: false,
  },
  {
    id: "NOTIF-2",
    title: "Pickup scheduled",
    subtitle: "Ghaziabad · 10:30 AM",
    time: "Yesterday",
    iconName: "Truck",
    read: false,
  },
  {
    id: "NOTIF-3",
    title: "New lot received",
    subtitle: "Electronic components",
    time: "Yesterday",
    iconName: "PackageCheck",
    read: false,
  },
];

const INITIAL_SETTINGS = {
  profileName: "Recycler",
  organization: "ScrapSetu Recycler Hub",
  role: "Recycling Partner",
  email: "recycler@scrapsetu.in",
  phone: "+91 98765 43210",
  location: "Ghaziabad & Delhi NCR Hub",
  capacityKg: "240",
  emailNotifications: true,
  pickupAlerts: true,
  lotAlerts: true,
};

const chartDatasets = {
  "This Week": {
    data: [
      { day: "Mon", value: 48 },
      { day: "Tue", value: 65 },
      { day: "Wed", value: 52 },
      { day: "Thu", value: 59 },
      { day: "Fri", value: 82 },
      { day: "Sat", value: 63 },
      { day: "Sun", value: 71 },
    ],
    totalProcessed: "84.5 kg",
    completedLots: "16",
    vsLastPeriod: "+18%",
  },
  "Last Week": {
    data: [
      { day: "Mon", value: 38 },
      { day: "Tue", value: 45 },
      { day: "Wed", value: 60 },
      { day: "Thu", value: 48 },
      { day: "Fri", value: 70 },
      { day: "Sat", value: 55 },
      { day: "Sun", value: 58 },
    ],
    totalProcessed: "71.2 kg",
    completedLots: "14",
    vsLastPeriod: "+12%",
  },
  "This Month": {
    data: [
      { day: "W1", value: 62 },
      { day: "W2", value: 78 },
      { day: "W3", value: 84 },
      { day: "W4", value: 95 },
      { day: "W5", value: 50 },
      { day: "Avg", value: 74 },
      { day: "Max", value: 95 },
    ],
    totalProcessed: "369 kg",
    completedLots: "58",
    vsLastPeriod: "+24%",
  },
};

function getStorageItem(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function RecyclerDashboard({ onLogout, onExit }) {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [week, setWeek] = useState("This Week");
  const [searchQuery, setSearchQuery] = useState("");

  // Centralized State with localStorage persistence
  const [lots, setLots] = useState(() =>
    getStorageItem(STORAGE_KEYS.LOTS, INITIAL_LOTS)
  );
  const [pickups, setPickups] = useState(() =>
    getStorageItem(STORAGE_KEYS.PICKUPS, INITIAL_PICKUPS)
  );
  const [activities, setActivities] = useState(() =>
    getStorageItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES)
  );
  const [notifications, setNotifications] = useState(() =>
    getStorageItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS)
  );
  const [settings, setSettings] = useState(() =>
    getStorageItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // Modals state
  const [selectedLot, setSelectedLot] = useState(null);
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [reduceWasteModalOpen, setReduceWasteModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOTS, JSON.stringify(lots));
  }, [lots]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PICKUPS, JSON.stringify(pickups));
  }, [pickups]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.ACTIVITIES,
      JSON.stringify(activities)
    );
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.NOTIFICATIONS,
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.SETTINGS,
      JSON.stringify(settings)
    );
  }, [settings]);

  // Derived KPI metrics
  const pendingLotsCount = lots.filter(
    (l) => l.status === "Pending"
  ).length;
  const acceptedLotsCount = lots.filter(
    (l) => l.status === "Accepted"
  ).length;
  const scheduledPickups = pickups.filter(
    (p) => p.status === "Scheduled"
  );
  const nextPickup =
    scheduledPickups.length > 0 ? scheduledPickups[0] : null;

  // Unread notifications count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Total stats with dynamic updates
  const totalLotsStat = String(20 + lots.length);
  const scheduledPickupsStat = String(14 + scheduledPickups.length);
  const pendingRequestsStat = String(pendingLotsCount).padStart(2, "0");
  const totalWeightKg = 1240 + acceptedLotsCount * 25;
  const recycledMaterialStat = `${totalWeightKg.toLocaleString()} kg`;

  // Notifications handlers
  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  // Lot Actions
  const handleAcceptLot = (lotId) => {
    const targetLot = lots.find((l) => l.id === lotId);
    if (!targetLot) return;

    setLots((prev) =>
      prev.map((l) =>
        l.id === lotId ? { ...l, status: "Accepted" } : l
      )
    );

    const now = "Just now";

    const newActivity = {
      id: `ACT-${Date.now()}`,
      iconName: "CheckCircle2",
      title: "Lot accepted",
      subtitle: `${targetLot.id} · ${targetLot.material}`,
      time: now,
      type: "green",
      timestamp: Date.now(),
    };
    setActivities((prev) => [newActivity, ...prev]);

    const newNotification = {
      id: `NOTIF-${Date.now()}`,
      title: "Lot accepted",
      subtitle: `${targetLot.id} was accepted`,
      time: now,
      iconName: "CheckCircle2",
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);

    if (selectedLot && selectedLot.id === lotId) {
      setSelectedLot((prev) => ({ ...prev, status: "Accepted" }));
    }
  };

  const handleRejectLot = (lotId) => {
    const targetLot = lots.find((l) => l.id === lotId);
    if (!targetLot) return;

    setLots((prev) =>
      prev.map((l) =>
        l.id === lotId ? { ...l, status: "Rejected" } : l
      )
    );

    const now = "Just now";

    const newActivity = {
      id: `ACT-${Date.now()}`,
      iconName: "XCircle",
      title: "Lot rejected",
      subtitle: `${targetLot.id} · ${targetLot.material}`,
      time: now,
      type: "orange",
      timestamp: Date.now(),
    };
    setActivities((prev) => [newActivity, ...prev]);

    const newNotification = {
      id: `NOTIF-${Date.now()}`,
      title: "Lot rejected",
      subtitle: `${targetLot.id} was rejected`,
      time: now,
      iconName: "XCircle",
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);

    if (selectedLot && selectedLot.id === lotId) {
      setSelectedLot((prev) => ({ ...prev, status: "Rejected" }));
    }
  };

  // Pickup Actions
  const handleCompletePickup = (pickupId) => {
    const targetPickup = pickups.find((p) => p.id === pickupId);
    if (!targetPickup) return;

    setPickups((prev) =>
      prev.map((p) =>
        p.id === pickupId ? { ...p, status: "Completed" } : p
      )
    );

    const now = "Just now";

    const newActivity = {
      id: `ACT-${Date.now()}`,
      iconName: "CheckCircle2",
      title: "Pickup completed",
      subtitle: `${targetPickup.id} · ${targetPickup.location}`,
      time: now,
      type: "green",
      timestamp: Date.now(),
    };
    setActivities((prev) => [newActivity, ...prev]);

    const newNotification = {
      id: `NOTIF-${Date.now()}`,
      title: "Pickup completed",
      subtitle: `${targetPickup.id} collected successfully`,
      time: now,
      iconName: "CheckCircle2",
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);

    if (selectedPickup && selectedPickup.id === pickupId) {
      setSelectedPickup((prev) => ({ ...prev, status: "Completed" }));
    }
  };

  // Hero Actions
  const handleRecycleClick = () => {
    setActiveMenu("Incoming Lots");
  };

  const handleVerifyLotsClick = () => {
    setActiveMenu("Incoming Lots");
  };

  // Save Settings
  const handleSaveSettings = () => {
    setSettings(settingsForm);
    setSettingsSavedMsg(true);

    const newNotification = {
      id: `NOTIF-${Date.now()}`,
      title: "Settings saved",
      subtitle: "Recycler profile and preferences updated",
      time: "Just now",
      iconName: "Settings",
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);

    setTimeout(() => {
      setSettingsSavedMsg(false);
    }, 3000);
  };

  // Active chart dataset
  const activeChart = chartDatasets[week] || chartDatasets["This Week"];

  return (
    <div className="recycler-app">
      {/* SIDEBAR */}
      <RecyclerSidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        onExit={onExit || onLogout}
      />

      {/* MAIN */}
      <main className="recycler-main">
        {/* TOP BAR */}
        <header className="topbar">
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>

          <div className="top-search">
            <Search size={18} />
            <input
              placeholder="Search material, collector, lot details..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  background: "transparent",
                  border: 0,
                  color: "#789c8f",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="topbar-right">
            {/* NOTIFICATIONS */}
            <div className="notification-wrapper">
              <button
                type="button"
                className="notification-button"
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setProfileDropdownOpen(false);
                }}
                aria-label="Toggle notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="notification-dot"></span>
                )}
              </button>

              {notificationOpen && (
                <div className="notification-panel">
                  <div className="notification-header">
                    <strong>Notifications</strong>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{unreadCount} new</span>
                      {unreadCount > 0 && (
                        <button
                          type="button"
                          onClick={handleMarkAllNotificationsRead}
                          style={{
                            background: "transparent",
                            border: 0,
                            color: "#49e8a6",
                            fontSize: "9px",
                            cursor: "pointer",
                            padding: "2px 6px",
                            borderRadius: "4px",
                          }}
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      maxHeight: "280px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "6px",
                    }}
                  >
                    {notifications.length === 0 ? (
                      <div
                        style={{
                          padding: "16px",
                          textAlign: "center",
                          color: "#769a8e",
                          fontSize: "11px",
                        }}
                      >
                        No notifications
                      </div>
                    ) : (
                      notifications.map((item) => {
                        const NotifIcon =
                          item.iconName === "CheckCircle2"
                            ? CheckCircle2
                            : item.iconName === "Truck"
                            ? Truck
                            : item.iconName === "PackageCheck"
                            ? PackageCheck
                            : item.iconName === "XCircle"
                            ? XCircle
                            : item.iconName === "Recycle"
                            ? Recycle
                            : Bell;

                        return (
                          <div
                            className="notification-item"
                            key={item.id}
                            onClick={() =>
                              handleNotificationClick(item.id)
                            }
                            style={{
                              cursor: "pointer",
                              opacity: item.read ? 0.65 : 1,
                              background: item.read
                                ? "transparent"
                                : "rgba(32, 213, 141, 0.06)",
                              borderRadius: "8px",
                              padding: "10px 8px",
                              transition: "background 0.2s ease",
                            }}
                          >
                            <NotifIcon size={18} />
                            <div style={{ flex: 1 }}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <strong>{item.title}</strong>
                                <span
                                  style={{
                                    fontSize: "8px",
                                    color: "#66877b",
                                  }}
                                >
                                  {item.time}
                                </span>
                              </div>
                              <span>
                                {item.subtitle || item.message}
                              </span>
                            </div>
                            {!item.read && (
                              <span
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  background: "#20d58d",
                                  alignSelf: "center",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="profile-divider"></div>

            {/* PROFILE MENU */}
            <div style={{ position: "relative" }}>
              <div
                className="profile"
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationOpen(false);
                }}
              >
                <div className="profile-avatar">
                  {settings.profileName ? settings.profileName[0] : "R"}
                </div>

                <div className="profile-info">
                  <strong>{settings.profileName}</strong>
                  <span>{settings.organization}</span>
                </div>

                <ChevronDown size={17} />
              </div>

              {profileDropdownOpen && (
                <div
                  className="notification-panel"
                  style={{
                    position: "absolute",
                    top: "51px",
                    right: 0,
                    width: "220px",
                    padding: "10px",
                    zIndex: 50,
                  }}
                >
                  <div
                    style={{
                      padding: "8px 12px 12px",
                      borderBottom:
                        "1px solid rgba(81, 211, 160, 0.1)",
                    }}
                  >
                    <strong
                      style={{
                        display: "block",
                        color: "white",
                        fontSize: "13px",
                      }}
                    >
                      {settings.profileName}
                    </strong>
                    <span
                      style={{ color: "#769a8e", fontSize: "10px" }}
                    >
                      {settings.email}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenu("Settings");
                        setProfileDropdownOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "9px 12px",
                        borderRadius: "9px",
                        background: "transparent",
                        color: "#d0e1da",
                        fontSize: "12px",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(32, 213, 141, 0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "transparent")
                      }
                    >
                      <UserRound size={15} color="#59dda7" />
                      <span>Recycler Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenu("Settings");
                        setProfileDropdownOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "9px 12px",
                        borderRadius: "9px",
                        background: "transparent",
                        color: "#d0e1da",
                        fontSize: "12px",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(32, 213, 141, 0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "transparent")
                      }
                    >
                      <SettingsIcon size={15} color="#59dda7" />
                      <span>Account Settings</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (onLogout) onLogout();
                        else if (onExit) onExit();
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "9px 12px",
                        borderRadius: "9px",
                        background: "transparent",
                        color: "#ff8282",
                        fontSize: "12px",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        marginTop: "4px",
                        borderTop:
                          "1px solid rgba(81, 211, 160, 0.1)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255, 80, 80, 0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          "transparent")
                      }
                    >
                      <LogOut size={15} color="#ff8282" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="dashboard-content">
          {/* TAB: DASHBOARD */}
          {activeMenu === "Dashboard" && (
            <>
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
                    {settings.profileName}{" "}
                    <Leaf className="hero-leaf" size={39} />
                  </h2>

                  <p>Together for a cleaner planet</p>

                  <div className="hero-actions">
                    <button
                      type="button"
                      onClick={handleRecycleClick}
                    >
                      <Recycle size={17} />
                      Recycle
                    </button>

                    <button
                      type="button"
                      onClick={handleVerifyLotsClick}
                    >
                      <ShieldCheck size={17} />
                      Verify Lots
                    </button>

                    <button
                      type="button"
                      onClick={() => setReduceWasteModalOpen(true)}
                    >
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
              <RecyclerStats
                totalLots={totalLotsStat}
                scheduledPickups={scheduledPickupsStat}
                recycledMaterial={recycledMaterialStat}
                pendingRequests={pendingRequestsStat}
              />

              {/* TWO COLUMN AREA */}
              <section className="dashboard-two-column">
                <IncomingLots
                  lots={lots}
                  onAcceptLot={handleAcceptLot}
                  onRejectLot={handleRejectLot}
                  onSelectLot={setSelectedLot}
                  searchQuery={searchQuery}
                  onViewAll={() => setActiveMenu("Incoming Lots")}
                />

                <UpcomingPickups
                  pickups={pickups}
                  onSelectPickup={setSelectedPickup}
                  onCompletePickup={handleCompletePickup}
                  searchQuery={searchQuery}
                  onViewAll={() => setActiveMenu("Upcoming Pickups")}
                  nextPickup={nextPickup}
                />
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
                        {activeChart.data.map((item) => (
                          <div
                            className="bar-column"
                            key={item.day}
                          >
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
                      <strong>{activeChart.totalProcessed}</strong>
                    </div>

                    <div>
                      <span>COMPLETED LOTS</span>
                      <strong>{activeChart.completedLots}</strong>
                    </div>

                    <div>
                      <span>VS LAST PERIOD</span>
                      <strong className="positive">
                        {activeChart.vsLastPeriod}
                      </strong>
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

                    <h3>{settings.organization}</h3>

                    <p>
                      3 active processing units ·{" "}
                      {settings.capacityKg} kg capacity
                    </p>

                    <Recycle
                      className="processing-watermark"
                      size={95}
                    />
                  </div>
                </div>
              </section>

              {/* RECENT ACTIVITIES */}
              <RecentActivities
                activities={activities}
                onViewAll={() => setActiveMenu("Recent Activities")}
              />

              {/* BOTTOM IMPACT STRIP */}
              <section className="impact-strip">
                <div className="impact-leaf">
                  <Leaf size={28} />
                </div>

                <div>
                  <span>SCRAPSETU IMPACT</span>
                  <h3>
                    Every recycled device keeps valuable material in
                    circulation.
                  </h3>
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
                    <strong>{settings.capacityKg}kg</strong>
                    <span>Daily capacity</span>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* TAB: INCOMING LOTS (FULL VIEW) */}
          {activeMenu === "Incoming Lots" && (
            <div style={{ marginTop: "8px" }}>
              <IncomingLots
                lots={lots}
                onAcceptLot={handleAcceptLot}
                onRejectLot={handleRejectLot}
                onSelectLot={setSelectedLot}
                searchQuery={searchQuery}
                isFullView={true}
              />
            </div>
          )}

          {/* TAB: UPCOMING PICKUPS (FULL VIEW) */}
          {activeMenu === "Upcoming Pickups" && (
            <div style={{ marginTop: "8px" }}>
              <UpcomingPickups
                pickups={pickups}
                onSelectPickup={setSelectedPickup}
                onCompletePickup={handleCompletePickup}
                searchQuery={searchQuery}
                isFullView={true}
                nextPickup={nextPickup}
              />
            </div>
          )}

          {/* TAB: RECENT ACTIVITIES (FULL VIEW) */}
          {activeMenu === "Recent Activities" && (
            <div style={{ marginTop: "8px" }}>
              <RecentActivities
                activities={activities}
                isFullView={true}
              />
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeMenu === "Settings" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginTop: "8px",
              }}
            >
              <div className="panel" style={{ padding: "24px" }}>
                <div
                  className="panel-header"
                  style={{ padding: 0, marginBottom: "20px" }}
                >
                  <div className="panel-heading">
                    <div className="panel-icon">
                      <UserRound size={20} />
                    </div>
                    <div>
                      <h3>Recycler Profile</h3>
                      <p>
                        Manage your facility details and public credentials.
                      </p>
                    </div>
                  </div>
                  <span className="status accepted">
                    Verified Facility
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#86a89c",
                        marginBottom: "6px",
                      }}
                    >
                      Facility / Enterprise Name
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(7, 46, 34, 0.62)",
                        border: "1px solid rgba(73, 213, 161, 0.2)",
                        color: "white",
                        outline: 0,
                      }}
                      value={settingsForm.organization}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          organization: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#86a89c",
                        marginBottom: "6px",
                      }}
                    >
                      Contact Person
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(7, 46, 34, 0.62)",
                        border: "1px solid rgba(73, 213, 161, 0.2)",
                        color: "white",
                        outline: 0,
                      }}
                      value={settingsForm.profileName}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          profileName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#86a89c",
                        marginBottom: "6px",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(7, 46, 34, 0.62)",
                        border: "1px solid rgba(73, 213, 161, 0.2)",
                        color: "white",
                        outline: 0,
                      }}
                      value={settingsForm.email}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#86a89c",
                        marginBottom: "6px",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(7, 46, 34, 0.62)",
                        border: "1px solid rgba(73, 213, 161, 0.2)",
                        color: "white",
                        outline: 0,
                      }}
                      value={settingsForm.phone}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#86a89c",
                        marginBottom: "6px",
                      }}
                    >
                      Processing Hub Address
                    </label>
                    <input
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(7, 46, 34, 0.62)",
                        border: "1px solid rgba(73, 213, 161, 0.2)",
                        color: "white",
                        outline: 0,
                      }}
                      value={settingsForm.location}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="panel" style={{ padding: "24px" }}>
                <div
                  className="panel-header"
                  style={{ padding: 0, marginBottom: "20px" }}
                >
                  <div className="panel-heading">
                    <div className="panel-icon">
                      <SettingsIcon size={20} />
                    </div>
                    <div>
                      <h3>Account & Notification Preferences</h3>
                      <p>
                        Configure processing capacity and automated alerts.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        color: "#86a89c",
                        marginBottom: "6px",
                      }}
                    >
                      Daily Processing Capacity (kg)
                    </label>
                    <input
                      type="number"
                      style={{
                        maxWidth: "240px",
                        padding: "10px 14px",
                        borderRadius: "10px",
                        background: "rgba(7, 46, 34, 0.62)",
                        border: "1px solid rgba(73, 213, 161, 0.2)",
                        color: "white",
                        outline: 0,
                      }}
                      value={settingsForm.capacityKg}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          capacityKg: e.target.value,
                        })
                      }
                    />
                  </div>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      color: "#d0e1da",
                      fontSize: "13px",
                      marginTop: "8px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={settingsForm.emailNotifications}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          emailNotifications: e.target.checked,
                        })
                      }
                      style={{
                        width: "17px",
                        height: "17px",
                        accentColor: "#20d58d",
                        cursor: "pointer",
                      }}
                    />
                    <span>
                      Receive notifications when new incoming lots are
                      assigned
                    </span>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      color: "#d0e1da",
                      fontSize: "13px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={settingsForm.pickupAlerts}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          pickupAlerts: e.target.checked,
                        })
                      }
                      style={{
                        width: "17px",
                        height: "17px",
                        accentColor: "#20d58d",
                        cursor: "pointer",
                      }}
                    />
                    <span>
                      Scheduled pickup reminders (1 hour prior to
                      collection)
                    </span>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      color: "#d0e1da",
                      fontSize: "13px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={settingsForm.lotAlerts}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          lotAlerts: e.target.checked,
                        })
                      }
                      style={{
                        width: "17px",
                        height: "17px",
                        accentColor: "#20d58d",
                        cursor: "pointer",
                      }}
                    />
                    <span>
                      Enable smart lot matching with nearby certified
                      collectors
                    </span>
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "14px",
                    marginTop: "24px",
                  }}
                >
                  {settingsSavedMsg && (
                    <span
                      style={{
                        color: "#49e8a6",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      ✓ Settings saved successfully
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 22px",
                      borderRadius: "12px",
                      background:
                        "linear-gradient(100deg, rgba(18, 202, 132, 0.95), rgba(6, 135, 89, 0.85))",
                      color: "white",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: 0,
                      boxShadow: "0 10px 25px rgba(0, 193, 123, 0.2)",
                    }}
                  >
                    <Save size={16} />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* LOT DETAILS MODAL */}
      {selectedLot && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "rgba(0, 11, 8, 0.82)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setSelectedLot(null)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              padding: "26px",
              borderRadius: "20px",
              background:
                "linear-gradient(145deg, rgba(3, 38, 28, 0.98), rgba(1, 20, 15, 0.98))",
              border: "1px solid rgba(71, 211, 158, 0.3)",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
              color: "#f1fff9",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedLot(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "rgba(255, 255, 255, 0.06)",
                border: 0,
                color: "#9ab8ad",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(20, 174, 114, 0.2)",
                  color: "#45e7a5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Cuboid size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px" }}>
                  {selectedLot.material}
                </h3>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#50dfaa",
                    fontWeight: 600,
                  }}
                >
                  {selectedLot.id}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                background: "rgba(0, 24, 18, 0.5)",
                padding: "16px",
                borderRadius: "14px",
                border: "1px solid rgba(71, 211, 158, 0.12)",
                marginBottom: "20px",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  CATEGORY
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedLot.category || "Electronic Waste"}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  WEIGHT
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedLot.weight}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  COLLECTOR
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedLot.collector}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  LOCATION
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedLot.location}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  SUBMISSION DATE
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedLot.date}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  STATUS
                </span>
                <span
                  className={`status ${
                    selectedLot.status === "Accepted"
                      ? "accepted"
                      : selectedLot.status === "Rejected"
                      ? "rejected"
                      : "pending"
                  }`}
                  style={
                    selectedLot.status === "Rejected"
                      ? {
                          color: "#ff8282",
                          background: "rgba(255, 80, 80, 0.18)",
                        }
                      : {}
                  }
                >
                  {selectedLot.status}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              {selectedLot.status === "Pending" && (
                <>
                  <button
                    type="button"
                    onClick={() => handleRejectLot(selectedLot.id)}
                    style={{
                      padding: "9px 18px",
                      borderRadius: "10px",
                      background: "rgba(255, 80, 80, 0.18)",
                      border: "1px solid rgba(255, 90, 90, 0.4)",
                      color: "#ff8282",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Reject Lot
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAcceptLot(selectedLot.id)}
                    style={{
                      padding: "9px 18px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(100deg, rgba(18, 202, 132, 0.95), rgba(6, 135, 89, 0.85))",
                      border: 0,
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Accept Lot
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setSelectedLot(null)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#d0e1da",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PICKUP DETAILS MODAL */}
      {selectedPickup && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "rgba(0, 11, 8, 0.82)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setSelectedPickup(null)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "520px",
              padding: "26px",
              borderRadius: "20px",
              background:
                "linear-gradient(145deg, rgba(3, 38, 28, 0.98), rgba(1, 20, 15, 0.98))",
              border: "1px solid rgba(71, 211, 158, 0.3)",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
              color: "#f1fff9",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPickup(null)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "rgba(255, 255, 255, 0.06)",
                border: 0,
                color: "#9ab8ad",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255, 165, 67, 0.18)",
                  color: "#ffbd68",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Truck size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px" }}>
                  {selectedPickup.title}
                </h3>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#50dfaa",
                    fontWeight: 600,
                  }}
                >
                  {selectedPickup.id}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
                background: "rgba(0, 24, 18, 0.5)",
                padding: "16px",
                borderRadius: "14px",
                border: "1px solid rgba(71, 211, 158, 0.12)",
                marginBottom: "20px",
              }}
            >
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  COLLECTOR
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedPickup.collector}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  HANDOVER LOCATION
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedPickup.location}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  SCHEDULED DATE
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedPickup.date}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  SCHEDULED TIME
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedPickup.time}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  LINKED LOT
                </span>
                <strong style={{ fontSize: "13px" }}>
                  {selectedPickup.lotId || "LOT-1024"}
                </strong>
              </div>

              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "10px",
                    color: "#76978c",
                  }}
                >
                  STATUS
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color:
                      selectedPickup.status === "Completed"
                        ? "#43e5a3"
                        : "#ffbd68",
                  }}
                >
                  {selectedPickup.status}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              {selectedPickup.status === "Scheduled" && (
                <button
                  type="button"
                  onClick={() =>
                    handleCompletePickup(selectedPickup.id)
                  }
                  style={{
                    padding: "9px 18px",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(100deg, rgba(18, 202, 132, 0.95), rgba(6, 135, 89, 0.85))",
                    border: 0,
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <CheckCircle2 size={14} />
                  Mark Completed
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedPickup(null)}
                style={{
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#d0e1da",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REDUCE WASTE INFO MODAL */}
      {reduceWasteModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            background: "rgba(0, 11, 8, 0.82)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setReduceWasteModalOpen(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "540px",
              padding: "28px",
              borderRadius: "20px",
              background:
                "linear-gradient(145deg, rgba(3, 38, 28, 0.98), rgba(1, 20, 15, 0.98))",
              border: "1px solid rgba(71, 211, 158, 0.3)",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.6)",
              color: "#f1fff9",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setReduceWasteModalOpen(false)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                background: "rgba(255, 255, 255, 0.06)",
                border: 0,
                color: "#9ab8ad",
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(42, 218, 146, 0.15)",
                  color: "#4ce6a5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Leaf size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px" }}>
                  Responsible E-Waste Protocol
                </h3>
                <span style={{ fontSize: "12px", color: "#50dfaa" }}>
                  ScrapSetu Circular Standards
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                color: "#c8ded7",
                fontSize: "13px",
                lineHeight: "1.6",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  padding: "12px",
                  background: "rgba(0, 24, 18, 0.5)",
                  borderRadius: "10px",
                  border: "1px solid rgba(71, 211, 158, 0.12)",
                }}
              >
                <strong
                  style={{
                    color: "#43e5a3",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  1. High Precious Metal Recovery
                </strong>
                Achieving 98.4% recovery efficiency for copper, gold, and
                rare-earth elements through hydrometallurgical refining.
              </div>

              <div
                style={{
                  padding: "12px",
                  background: "rgba(0, 24, 18, 0.5)",
                  borderRadius: "10px",
                  border: "1px solid rgba(71, 211, 158, 0.12)",
                }}
              >
                <strong
                  style={{
                    color: "#43e5a3",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  2. Non-Hazardous Decomposition
                </strong>
                Strict neutralisation and containment of battery
                electrolytes, lead glass, and brominated flame retardants
                under CPCB guidelines.
              </div>

              <div
                style={{
                  padding: "12px",
                  background: "rgba(0, 24, 18, 0.5)",
                  borderRadius: "10px",
                  border: "1px solid rgba(71, 211, 158, 0.12)",
                }}
              >
                <strong
                  style={{
                    color: "#43e5a3",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  3. Zero Landfill Mandate
                </strong>
                Every verified lot processed through ScrapSetu carries a
                tamper-proof digital certificate guaranteeing 100%
                material diversion from landfills.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={() => setReduceWasteModalOpen(false)}
                style={{
                  padding: "9px 20px",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(100deg, rgba(18, 202, 132, 0.95), rgba(6, 135, 89, 0.85))",
                  border: 0,
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecyclerDashboard;