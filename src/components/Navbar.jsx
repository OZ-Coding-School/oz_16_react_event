import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">
          Local Board
        </Link>

        <nav className="flex gap-3 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-semibold" : "text-gray-600 hover:text-black"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              isActive ? "font-semibold" : "text-gray-600 hover:text-black"
            }
          >
            Create
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
