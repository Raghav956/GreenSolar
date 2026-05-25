import { Link } from "react-router-dom";

export default function Footer() {

  return (

    <footer className="bg-[#111111] text-white px-6 py-18">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}

        <div className="grid md:grid-cols-3 gap-20">

          {/* BRAND */}

          <div>

            <h2 className="text-5xl font-bold">

              GreenSolar

            </h2>

            <p className="mt-8 text-gray-400 text-lg leading-relaxed max-w-md">

              Authorized UPNEDA vendor delivering
              premium residential, commercial and industrial solar infrastructure across Uttar Pradesh.

            </p>

            {/* BUTTON */}

            <Link to="/contact">

              <button className="mt-10 px-8 py-4 rounded-full bg-white text-[#171A20] font-semibold hover:bg-gray-200 transition duration-300">

                Contact GreenSolar

              </button>

            </Link>

          </div>

          {/* LINKS */}

          <div>

            <h3 className="text-2xl font-semibold">

              Navigation

            </h3>

            <div className="flex flex-col gap-5 mt-10 text-gray-400 text-lg">

              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/projects"
                className="hover:text-white transition"
              >
                Projects
              </Link>

              <Link
                to="/calculator"
                className="hover:text-white transition"
              >
                Calculator
              </Link>

              <Link
                to="/complaints"
                className="hover:text-white transition"
              >
                Complaints
              </Link>

              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* CONTACT */}

          {/* CONTACT */}

<div>

  <h3 className="text-2xl font-semibold">

    Contact

  </h3>

  <div className="mt-10 space-y-6 text-gray-400 text-lg">

    <div>

      <p className="text-white font-medium">

        Rohit Kalsi

      </p>

      <p>
        +91 75248 53717
      </p>

    </div>

    <div>

      <p className="text-white font-medium">

        Rohit Kalsi

      </p>

      <p>
        +91 95808 21649
      </p>

    </div>

    <div>

      <p className="text-white font-medium">

        Ravi Kalsi

      </p>

      <p>
        +91 93070 19423
      </p>

    </div>

    <div>

      <p>
        Kanpur, Uttar Pradesh
      </p>

      <p>
        support@greensolar.in
      </p>

    </div>

  </div>

</div>

        </div>

        {/* DIVIDER */}

        <div className="h-px bg-white/10 mt-16 mb-1" /> 

        {/* BOTTOM */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-500 text-sm">

            © 2026 GreenSolar. All rights reserved.

          </p>

          <div className="flex gap-8 text-sm text-gray-500">

            <p className="hover:text-white transition cursor-pointer">

              Privacy Policy

            </p>

            <p className="hover:text-white transition cursor-pointer">

              Terms of Service

            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}