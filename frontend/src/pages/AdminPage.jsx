import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import client from "../api/client";

import AdminProjectUpload from "../components/AdminProjectUpload";
import toast from "react-hot-toast";
import { jwtDecode }
from "jwt-decode";
import { useNavigate }
from "react-router-dom";

export default function AdminPage() {

  const [analytics, setAnalytics] =
    useState({});

  const [leads, setLeads] =
    useState([]);

  const [complaints, setComplaints] =
    useState([]);

  const [pricing, setPricing] =
  useState([]);

  const [showPricingModal,
  setShowPricingModal] =
  useState(false);

const [newBrand,
  setNewBrand] =
  useState("");

const [newPrice,
  setNewPrice] =
  useState("");

  const [leadFilter, setLeadFilter] =
    useState("all");

  const [complaintFilter,
    setComplaintFilter] =
    useState("all");

    const navigate =
  useNavigate();

  useEffect(() => {

  const token =
    localStorage.getItem(
      "rbsolarcare_token"
    );

  if (!token) {

    navigate("/admin-login");

    return;
  }

  try {

    const decoded =
      jwtDecode(token);

    const currentTime =
      Date.now() / 1000;

    if (
      decoded.exp <
      currentTime
    ) {

      localStorage.removeItem(
        "rbsolarcare_token"
      );

      navigate("/admin-login");

      return;
    }

  } catch {

    localStorage.removeItem(
      "rbsolarcare_token"
    );

    navigate("/admin-login");

    return;
  }

  fetchDashboard();

}, []);

  async function fetchDashboard() {

    try {

      const analyticsRes =
        await client.get(
          "/analytics/summary"
        );

      const leadsRes =
        await client.get(
          "/leads/"
        );

      const complaintsRes =
        await client.get(
          "/complaints/"
        );

        const pricingRes =
  await client.get(
    "/pricing/"
  );

      setAnalytics(
        analyticsRes.data
      );

      setLeads(
        leadsRes.data
      );

      setComplaints(
        complaintsRes.data
      );
      setPricing(
  pricingRes.data
);

    } catch (error) {

      console.log(error);
    }
  }
  async function updatePrice(id) {

  const newPrice =
    prompt(
      "Enter new price per KW"
    );

  if (!newPrice) return;

  try {

    await client.put(

      `/pricing/${id}`,

      {
        price_per_kw:
          Number(newPrice),
      }
    );

    toast.success(
      "Price Updated"
    );

    fetchDashboard();

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed To Update Price"
    );
  }
}
async function addBrand() {

  if (
    !newBrand ||
    !newPrice
  ) {

    toast.error(
      "Fill all fields"
    );

    return;
  }

  try {

    await client.post(

      "/pricing/",

      {

        brand: newBrand,

        price_per_kw:
          Number(newPrice),
      }
    );

    toast.success(
      "Brand Added"
    );

    setShowPricingModal(
      false
    );

    setNewBrand("");

    setNewPrice("");

    fetchDashboard();

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed To Add Brand"
    );
  }
}
async function deleteBrand(id) {

  const confirmDelete =
    window.confirm(
      "Delete This Brand?"
    );

  if (!confirmDelete)
    return;

  try {

    await client.delete(
      `/pricing/${id}`
    );

    toast.success(
      "Brand Deleted"
    );

    fetchDashboard();

  } catch (error) {

    console.log(error);

    toast.error(
      "Failed To Delete"
    );
  }
}

  return (

    <div className="min-h-screen bg-[#050816] text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-32">

        {/* HEADER */}

        <div className="flex justify-between items-center">

          <div>

            <p className="uppercase tracking-[6px] text-gray-400 text-sm">

              RB Solar Care Administration

            </p>

            <h1 className="mt-4 text-6xl font-bold">

              Admin Dashboard

            </h1>

          </div>

        </div>

        {/* ANALYTICS */}

        <div className="grid md:grid-cols-4 gap-6 mt-16">

          <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">

            <h2 className="text-gray-400">

              Total Events

            </h2>

            <p className="text-5xl font-bold mt-4">

              {analytics.total_events || 0}

            </p>

          </div>

          <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">

            <h2 className="text-gray-400">

              WhatsApp Clicks

            </h2>

            <p className="text-5xl font-bold mt-4">

              {analytics.whatsapp_clicks || 0}

            </p>

          </div>

          <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">

            <h2 className="text-gray-400">

              Project Views

            </h2>

            <p className="text-5xl font-bold mt-4">

              {analytics.project_views || 0}

            </p>

          </div>

          <div className="bg-white/10 border border-white/10 p-8 rounded-3xl">

            <h2 className="text-gray-400">

              Calculator Usage

            </h2>

            <p className="text-5xl font-bold mt-4">

              {analytics.calculator_usage || 0}

            </p>

          </div>

        </div>


{/* PRICING MANAGEMENT */}

<div className="mt-24">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

          <div>

            <h2 className="text-4xl font-bold">

              Pricing Management

            </h2>

            <p className="text-gray-400 mt-2">

              Manage Solar Brand Pricing

            </p>

          </div>

          <button

            onClick={() =>
              setShowPricingModal(true)
            }

            className="bg-green-500 hover:bg-green-400 transition text-black px-6 py-4 rounded-2xl font-bold"
          >

            Add Brand

          </button>

        </div>

        {/* PRICING GRID */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          {pricing.map((item) => (

            <div

              key={item.id}

              className="bg-white/10 border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row md:justify-between md:items-center gap-6"
            >

              <div>

                <h3 className="text-2xl font-bold">

                  {item.brand}

                </h3>

                <p className="mt-3 text-gray-300 text-lg">

                  ₹
                  {" "}
                  {item.price_per_kw.toLocaleString()}
                  {" "}
                  / KW

                </p>

              </div>

              <div className="flex gap-4">

                <button

                  onClick={() =>
                    updatePrice(item.id)
                  }

                  className="bg-green-500 hover:bg-green-400 transition text-black px-6 py-3 rounded-2xl font-bold"
                >

                  Update

                </button>

                <button

                  onClick={() =>
                    deleteBrand(item.id)
                  }

                  className="bg-red-500 hover:bg-red-400 transition text-white px-6 py-3 rounded-2xl font-bold"
                >

                  Delete

                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

        {/* PROJECT UPLOAD */}

        <div className="mt-24">

          <AdminProjectUpload />

        </div>

        {/* LEADS */}

        <div className="mt-24">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

            <div>

              <h2 className="text-4xl font-bold">

                Solar Leads

              </h2>

              <p className="text-gray-400 mt-2">

                {leads.length} Leads Collected

              </p>

            </div>

            {/* FILTER */}

            <select

              value={leadFilter}

              onChange={(e) =>
                setLeadFilter(
                  e.target.value
                )
              }

              className="bg-black/30 border border-white/10 rounded-xl px-4 py-3"
            >

              <option value="all">
                All Leads
              </option>

              <option value="new">
                New
              </option>

              <option value="contacted">
                Contacted
              </option>

              <option value="closed">
                Closed
              </option>

            </select>

          </div>

          {/* TABLE */}

          <div className="mt-10 overflow-x-auto rounded-[30px] border border-white/10">

            <table className="w-full min-w-[1400px]">

              <thead className="bg-white/10">

                <tr className="text-left">

                  <th className="p-5">
                    Name
                  </th>

                  <th className="p-5">
                    Phone
                  </th>

                  <th className="p-5">
                    City
                  </th>

                  <th className="p-5">
                    Bill
                  </th>

                  <th className="p-5">
                    Roof
                  </th>

                  <th className="p-5">
                    KW
                  </th>

                  <th className="p-5">
                    Property
                  </th>

                  <th className="p-5">
                    Subsidy
                  </th>

                  <th className="p-5">
                    Status
                  </th>

                  <th className="p-5">
                    Message
                  </th>

                </tr>

              </thead>

              <tbody>

                {leads

                  .filter((lead) => {

                    if (
                      leadFilter === "all"
                    ) return true;

                    return (
                      lead.status ===
                      leadFilter
                    );
                  })

                  .map((lead) => (

                    <tr

                      key={lead.id}

                      className="border-b border-white/10 hover:bg-white/5 transition"
                    >

                      <td className="p-5 font-semibold">

                        {lead.full_name}

                      </td>

                      <td className="p-5">

                        {lead.phone_number}

                      </td>

                      <td className="p-5">

                        {lead.city}

                      </td>

                      <td className="p-5">

                        ₹
                        {lead.electricity_bill}

                      </td>

                      <td className="p-5">

                        {lead.roof_type}

                      </td>

                      <td className="p-5">

                        {lead.required_kw}

                      </td>

                      <td className="p-5">

                        {lead.property_type}

                      </td>

                      <td className="p-5">

                        {lead.subsidy_interest
                          ? "Interested"
                          : "No"}

                      </td>

                      {/* STATUS */}

                      <td className="p-5">

                        <select

                          value={
                            lead.status || "new"
                          }

                          onChange={async (e) => {

                            await client.put(

                              `/leads/${lead.id}/status?status=${e.target.value}`
                            );

                            fetchDashboard();
                          }}

                          className="bg-black/30 border border-white/10 rounded-xl px-4 py-2"
                        >

                          <option value="new">
                            New
                          </option>

                          <option value="contacted">
                            Contacted
                          </option>

                          <option value="closed">
                            Closed
                          </option>

                        </select>

                      </td>

                      <td className="p-5 max-w-[300px] truncate">

                        {lead.message || "-"}

                      </td>

                    </tr>
                  ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* COMPLAINTS */}

        <div className="mt-24">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

            <div>

              <h2 className="text-4xl font-bold">

                Customer Complaints

              </h2>

              <p className="text-gray-400 mt-2">

                {complaints.length} Complaints

              </p>

            </div>

            {/* FILTER */}

            <select

              value={complaintFilter}

              onChange={(e) =>
                setComplaintFilter(
                  e.target.value
                )
              }

              className="bg-black/30 border border-white/10 rounded-xl px-4 py-3"
            >

              <option value="all">
                All Complaints
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>

          </div>

          <div className="space-y-6 mt-10">

            {complaints

              .filter((complaint) => {

                if (
                  complaintFilter === "all"
                ) return true;

                return (

                  complaint
                    .complaint_status ===
                  complaintFilter
                );
              })

              .map(
                (complaint) => (

                  <div

                    key={complaint.id}

                    className="bg-white/10 border border-white/10 p-8 rounded-3xl"
                  >

                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

                  {/* LEFT */}

<div className="flex-1">

  {/* TITLE */}

  <div className="flex flex-wrap gap-4 items-center">

    <h3 className="text-3xl font-bold">

      {complaint.complaint_title}

    </h3>

    <div className="px-4 py-2 rounded-full bg-red-500/20 text-red-300 text-sm border border-red-500/20">

      Complaint ID:
      {" "}
      {complaint.id}

    </div>

  </div>

  {/* DESCRIPTION */}

  <p className="mt-5 text-gray-300 leading-relaxed max-w-4xl">

    {complaint.complaint_description}

  </p>

  {/* DETAILS GRID */}

  <div className="grid md:grid-cols-2 gap-6 mt-8">

    {/* PROJECT ID */}

    <div className="bg-black/20 border border-white/10 rounded-2xl p-5">

      <p className="text-gray-400 text-sm">

        Project ID

      </p>

      <p className="mt-2 text-lg font-semibold">

        {complaint.project_id || "-"}

      </p>

    </div>

    {/* CUSTOMER PHONE */}

    <div className="bg-black/20 border border-white/10 rounded-2xl p-5">

      <p className="text-gray-400 text-sm">

        Customer Phone

      </p>

      <p className="mt-2 text-lg font-semibold">

        {complaint.customer_phone || "-"}

      </p>

    </div>

    {/* STATUS */}

    <div className="bg-black/20 border border-white/10 rounded-2xl p-5">

      <p className="text-gray-400 text-sm">

        Current Status

      </p>

      <p className="mt-2 text-lg font-semibold text-cyan-300">

        {complaint.complaint_status}

      </p>

    </div>

    {/* CREATED */}

    <div className="bg-black/20 border border-white/10 rounded-2xl p-5">

      <p className="text-gray-400 text-sm">

        Created At

      </p>

      <p className="mt-2 text-lg font-semibold">

        {

          complaint.created_at

            ? new Date(
                complaint.created_at
              ).toLocaleString()

            : "-"
        }

      </p>

    </div>

  </div>

  {/* MEDIA */}

  {complaint.media_url && (

    <div className="mt-8">

      <p className="text-gray-400 mb-4">

        Attached Media

      </p>

      <a

        href={complaint.media_url}

        target="_blank"

        className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 transition border border-white/10"
      >

        View Attachment

      </a>

    </div>
  )}

</div>

                    </div>

                  </div>
                )
              )}

          </div>

        </div>

           </div>

      {/* ADD BRAND MODAL */}

      {showPricingModal && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">

          <div className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-[35px] p-10">

            <h2 className="text-4xl font-bold">

              Add Solar Brand

            </h2>

            {/* BRAND */}

            <div className="mt-10">

              <label className="text-gray-400">

                Brand Name

              </label>

              <input

                value={newBrand}

                onChange={(e) =>
                  setNewBrand(
                    e.target.value
                  )
                }

                placeholder="Tata Power Solar"

                className="w-full mt-4 p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
              />

            </div>

            {/* PRICE */}

            <div className="mt-8">

              <label className="text-gray-400">

                Price Per KW

              </label>

              <input

                type="number"

                value={newPrice}

                onChange={(e) =>
                  setNewPrice(
                    e.target.value
                  )
                }

                placeholder="70000"

                className="w-full mt-4 p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
              />

            </div>

            {/* ACTIONS */}

            <div className="flex gap-4 mt-10">

              <button

                onClick={() =>
                  setShowPricingModal(
                    false
                  )
                }

                className="flex-1 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition"
              >

                Cancel

              </button>

              <button

                onClick={addBrand}

                className="flex-1 py-4 rounded-2xl bg-green-500 hover:bg-green-400 transition text-black font-bold"
              >

                Add Brand

              </button>

            </div>

          </div>

        </div>
      )}

    </div>

  );
}