import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

export default function NotFound() {

  return (

    <div className="bg-white text-[#171A20] overflow-hidden">

      <Navbar />

      {/* HERO */}

      <section className="relative h-screen overflow-hidden">

        {/* VIDEO */}

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

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/40" />

        {/* CONTENT */}

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

          {/* ERROR */}

          <motion.p

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="uppercase tracking-[8px] text-white text-sm"
          >

            Error 404

          </motion.p>

          {/* TITLE */}

          <motion.h1

            initial={{
              opacity: 0,
              y: 40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="mt-8 text-5xl md:text-7xl font-bold text-white leading-tight max-w-5xl"
          >

            Page Not Found

          </motion.h1>

          {/* DESCRIPTION */}

          <motion.p

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              delay: 0.3,
            }}

            className="mt-8 text-xl text-gray-200 max-w-3xl leading-relaxed"
          >

            The page you are looking for does not exist
            or may have been moved.

          </motion.p>

          {/* BUTTON */}

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
              delay: 0.4,
            }}

          >

            <Link to="/">

              <button className="mt-12 px-10 py-5 rounded-2xl bg-white text-[#171A20] font-bold text-lg hover:scale-105 transition duration-300 shadow-2xl">

                Return Home

              </button>

            </Link>

          </motion.div>

        </div>

      </section>

      {/* INFO SECTION */}

      <section className="bg-[#F5F5F5] py-32 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <motion.p

            initial={{
              opacity: 0,
              y: 20,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            className="uppercase tracking-[6px] text-[#7A7D81] text-sm"
          >

            RB Solar Care

          </motion.p>

          <motion.h2

            initial={{
              opacity: 0,
              y: 30,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            className="mt-6 text-5xl md:text-6xl font-bold leading-tight"
          >

            Clean Energy
            <br />

            Starts Here

          </motion.h2>

          <motion.p

            initial={{
              opacity: 0,
            }}

            whileInView={{
              opacity: 1,
            }}

            transition={{
              delay: 0.2,
            }}

            className="mt-10 text-xl text-[#5C5E62] leading-relaxed max-w-3xl mx-auto"
          >

            Explore our projects, calculator, solar consultation
            and premium renewable energy solutions
            across Uttar Pradesh.

          </motion.p>

        </div>

      </section>

      <Footer />

    </div>
  );
}