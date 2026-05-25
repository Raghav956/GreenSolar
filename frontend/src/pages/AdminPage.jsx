import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import client from "../api/client";

import AdminProjectUpload from "../components/AdminProjectUpload";
import toast from "react-hot-toast";

export default function AdminPage() {

  const [analytics, setAnalytics] =
    useState({});

  const [leads, setLeads] =
    useState([]);

  const [complaints, setComplaints] =
    useState([]);

  const [leadFilter, setLeadFilter] =
    useState("all");

  const [complaintFilter,
    setComplaintFilter] =
    useState("all");

  useEffect(() => {

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

      setAnalytics(
        analyticsRes.data
      );

      setLeads(
        leadsRes.data
      );

      setComplaints(
        complaintsRes.data
      );

    } catch (error) {

      console.log(error);
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

              GreenSolar Administration

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

                      <div>

                        <h3 className="text-3xl font-bold">

                          {
                            complaint.complaint_title
                          }

                        </h3>

                        <p className="mt-5 text-gray-300 leading-relaxed max-w-4xl">

                          {
                            complaint.complaint_description
                          }

                        </p>

                      </div>

                      {/* RIGHT */}

                      <div>

                        <select

                          value={
                            complaint.complaint_status
                          }

                          onChange={async (e) => {

                            await client.put(

                              `/complaints/${complaint.id}/status?status=${e.target.value}`
                            );

                            fetchDashboard();
                          }}

                          className="bg-black/30 border border-white/10 rounded-xl px-4 py-3"
                        >

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

                    </div>

                  </div>
                )
              )}

          </div>

        </div>

      </div>

    </div>
  );
}