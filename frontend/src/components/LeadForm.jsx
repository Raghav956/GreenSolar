import { useState } from "react";

import client from "../api/client";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LeadForm() {

  const [formData, setFormData] =
    useState({

      full_name: "",

      phone_number: "",

      city: "",

      electricity_bill: "",

      roof_type: "",

      required_kw: "",

      property_type: "",

      subsidy_interest: true,

      message: "",
    });

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await client.post(
        "/leads/",
        formData
      );

      toast.success(
        "Lead Submitted Successfully"
      );

      setFormData({

        full_name: "",

        phone_number: "",

        city: "",

        electricity_bill: "",

        roof_type: "",

        required_kw: "",

        property_type: "",

        subsidy_interest: true,

        message: "",
      });

    } catch (error) {

      

      toast.success(
        "Something went wrong"
      );
    }
  }

  return (

    <section className="bg-white py-32 px-6">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <motion.div

          initial={{
            opacity: 0,
            y: 40,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          className="text-center"
        >

          <p className="uppercase tracking-[6px] text-[#7A7D81] text-sm">

            RB Solar Care Consultation

          </p>

          <h2 className="mt-6 text-5xl md:text-7xl font-bold leading-tight text-[#171A20]">

            Get Free Solar Consultation

          </h2>

          <p className="mt-8 text-xl text-[#5C5E62] max-w-4xl mx-auto leading-relaxed">

            Share your electricity usage and rooftop details.
            RB Solar Care will help you estimate system size,
            subsidy eligibility and expected savings.

          </p>

        </motion.div>

        {/* FORM */}

        <motion.form

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

          onSubmit={handleSubmit}

          className="mt-20 bg-[#F5F5F5] border border-[#E5E5E5] rounded-[40px] p-8 md:p-14"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* NAME */}

            <input
              required
              value={formData.full_name}

              placeholder="Full Name"

              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

              onChange={(e) =>
                setFormData({

                  ...formData,

                  full_name:
                    e.target.value,
                })
              }
            />

            {/* PHONE */}

            <input
              required
              type="tel"
              pattern="[0-9]{10}"
              value={formData.phone_number}

              placeholder="Phone Number"

              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

              onChange={(e) =>
                setFormData({

                  ...formData,

                  phone_number:
                    e.target.value,
                })
              }
            />

            {/* CITY */}

            <input
              required
              value={formData.city}

              placeholder="City"

              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

              onChange={(e) =>
                setFormData({

                  ...formData,

                  city:
                    e.target.value,
                })
              }
            />

            {/* ELECTRICITY BILL */}

            <input
              required
              type="number"
              value={formData.electricity_bill}

              placeholder="Monthly Electricity Bill"

              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

              onChange={(e) =>
                setFormData({

                  ...formData,

                  electricity_bill:
                    e.target.value,
                })
              }
            />

            {/* ROOF TYPE */}

            <select
              required
              value={formData.roof_type}

              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

              onChange={(e) =>
                setFormData({

                  ...formData,

                  roof_type:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Roof Type
              </option>

              <option value="RCC">
                RCC Roof
              </option>

              <option value="Tin Shed">
                Tin Shed
              </option>

              <option value="Metal Roof">
                Metal Roof
              </option>

              <option value="Asbestos">
                Asbestos Roof
              </option>

              <option value="Tile Roof">
                Tile Roof
              </option>

              <option value="Ground Mounted">
                Ground Mounted
              </option>

            </select>

            {/* REQUIRED KW */}

            <input
              required
              type="number"
              value={formData.required_kw}

              placeholder="Required KW"

              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

              onChange={(e) =>
                setFormData({

                  ...formData,

                  required_kw:
                    e.target.value,
                })
              }
            />

            {/* PROPERTY TYPE */}

            <select
              required
              value={formData.property_type}

              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

              onChange={(e) =>
                setFormData({

                  ...formData,

                  property_type:
                    e.target.value,
                })
              }
            >

              <option value="">
                Select Property Type
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

              <option value="Agricultural">
                Agricultural
              </option>

            </select>

            {/* SUBSIDY */}

            <select
              required
              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

              onChange={(e) =>
                setFormData({

                  ...formData,

                  subsidy_interest:
                    e.target.value ===
                    "true",
                })
              }
            >

              <option value="true">
                Interested In Subsidy
              </option>

              <option value="false">
                Not Interested In Subsidy
              </option>

            </select>

          </div>

          {/* MESSAGE */}

          <textarea
            
            value={formData.message}

            placeholder="Additional Requirements"

            rows={6}

            className="mt-6 w-full p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

            onChange={(e) =>
              setFormData({

                ...formData,

                message:
                  e.target.value,
              })
            }
          />

          {/* BUTTON */}

          <button className="mt-8 w-full py-5 rounded-full bg-[#171A20] text-white text-lg font-semibold hover:opacity-90 transition duration-300">

            Submit Consultation Request

          </button>

        </motion.form>

      </div>

    </section>
  );
}