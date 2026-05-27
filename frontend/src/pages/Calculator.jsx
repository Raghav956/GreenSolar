import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import client from "../api/client";

export default function Calculator() {

  const [kw, setKw] = useState(1)

  const [brand, setBrand] =
    useState('')

  const [systemType,
    setSystemType] =
    useState('On Grid')

  const [pricing,
    setPricing] =
    useState([])

  useEffect(() => {

    fetchPricing()

  }, [])

  async function fetchPricing() {

    try {

      const response =
        await client.get(
          "/pricing/"
        )

      setPricing(
        response.data
      )

      /* DEFAULT BRAND */

      if (
        response.data.length > 0
      ) {

        setBrand(
          response.data[0].brand
        )
      }

    } catch (error) {

      console.log(error)
    }
  }

  /* FIND SELECTED BRAND */

  const selectedBrand =
    pricing.find(

      (item) =>
        item.brand === brand
    )

  /* DYNAMIC PRICE */

  const totalCost =

    kw *

    (
      selectedBrand
        ?.price_per_kw || 0
    )

  const subsidy = kw <= 3
    ? totalCost * 0.4
    : totalCost * 0.2

  const finalCost =
    totalCost - subsidy

  const emi =
    Math.round(finalCost / 60)

  const yearlySavings =
    kw * 18000

  return (

    <div className='min-h-screen pt-32 px-6'>
       <Navbar />

      <div className='max-w-6xl mx-auto'>
      
        {/* HEADER */}

        <div className='text-center'>

          <h1 className='text-6xl font-bold text-green-400'>
            Solar Cost Calculator
          </h1>

          <p className='mt-6 text-xl text-gray-300'>
            Estimate Your Solar Investment, EMI & Savings
          </p>

        </div>

        {/* MAIN CARD */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className='glass mt-16 p-10 rounded-[40px]'
        >

          <div className='grid md:grid-cols-2 gap-10'>

            {/* LEFT SIDE */}

            <div>

              {/* KW */}

              <div>

                <label className='text-xl'>
                  Required Capacity (KW)
                </label>

                <input
                  type='range'
                  min='1'
                  max='1000'
                  value={kw}
                  onChange={(e) =>
                    setKw(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className='w-full mt-6'
                />

                <div className='mt-4 text-3xl font-bold text-green-400'>
                  {kw} KW
                </div>

              </div>

              {/* BRAND */}

              <div className='mt-10'>

                <label className='text-xl'>
                  Select Brand
                </label>

                <select
                  value={brand}
                  onChange={(e) =>
                    setBrand(
                      e.target.value
                    )
                  }
                  className='w-full mt-4 p-4 rounded-2xl bg-black/40 border border-white/10'
                >

                  {pricing.map(
                    (item) => (

                      <option
                        key={item.id}
                        value={item.brand}
                      >

                        {item.brand}

                      </option>
                    )
                  )}

                </select>

              </div>

              {/* SYSTEM TYPE */}

              <div className='mt-10'>

                <label className='text-xl'>
                  System Type
                </label>

                <select
                  value={systemType}
                  onChange={(e) =>
                    setSystemType(
                      e.target.value
                    )
                  }
                  className='w-full mt-4 p-4 rounded-2xl bg-black/40 border border-white/10'
                >

                  <option>
                    On Grid
                  </option>

                  <option>
                    Off Grid
                  </option>

                </select>

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className='glass rounded-3xl p-8'>

              <h2 className='text-3xl font-bold text-green-400'>
                Estimated Results
              </h2>

              <div className='mt-10 flex flex-col gap-8'>

                <div>

                  <p className='text-gray-400'>
                    Estimated Installation Cost
                  </p>

                  <h3 className='text-4xl font-bold'>
                    ₹ {totalCost.toLocaleString()}
                  </h3>

                </div>

                <div>

                  <p className='text-gray-400'>
                    Estimated Government Subsidy
                  </p>

                  <h3 className='text-4xl font-bold text-green-400'>
                    ₹ {Math.round(subsidy).toLocaleString()}
                  </h3>

                </div>

                <div>

                  <p className='text-gray-400'>
                    Final Estimated Cost
                  </p>

                  <h3 className='text-4xl font-bold'>
                    ₹ {Math.round(finalCost).toLocaleString()}
                  </h3>

                </div>

                <div>

                  <p className='text-gray-400'>
                    Approx EMI / Month
                  </p>

                  <h3 className='text-4xl font-bold'>
                    ₹ {emi.toLocaleString()}
                  </h3>

                </div>

                <div>

                  <p className='text-gray-400'>
                    Estimated Yearly Savings
                  </p>

                  <h3 className='text-4xl font-bold text-green-400'>
                    ₹ {yearlySavings.toLocaleString()}
                  </h3>

                </div>

              </div>

              {/* CTA */}

              <a
                href='https://wa.me/917524853717?text=Hi RB Solar Care, I want solar consultation.'
                target='_blank'
              >

                <button className='w-full mt-12 py-5 bg-green-500 text-black rounded-2xl font-bold text-xl hover:scale-105 transition'>

                  Get Detailed Quote On WhatsApp

                </button>

              </a>

            </div>

          </div>

        </motion.div>

      </div>

      <div className="h-32 bg-black" />

      <Footer />

    </div>

  )
}