import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-gray-900 shadow-lg border-b border-gray-800">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://acdn-us.mitiendanube.com/stores/001/471/169/themes/common/logo-188957454-1609033620-e6e4c01842ce98f7ebdcf8ac98d5896d1609033621.png?0"
              className="h-10"
              alt="Sena Logo"
            />
            <span className="text-2xl font-bold text-white">GamerZone Torneos</span>
          </Link>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col md:flex-row md:space-x-6 font-medium mt-4 md:mt-0 text-sm">
              <li>
                <Link
                  to="/torneo"
                  className="block py-2 px-4 rounded-lg text-white hover:bg-green-600 transition"
                >
                  Torneos
                </Link>
              </li>
              <li>
                <Link
                  to="/videojuegos"
                  className="block py-2 px-4 rounded-lg text-white hover:bg-green-600 transition"
                >
                  Videojuegos
                </Link>
              </li>
              <li>
                <Link
                  to="/Jugadores"
                  className="block py-2 px-4 rounded-lg text-white hover:bg-green-600 transition"
                >
                  Jugadores
                </Link>
              </li>
              <li>
                <Link
                  to="/Equipos"
                  className="block py-2 px-4 rounded-lg text-white hover:bg-green-600 transition"
                >
                  Equipos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="bg-gray-50 min-h-screen p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
