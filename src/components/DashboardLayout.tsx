import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Outlet, NavLink } from "react-router-dom";
import saktiLogo from "@/assets/sakti-logo.png";

const menuItems = [
  { name: "Dashboard", path: "/", icon: "grid" },
  { name: "Change Management", path: "/change-management", icon: "refresh" },
  { name: "CMDB", path: "/cmdb", icon: "database" },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background w-full">
      {/* Fixed Header - 200px height */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
        style={{ 
          height: "200px", 
          backgroundColor: "#384E66"
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/10 p-3 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={50} />
          </button>
          <img 
            src={saktiLogo} 
            alt="SAKTI Logo" 
            className="h-24 object-contain"
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="text-white hover:bg-white/10 p-3 rounded transition-colors"
            aria-label="Notifications"
            style={{ width: "50px", height: "50px" }}
          >
            <Bell size={50} />
          </button>
          <button 
            className="text-white hover:bg-white/10 p-3 rounded-full transition-colors"
            aria-label="Profile"
            style={{ width: "50px", height: "50px" }}
          >
            <User size={50} />
          </button>
        </div>
      </header>

      {/* Sidebar - positioned below header */}
      <aside
        className={cn(
          "fixed left-0 transition-transform duration-300 ease-in-out z-40",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          top: "200px",
          width: "270px",
          height: "calc(100vh - 200px)",
          backgroundColor: "#384E66",
        }}
      >
        <nav className="py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-6 py-4 text-white transition-all",
                  "hover:bg-[#2F4256]",
                  isActive && "bg-[#2F4256] border-l-4 border-white"
                )
              }
            >
              <span className="text-lg">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-[270px]" : "ml-0"
        )}
        style={{ marginTop: "200px", minHeight: "calc(100vh - 200px)" }}
      >
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
