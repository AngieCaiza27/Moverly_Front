import {
  HomeIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard", icon: HomeIcon },
    { to: "/orders", label: "Mudanzas", icon: ClipboardDocumentListIcon },
    { to: "/drivers", label: "Conductores", icon: TruckIcon },
    { to: "/users", label: "Usuarios", icon: UserGroupIcon },
    { to: "/settings", label: "Configuración", icon: Cog6ToothIcon },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#FF6B35] text-white flex flex-col justify-between shadow-lg">
      {/* Logo */}
      <div className="p-6">
        <div className="flex flex-col items-center mb-10">
          <img
            src="/images/logo.png"
            alt="Moverly Logo"
            className="w-28 h-28 mb-3 drop-shadow-xl"
          />
          <h2 className="text-xl font-bold text-[#0A2342] text-center">
            Moverly Admin
          </h2>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-3">
          {links.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl text-[15px] font-medium shadow-sm transition-all ${
                  active
                    ? "bg-[#0A2342] text-white shadow-md"
                    : "bg-[#ff814f] text-[#fefefe] hover:bg-[#0A2342] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-[#ff814f]/40 bg-[#ff814f] rounded-t-2xl">
        <button className="flex items-center gap-3 px-5 py-3 rounded-lg w-full font-medium bg-[#1c3555] hover:bg-[#0A2342] text-white transition-all shadow-md">
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
