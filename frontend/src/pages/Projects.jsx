import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import client from "../api/client";

export default function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [typeFilter,
    setTypeFilter] =
    useState("all");

  const [capacityFilter,
    setCapacityFilter] =
    useState("all");

  useEffect(() => {

    fetchProjects();

  }, []);

  async function fetchProjects() {

    try {

      const response =
        await client.get("/projects/");

      setProjects(response.data);

    } catch (error) {

      console.log(error);
    }
  }

  /* FILTER PROJECTS */

  const filteredProjects =
    projects.filter((project) => {

      /* SEARCH */

      const matchesSearch =

        project.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        project.location
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        project.customer_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      /* TYPE */

      const matchesType =

        typeFilter === "all"

          ? true

          : project.project_type ===
            typeFilter;

      /* CAPACITY */

      let matchesCapacity =
        true;

      const kw = parseInt(
        project.capacity
      );

      if (
        capacityFilter ===
        "1-5"
      ) {

        matchesCapacity =
          kw <= 5;
      }

      if (
        capacityFilter ===
        "5-10"
      ) {

        matchesCapacity =
          kw > 5 &&
          kw <= 10;
      }

      if (
        capacityFilter ===
        "10+"
      ) {

        matchesCapacity =
          kw > 10;
      }

      return (

        matchesSearch &&
        matchesType &&
        matchesCapacity
      );
    });

  return (

    <div className="min-h-screen bg-white text-[#171A20] overflow-hidden">

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

        <div className="absolute inset-0 bg-black/35" />

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

            GreenSolar Projects

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

            Installations Across
            <br />

            Uttar Pradesh

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

            Residential, commercial, industrial and agricultural solar projects delivered across Uttar Pradesh.

          </motion.p>

        </div>

      </section>

      {/* FILTERS */}

      <section className="px-6 py-16">

        <div className="max-w-7xl mx-auto">

          <div className="grid md:grid-cols-3 gap-6">

            {/* SEARCH */}

            <input

              type="text"

              placeholder="Search projects, city or customer..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              className="w-full p-5 rounded-2xl border border-[#E5E5E5] outline-none bg-white"
            />

            {/* PROJECT TYPE */}

            <select

              value={typeFilter}

              onChange={(e) =>
                setTypeFilter(
                  e.target.value
                )
              }

              className="w-full p-5 rounded-2xl border border-[#E5E5E5] outline-none bg-white"
            >

              <option value="all">
                All Project Types
              </option>

              <option value="Residential">
                Residential
              </option>

              <option value="Commercial">
                Commercial
              </option>

              <option value="Industrial">
                Industrial
              </option>

            </select>

            {/* KW FILTER */}

            <select

              value={
                capacityFilter
              }

              onChange={(e) =>
                setCapacityFilter(
                  e.target.value
                )
              }

              className="w-full p-5 rounded-2xl border border-[#E5E5E5] outline-none bg-white"
            >

              <option value="all">
                All Capacities
              </option>

              <option value="1-5">
                1KW - 5KW
              </option>

              <option value="5-10">
                5KW - 10KW
              </option>

              <option value="10+">
                10KW+
              </option>

            </select>

          </div>

        </div>

      </section>

      {/* PROJECTS */}

      <section className="px-6 pb-32">

        <div className="max-w-7xl mx-auto">

          {/* GRID */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {filteredProjects.map((project, index) => (

              <motion.div

                key={project.id}

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: index * 0.08,
                }}
              >

                <Link
                  to={`/projects/${project.id}`}
                >

                  <div className="group bg-[#F5F5F5] rounded-[30px] overflow-hidden border border-[#E5E5E5] hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition duration-500">

                    {/* MEDIA */}

                    <div className="overflow-hidden">

                      {project.media.length > 0 ? (

                        project.media[0]
                          .media_type ===
                        "image" ? (

                          <img
                            src={
                              project.media[0]
                                .media_url
                            }
                            alt=""
                            className="w-full h-[300px] object-cover group-hover:scale-105 transition duration-700"
                          />

                        ) : (

                          <video
                            src={
                              project.media[0]
                                .media_url
                            }
                            controls
                            className="w-full h-[300px] object-cover"
                          />
                        )

                      ) : (

                        <div className="w-full h-[300px] bg-[#ECECEC] flex items-center justify-center">

                          <p className="text-[#5C5E62]">

                            No Media Uploaded

                          </p>

                        </div>
                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="p-8">

                      {/* TYPE */}

                      <p className="uppercase tracking-[4px] text-sm text-[#5C5E62]">

                        {project.project_type}

                      </p>

                      {/* TITLE */}

                      <h2 className="mt-5 text-3xl font-semibold leading-snug group-hover:opacity-70 transition">

                        {project.title}

                      </h2>

                      {/* DESCRIPTION */}

                      <p className="mt-6 text-[#5C5E62] text-lg leading-relaxed line-clamp-3">

                        {project.description}

                      </p>

                      {/* FOOTER */}

                      <div className="mt-10 flex justify-between items-center">

                        <div>

                          <p className="text-sm text-[#7A7D81]">

                            Capacity

                          </p>

                          <p className="mt-2 text-lg font-semibold">

                            {project.capacity}

                          </p>

                        </div>

                        <div className="text-right">

                          <p className="text-sm text-[#7A7D81]">

                            Location

                          </p>

                          <p className="mt-2 text-lg font-semibold">

                            {project.location}

                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                </Link>

              </motion.div>
            ))}

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}