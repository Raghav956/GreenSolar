import {

  useEffect,

  useState,

} from "react";

import {

  useParams,

  Link,

} from "react-router-dom";

import {

  motion,

} from "framer-motion";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import client from "../api/client";

import {

  GoogleMap,

  Marker,

  useJsApiLoader,

} from "@react-google-maps/api";

export default function ProjectDetail() {

  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  const { isLoaded } =
    useJsApiLoader({

      googleMapsApiKey:
        import.meta.env
          .VITE_GOOGLE_MAPS_API_KEY,
    });

  useEffect(() => {

    fetchProject();

  }, []);

  async function fetchProject() {

    try {

      const response =
        await client.get(
          `/projects/${id}`
        );

      setProject(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  if (!project) {

    return (

      <div className="min-h-screen bg-white flex items-center justify-center text-3xl font-semibold">

        Loading...

      </div>
    );
  }

  return (

    <div className="bg-white text-[#171A20] overflow-hidden">

      <Navbar />

      {/* HERO */}

      <section className="relative h-[75vh] overflow-hidden">

        {/* MEDIA */}

        {project.media.length > 0 && (

          project.media[0].media_type ===
          "image" ? (

            <img
              src={
                project.media[0]
                  .media_url
              }
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

          ) : (

            <video
              src={
                project.media[0]
                  .media_url
              }
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        )}

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/35" />

        {/* CONTENT */}

        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-20 pb-20">

          <motion.p

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="uppercase tracking-[6px] text-white text-sm"
          >

            {project.project_type}

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

            className="mt-6 text-5xl md:text-7xl font-bold text-white max-w-5xl leading-tight"
          >

            {project.title}

          </motion.h1>

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            transition={{
              delay: 0.3,
            }}

            className="flex gap-8 mt-8 text-lg text-gray-200"
          >

            <span>
              {project.capacity}
            </span>

            <span>
              {project.location}
            </span>

          </motion.div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="px-6 py-32">

        <div className="max-w-7xl mx-auto">

          {/* OVERVIEW */}

          <div className="grid lg:grid-cols-2 gap-20 items-start">

            {/* TEXT */}

            <div>

              <motion.h2

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                className="text-5xl font-bold leading-tight"
              >

                Project Overview

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

                className="mt-10 text-[#5C5E62] text-xl leading-relaxed"
              >

                {project.description}

              </motion.p>

            </div>

            {/* DETAILS CARD */}

            <motion.div

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              className="bg-[#F5F5F5] border border-[#E5E5E5] rounded-[30px] p-10"
            >

              <h3 className="text-3xl font-semibold">

                Installation Details

              </h3>

              <div className="mt-12 space-y-10">

                <div>

                  <p className="text-sm text-[#7A7D81]">

                    Project Type

                  </p>

                  <p className="mt-3 text-2xl font-semibold">

                    {project.project_type}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-[#7A7D81]">

                    Capacity

                  </p>

                  <p className="mt-3 text-2xl font-semibold">

                    {project.capacity}

                  </p>

                </div>

                <div>

                  <p className="text-sm text-[#7A7D81]">

                    Location

                  </p>

                  <p className="mt-3 text-2xl font-semibold">

                    {project.location}

                  </p>

                </div>

              </div>

            </motion.div>

          </div>

          {/* MAP */}

          <div className="mt-32">

            <h2 className="text-5xl font-bold">

              Project Location

            </h2>

            <div className="mt-12 rounded-[30px] overflow-hidden border border-[#E5E5E5] shadow-[0_20px_80px_rgba(0,0,0,0.06)]">

              {isLoaded && (

                <GoogleMap

                  mapContainerStyle={{
                    width: "100%",
                    height: "550px",
                  }}
                  
                  center={{
                    lat: Number(
                      project.latitude
                    ),

                    lng: Number(
                      project.longitude
                    ),
                  }}

                  zoom={14}

                  options={{

                    disableDefaultUI: true,

                    zoomControl: true,

                    mapTypeControl: false,

                    streetViewControl: false,

                    fullscreenControl: false,

                    colorScheme: "LIGHT",
                  }}
                >

                  <Marker

                    position={{

                      lat: Number(
                        project.latitude
                      ),

                      lng: Number(
                        project.longitude
                      ),
                    }}
                  />

                </GoogleMap>
              )}

            </div>

          </div>

          {/* GALLERY */}

          {project.media.length > 1 && (

            <div className="mt-32">

              <h2 className="text-5xl font-bold">

                Project Gallery

              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

                {project.media.map((media) => (

                  media.media_type ===
                  "image" ? (

                    <img
                      key={media.id}
                      src={media.media_url}
                      alt=""
                      className="w-full h-[320px] object-cover rounded-[30px]"
                    />

                  ) : (

                    <video
                      key={media.id}
                      src={media.media_url}
                      controls
                      className="w-full h-[320px] object-cover rounded-[30px]"
                    />
                  )
                ))}

              </div>

            </div>
          )}

          {/* CTA */}

          <div className="mt-32 text-center">

            <h2 className="text-5xl md:text-6xl font-bold leading-tight">

              Interested In Solar?

            </h2>

            <p className="mt-8 text-xl text-[#5C5E62] max-w-3xl mx-auto">

              Get subsidy assistance, installation support and a complete solar consultation from GreenSolar.

            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-12">

              <Link to="/contact">

                <button className="px-10 py-4 rounded-full bg-[#171A20] text-white font-semibold hover:opacity-90 transition duration-300">

                  Contact GreenSolar

                </button>

              </Link>

              <Link to="/projects">

                <button className="px-10 py-4 rounded-full border border-[#171A20]/20 hover:bg-[#F5F5F5] transition duration-300">

                  Explore More Projects

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </div>
    
  );
}