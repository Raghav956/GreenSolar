import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {

  return (

    <div className="bg-white text-[#171A20] overflow-hidden min-h-screen">

      <Navbar />

      <section className="relative min-h-screen overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >

          <source
            src="https://res.cloudinary.com/dvy9g2nsg/video/upload/f_auto,q_auto/v1779662318/solar2_1_x3btyg.mp4"
            type="video/mp4"
          />

        </video>

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6">

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="uppercase tracking-[10px] text-cyan-300 text-sm"
          >

            404

          </motion.p>

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-8 text-5xl md:text-8xl font-bold text-white leading-tight max-w-5xl"
          >

            Page Not Found

          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.25,
            }}
            className="mt-8 text-xl text-gray-200 max-w-3xl leading-relaxed"
          >

            The page you are looking for may have moved, been removed, or never existed.

          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.45,
            }}
            className="flex flex-col md:flex-row gap-4 mt-12"
          >

            <Link to="/">

              <button className="px-10 py-4 rounded-full bg-white text-[#171A20] font-semibold hover:bg-gray-200 transition duration-300">

                Go Home

              </button>

            </Link>

            <Link to="/projects">

              <button className="px-10 py-4 rounded-full bg-black/40 backdrop-blur-xl text-white border border-white/20 hover:bg-black/60 transition duration-300">

                View Projects

              </button>

            </Link>

          </motion.div>

        </div>

      </section>

      <Footer />

    </div>
  );
}
