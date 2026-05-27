import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import ProjectMap from "../components/ProjectMap";

import LeadForm from "../components/LeadForm";

import Footer from "../components/Footer";

export default function Home() {

  return (

    <div className="bg-white text-[#171A20] overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}

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
            src="https://res.cloudinary.com/dvy9g2nsg/video/upload/v1779661800/solar_e1jw6j.mp4"
            type="video/mp4"
          />

        </video>

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/25" />

        {/* CONTENT */}

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

          <motion.p

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.8,
            }}

            className="uppercase tracking-[8px] text-white text-sm"
          >

            Authorized UPNEDA Vendor

          </motion.p>

          <motion.h1

            initial={{
              opacity: 0,
              y: 80,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 1,
            }}

            className="mt-8 text-5xl md:text-8xl font-bold leading-tight text-white max-w-6xl"
          >

            Install Solar Panels.
            <br />

            Power A Sustainable Future.

          </motion.h1>

          <motion.p

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              delay: 0.4,
            }}

            className="mt-8 text-lg md:text-2xl text-gray-200 max-w-4xl"
          >

            Residential • Commercial • Industrial • Agricultural

          </motion.p>

          {/* BUTTONS */}

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              delay: 0.8,
            }}

            className="flex flex-col md:flex-row gap-4 mt-12"
          >

            <Link to="/contact">

              <button className="px-10 py-4 rounded-full bg-white text-[#171A20] font-semibold hover:bg-gray-200 transition duration-300">

                Get Consultation

              </button>

            </Link>

            <Link to="/projects">

              <button className="px-10 py-4 rounded-full bg-black/40 backdrop-blur-xl text-white border border-white/20 hover:bg-black/60 transition duration-300">

                Explore Projects

              </button>

            </Link>

          </motion.div>

        </div>

      </section>

      {/* INTRO SECTION */}

      <section className="py-32 px-6">

        <div className="max-w-7xl mx-auto">

          <motion.h2

            initial={{
              opacity: 0,
              y: 40,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.8,
            }}

            className="text-5xl md:text-7xl font-bold leading-tight"
          >

            Save On Electricity Bills

          </motion.h2>

          <motion.p

            initial={{
              opacity: 0,
            }}

            whileInView={{
              opacity: 1,
            }}

            transition={{
              delay: 0.3,
            }}

            className="mt-10 text-xl text-[#5C5E62] max-w-5xl leading-relaxed"
          >

            Generate clean energy directly from the sun with RB Solar Care installations.
            Reduce your electricity expenses while increasing long-term energy independence.

          </motion.p>

          {/* TESLA STYLE CARDS */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

            {[
              {
                title: "Generate Energy",

                desc:
                  "Generate your own clean energy whenever the sun is shining.",
              },

              {
                title: "Reduce Bills",

                desc:
                  "Lower electricity costs with efficient solar installations.",
              },

              {
                title: "Government Subsidy",

                desc:
                  "Complete subsidy assistance for residential installations.",
              },

              {
                title: "EMI Available",

                desc:
                  "Flexible financing options for homes and businesses.",
              },
            ].map((item, index) => (

              <motion.div

                key={index}

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: index * 0.1,
                }}

                className="bg-[#F4F4F4] rounded-[30px] p-10 border border-[#E5E5E5] min-h-[320px]"
              >

                <h3 className="text-4xl font-semibold leading-tight">

                  {item.title}

                </h3>

                <p className="mt-10 text-[#5C5E62] text-lg leading-relaxed">

                  {item.desc}

                </p>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* FULL WIDTH IMAGE SECTION */}

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

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

          <motion.h2

            initial={{
              opacity: 0,
              y: 40,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-5xl"
          >

            Designed For Modern
            <br />

            Energy Infrastructure

          </motion.h2>

          <motion.p

            initial={{
              opacity: 0,
            }}

            whileInView={{
              opacity: 1,
            }}

            transition={{
              delay: 0.4,
            }}

            className="mt-10 text-xl text-gray-200 max-w-4xl leading-relaxed"
          >

            From homes to industrial facilities —
            RB Solar Care delivers reliable solar infrastructure across Uttar Pradesh.

          </motion.p>

        </div>

      </section>

      {/* STATS */}

      <section className="py-40 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-3 gap-20 text-center">

            <div>

              <h3 className="text-7xl md:text-8xl font-bold">

                500+

              </h3>

              <p className="mt-6 text-[#5C5E62] text-xl">

                Installations Completed

              </p>

            </div>

            <div>

              <h3 className="text-7xl md:text-8xl font-bold">

                1MW+

              </h3>

              <p className="mt-6 text-[#5C5E62] text-xl">

                Solar Delivered

              </p>

            </div>

            <div>

              <h3 className="text-7xl md:text-8xl font-bold">

                10+

              </h3>

              <p className="mt-6 text-[#5C5E62] text-xl">

                Years Experience

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* MAP SECTION */}

      <section className="px-6 pb-40">

        <div className="max-w-7xl mx-auto">

          <motion.h2

            initial={{
              opacity: 0,
              y: 40,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            className="text-5xl md:text-7xl font-bold leading-tight"
          >

            Real Projects.
            <br />

            Real Locations.

          </motion.h2>

          <p className="mt-10 text-[#5C5E62] text-xl max-w-4xl">

            Explore installations delivered across residential,
            commercial and industrial sectors.

          </p>

          <div className="mt-20 rounded-[40px] overflow-hidden border border-[#E5E5E5]">

            <ProjectMap />

          </div>

        </div>

      </section>

      {/* LEAD FORM */}

      <LeadForm />

      {/* FINAL CTA */}

     {/* FINAL CTA */}

<section className="relative h-screen overflow-hidden">

  {/* BACKGROUND IMAGE */}

  <img
    src="/Solar-Panels-Power-Desktop.avif"
    alt=""
    preload="metadata"
    className="absolute inset-0 w-full h-full object-cover animate-[slowZoom_12s_ease-in-out_infinite]"
  />

  {/* OVERLAY */}

  <div className="absolute inset-0 bg-black/45" />

  {/* CONTENT */}

  <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

    <motion.h2

      initial={{
        opacity: 0,
        y: 40,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.8,
      }}

      className="text-5xl md:text-7xl font-bold leading-tight text-white max-w-5xl"
    >

      Own Your Power

    </motion.h2>

    <motion.p

      initial={{
        opacity: 0,
      }}

      whileInView={{
        opacity: 1,
      }}

      transition={{
        delay: 0.3,
      }}

      className="mt-10 text-xl md:text-2xl text-gray-200 max-w-4xl leading-relaxed"
    >

      From inspection to subsidy processing —
      RB Solar Care handles everything under one roof.

    </motion.p>

    {/* BUTTONS */}

    <motion.div

      initial={{
        opacity: 0,
      }}

      whileInView={{
        opacity: 1,
      }}

      transition={{
        delay: 0.6,
      }}

      className="flex flex-col md:flex-row gap-4 mt-12"
    >

      <Link to="/contact">

        <button className="px-10 py-4 rounded-full bg-white text-[#171A20] font-semibold hover:bg-gray-200 transition duration-300">

          Contact RB Solar Care

        </button>

      </Link>

      <Link to="/projects">

        <button className="px-10 py-4 rounded-full bg-black/40 backdrop-blur-xl text-white border border-white/20 hover:bg-black/60 transition duration-300">

          Explore Projects

        </button>

      </Link>

    </motion.div>

  </div>

</section>

      <Footer />

    </div>
  );
}