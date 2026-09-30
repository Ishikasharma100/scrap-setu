import {
  LayoutDashboard,
  Package,
  Truck,
  Activity,
  Settings,
  Recycle,
  X,
} from "lucide-react";

const menuItems = [
  {
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    label: "Incoming Lots",
    icon: Package,
  },
  {
    label: "Upcoming Pickups",
    icon: Truck,
  },
  {
    label: "Recent Activities",
    icon: Activity,
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

function RecyclerSidebar({
  activePage,
  setActivePage,
  sidebarOpen,
  setSidebarOpen,
}) {
  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="recycler-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`recycler-sidebar ${
          sidebarOpen ? "recycler-sidebar-open" : ""
        }`}
      >
        {/* BRAND */}
        <div className="recycler-sidebar-brand">
          <div className="recycler-brand-icon">
            <Recycle size={23} />
          </div>

          <div>
            <h2>
              SCRAP<span>SETU</span>
            </h2>
            <p>RECYCLER PORTAL</p>
          </div>

          <button
            type="button"
            className="recycler-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        {/* WORKSPACE */}
        <div className="recycler-sidebar-label">WORKSPACE</div>

        <nav className="recycler-sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.label;

            return (
              <button
                type="button"
                key={item.label}
                className={`recycler-nav-item ${
                  isActive ? "recycler-nav-active" : ""
                }`}
                onClick={() => handleNavigation(item.label)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="recycler-sidebar-bottom">
          <div className="recycler-sidebar-help">
            <div className="recycler-help-icon">
              <Recycle size={19} />
            </div>

            <strong>Responsible Recycling</strong>

            <p>
              Manage e-waste responsibly with ScrapSetu.
            </p>
          </div>

          <button
            type="button"
            className="recycler-logout-button"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <X size={18} />
            <span>Exit Dashboard</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default RecyclerSidebar;