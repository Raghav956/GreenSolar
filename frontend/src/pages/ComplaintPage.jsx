import { useState } from "react";

import { motion } from "framer-motion";

import client from "../api/client";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import toast from "react-hot-toast";
export default function ComplaintPage() {

  const [phone, setPhone] =
    useState("");

  const [projectId,
    setProjectId] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const [verified,
    setVerified] =
    useState(false);

  const [complaint,
    setComplaint] =
    useState({

      customer_phone: "",

      complaint_title: "",

      complaint_description: "",

      media_url: "",
    });

  async function verifyCustomer() {

    try {

      setLoading(true);

      const response =
        await client.post(

          `/complaints/login?phone_number=${phone}`
        );

      setProjectId(
        response.data.project_id
      );

      setVerified(true);

      toast.success(
        "Customer Verified Successfully"
      );

    } catch (error) {

      toast.success(
        "Customer Not Found"
      );

    } finally {

      setLoading(false);
    }
  }

  async function submitComplaint() {

    try {

      setLoading(true);

      await client.post(

        `/complaints/${projectId}`,

        complaint
      );

      toast.success(
        "Complaint Submitted Successfully"
      );

      setComplaint({

        customer_phone: "",

        complaint_title: "",

        complaint_description: "",

        media_url: "",
      });

    } catch (error) {

      toast.success(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="bg-white text-[#171A20] overflow-hidden min-h-screen">

      <Navbar />

      {/* HERO */}

      <section className="relative h-[65vh] overflow-hidden">

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

            GreenSolar Support

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

            Customer Support
            <br />

            & Complaints

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

            Raise support requests and service complaints for your GreenSolar installation.

          </motion.p>

        </div>

      </section>

      {/* FORM SECTION */}

      <section className="px-6 py-32">

        <div className="max-w-4xl mx-auto">

          <motion.div

            initial={{
              opacity: 0,
              y: 40,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            className="bg-[#F5F5F5] border border-[#E5E5E5] rounded-[40px] p-8 md:p-14"
          >

            {/* VERIFY CUSTOMER */}

            {!verified && (

              <div>

                <h2 className="text-4xl font-bold">

                  Verify Customer

                </h2>

                <p className="mt-6 text-[#5C5E62] text-lg leading-relaxed">

                  Enter your registered phone number to continue with complaint registration.

                </p>

                <div className="mt-12">

                  <label className="text-[#5C5E62]">

                    Registered Phone Number

                  </label>

                  <input

                    type="text"

                    placeholder="Enter your registered number"

                    className="mt-4 w-full p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

                    onChange={(e) =>
                      setPhone(
                        e.target.value
                      )
                    }
                  />

                  <button

                    onClick={
                      verifyCustomer
                    }

                    disabled={loading}

                    className="mt-8 w-full py-5 rounded-full bg-[#171A20] text-white font-semibold text-lg hover:opacity-90 transition duration-300"
                  >

                    {loading
                      ? "Verifying..."
                      : "Verify Customer"}

                  </button>

                </div>

              </div>
            )}

            {/* COMPLAINT FORM */}

            {verified && (

              <div>

                <h2 className="text-4xl font-bold">

                  Raise Complaint

                </h2>

                <p className="mt-6 text-[#5C5E62] text-lg leading-relaxed">

                  Provide details about your issue so our support team can assist you quickly.

                </p>

                <div className="mt-12 space-y-8">

                  {/* TITLE */}

                  <div>

                    <label className="text-[#5C5E62]">

                      Complaint Title

                    </label>

                    <input

                      type="text"

                      placeholder="Ex: Inverter Issue"

                      className="mt-4 w-full p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

                      onChange={(e) =>
                        setComplaint({

                          ...complaint,

                          complaint_title:
                            e.target.value,

                          customer_phone:
                            phone,
                        })
                      }
                    />

                  </div>

                  {/* DESCRIPTION */}

                  <div>

                    <label className="text-[#5C5E62]">

                      Describe The Issue

                    </label>

                    <textarea

                      rows={6}

                      placeholder="Please explain the issue in detail..."

                      className="mt-4 w-full p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20] resize-none"

                      onChange={(e) =>
                        setComplaint({

                          ...complaint,

                          complaint_description:
                            e.target.value,
                        })
                      }
                    />

                  </div>

                  {/* MEDIA */}

                  <div>

                    <label className="text-[#5C5E62]">

                      Media URL (Optional)

                    </label>

                    <input

                      type="text"

                      placeholder="Upload image/video and paste URL"

                      className="mt-4 w-full p-5 rounded-2xl bg-white border border-[#E5E5E5] outline-none text-[#171A20]"

                      onChange={(e) =>
                        setComplaint({

                          ...complaint,

                          media_url:
                            e.target.value,
                        })
                      }
                    />

                  </div>

                  {/* BUTTON */}

                  <button

                    onClick={
                      submitComplaint
                    }

                    disabled={loading}

                    className="w-full py-5 rounded-full bg-[#171A20] text-white font-semibold text-lg hover:opacity-90 transition duration-300"
                  >

                    {loading
                      ? "Submitting..."
                      : "Submit Complaint"}

                  </button>

                </div>

              </div>
            )}

          </motion.div>

        </div>

      </section>

      <Footer />

    </div>
  );
}