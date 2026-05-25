import { useState } from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const currentPath = location.pathname;

  const navLinks = [

    {
      name: "Home",
      path: "/",
    },

    {
      name: "Projects",
      path: "/projects",
    },

    {
      name: "Calculator",
      path: "/calculator",
    },

    {
      name: "Complaints",
      path: "/complaints",
    },

    {
      name: "Contact",
      path: "/contact",
    },
  ];

  return (

    <nav className="fixed top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">

        {/* NAVBAR */}

        <div className="backdrop-blur-2xl bg-black/30 border border-white/10 shadow-2xl rounded-2xl md:rounded-full px-5 md:px-8 py-4 flex items-center justify-between">

          {/* LOGO */}

          <Link to="/">

            <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">

              <span className="text-cyan-400">
                Green
              </span>

              Solar

            </h1>

          </Link>

          {/* DESKTOP MENU */}

          <div className="hidden lg:flex items-center gap-8 text-white font-medium">

            {navLinks.map((link) => (

              currentPath !== link.path && (

                <Link
                  key={link.path}
                  to={link.path}
                  className="hover:text-cyan-400 transition duration-300"
                >

                  {link.name}

                </Link>
              )
            ))}

          </div>

          {/* CTA */}

          {currentPath !== "/contact" && (

            <div className="hidden lg:block">

              <a
                href="https://wa.me/917524853717"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:scale-105 transition duration-300"
              >

                Get Quote

              </a>

            </div>
          )}

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
          >

            {isOpen
              ? <X size={30} />
              : <Menu size={30} />
            }

          </button>

        </div>

        {/* MOBILE MENU */}

        {isOpen && (

          <div className="lg:hidden mt-4 backdrop-blur-2xl bg-black/40 border border-white/10 rounded-3xl p-6 shadow-2xl">

            <div className="flex flex-col gap-6 text-white text-lg font-medium">

              {navLinks.map((link) => (

                currentPath !== link.path && (

                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-cyan-400 transition"
                  >

                    {link.name}

                  </Link>
                )
              ))}

              {/* MOBILE CTA */}

              {currentPath !== "/contact" && (

                <a
                  href="https://wa.me/917524853717"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full text-center px-6 py-4 rounded-2xl bg-cyan-400 text-black font-bold"
                >

                  Get Free Consultation

                </a>
              )}

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}