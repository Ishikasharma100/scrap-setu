import {
  Home,
  Cuboid,
  Truck,
  Activity,
  Settings,
  Recycle,
  X,
  Leaf,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home },
  { name: "Incoming Lots", icon: Cuboid },
  { name: "Upcoming Pickups", icon: Truck },
  { name: "Recent Activities", icon: Activity },
  { name: "Settings", icon: Settings },
];

function RecyclerSidebar({
  activeMenu = "Dashboard",
  setActiveMenu,
  mobileMenu = false,
  setMobileMenu,
  onExit,
}) {
  return (
    <>
      {mobileMenu && (
        <div
          className="recycler-sidebar-overlay"
          onClick={() => setMobileMenu(false)}
          aria-hidden="true"
        />
      )}

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
            type="button"
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close sidebar"
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
                type="button"
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

          <button
            type="button"
            className="exit-button"
            onClick={onExit}
            aria-label="Exit Dashboard"
          >
            <LogOut size={18} />
            <span>Exit Dashboard</span>
            <ChevronRight size={17} />
          </button>
        </div>
      </aside>
    </>
  );
}

export default RecyclerSidebar;