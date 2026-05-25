import { motion } from "framer-motion";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import LeadForm from "../components/LeadForm";

import { FaWhatsapp } from "react-icons/fa";

import {

  FaPhoneAlt,

  FaMapMarkerAlt,

} from "react-icons/fa";

export default function Contact() {

  return (

    <div className="bg-white text-[#171A20] overflow-hidden">

      <Navbar />

      {/* HERO */}

      <section className="relative h-[70vh] overflow-hidden">

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

            GreenSolar Consultation

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

            className="mt-8 text-5xl md:text-7xl font-bold text-white leading-tight max-w-5xl"
          >

            Start Your
            <br />

            Solar Journey

          </motion.h1>

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

            className="mt-8 text-xl text-gray-200 max-w-4xl leading-relaxed"
          >

            Get subsidy support, rooftop inspection and complete solar consultation from GreenSolar.

          </motion.p>

        </div>

      </section>

      {/* CONTACT CARDS */}

      <section className="px-6 py-32">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-3 gap-10">

            {/* CALL */}

            <motion.div

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              className="bg-[#F5F5F5] rounded-[30px] p-10 border border-[#E5E5E5]"
            >

              <FaPhoneAlt
                size={36}
                className="text-[#171A20]"
              />

              <h2 className="mt-8 text-3xl font-semibold">

                Call Us

              </h2>

              <div className="mt-8 space-y-4 text-lg text-[#5C5E62]">

                <p>
                  +91 75248 53717
                </p>

                <p>
                  +91 95808 21649
                </p>

                <p>
                  +91 93070 19423
                </p>

              </div>

            </motion.div>

            {/* WHATSAPP */}

            <motion.a

              href="https://wa.me/917524853717"

              target="_blank"

              rel="noopener noreferrer"

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.1,
              }}

              className="bg-[#25D366] text-white rounded-[30px] p-10"
            >

              <FaWhatsapp
                size={42}
              />

              <h2 className="mt-8 text-3xl font-semibold">

                WhatsApp

              </h2>

              <p className="mt-8 text-lg leading-relaxed opacity-90">

                Chat directly with GreenSolar for pricing,
                subsidy support and rooftop consultation.

              </p>

            </motion.a>

            {/* LOCATION */}

            <motion.div

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.2,
              }}

              className="bg-[#F5F5F5] rounded-[30px] p-10 border border-[#E5E5E5]"
            >

              <FaMapMarkerAlt
                size={36}
                className="text-[#171A20]"
              />

              <h2 className="mt-8 text-3xl font-semibold">

                Visit Us

              </h2>

              <p className="mt-8 text-lg text-[#5C5E62] leading-relaxed">

                GreenSolar Headquarters
                <br />

                Kanpur, Uttar Pradesh

              </p>

            </motion.div>

          </div>

        </div>

      </section>

      {/* LEAD FORM */}

      <LeadForm />

      {/* FINAL CTA */}

      {/* FINAL CTA */}

<section className="bg-[#F5F5F5] py-32 px-6 overflow-hidden">

  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

    {/* LEFT */}

    <motion.div

      initial={{
        opacity: 0,
        x: -40,
      }}

      whileInView={{
        opacity: 1,
        x: 0,
      }}

    >

      <p className="uppercase tracking-[6px] text-[#7A7D81] text-sm">

        GreenSolar Energy

      </p>

      <h2 className="mt-6 text-5xl md:text-6xl font-bold leading-tight">

        Clean Energy
        <br />

        Starts Here

      </h2>

      <p className="mt-10 text-xl text-[#5C5E62] leading-relaxed max-w-2xl">

        From consultation to subsidy processing —
        GreenSolar handles everything end-to-end
        with premium solar infrastructure,
        rooftop engineering and long-term support.

      </p>

      <div className="mt-12 flex flex-wrap gap-4">

        <div className="bg-white border border-[#E5E5E5] px-6 py-4 rounded-2xl">

          <p className="text-3xl font-bold">

            25+

          </p>

          <p className="mt-2 text-[#5C5E62]">

            Cities Served

          </p>

        </div>

        <div className="bg-white border border-[#E5E5E5] px-6 py-4 rounded-2xl">

          <p className="text-3xl font-bold">

            500+

          </p>

          <p className="mt-2 text-[#5C5E62]">

            Installations

          </p>

        </div>

        <div className="bg-white border border-[#E5E5E5] px-6 py-4 rounded-2xl">

          <p className="text-3xl font-bold">

            24×7

          </p>

          <p className="mt-2 text-[#5C5E62]">

            Support

          </p>

        </div>

      </div>

    </motion.div>

    {/* RIGHT VIDEO */}

    <motion.div

      initial={{
        opacity: 0,
        x: 40,
      }}

      whileInView={{
        opacity: 1,
        x: 0,
      }}

      className="relative"
    >

      <div className="absolute inset-0 bg-black/10 rounded-[40px]" />

      <video

        autoPlay

        muted

        loop

        playsInline
        preload="metadata"

        className="w-full h-[600px] object-cover rounded-[40px] shadow-2xl"
      >

        <source
          src="https://res.cloudinary.com/dvy9g2nsg/video/upload/v1779661782/clean_solar_energy_rbc9fj.mp4"
          type="video/mp4"
        />

      </video>

    </motion.div>

  </div>

</section>
      <Footer />

    </div>
  );
}