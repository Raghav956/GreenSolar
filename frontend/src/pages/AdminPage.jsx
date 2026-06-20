import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  jwtDecode,
} from "jwt-decode";

import toast from "react-hot-toast";

import AdminProjectUpload from "../components/AdminProjectUpload";
import client, {
  AUTH_TOKEN_KEY,
} from "../api/client";

const sections = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "pricing",
    label: "Pricing",
  },
  {
    id: "leads",
    label: "Leads",
  },
  {
    id: "complaints",
    label: "Complaints",
  },
];

export default function AdminPage() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState("overview");

  const [analytics, setAnalytics] =
    useState({});

  const [projects, setProjects] =
    useState([]);

  const [editingProject, setEditingProject] =
    useState(null);

  const [leads, setLeads] =
    useState([]);

  const [complaints, setComplaints] =
    useState([]);

  const [pricing, setPricing] =
    useState([]);

  const [leadFilter, setLeadFilter] =
    useState("all");

  const [
    complaintFilter,
    setComplaintFilter,
  ] = useState("all");

  const [
    showPricingModal,
    setShowPricingModal,
  ] = useState(false);

  const [newBrand, setNewBrand] =
    useState("");

  const [newPrice, setNewPrice] =
    useState("");

  const verifySession = useCallback(() => {
    const token = localStorage.getItem(
      AUTH_TOKEN_KEY
    );

    if (!token) {
      navigate("/admin/login");
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime =
        Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem(
          AUTH_TOKEN_KEY
        );
        navigate("/admin/login");
        return false;
      }

      return true;
    } catch {
      localStorage.removeItem(
        AUTH_TOKEN_KEY
      );
      navigate("/admin/login");
      return false;
    }
  }, [navigate]);

  const fetchDashboard =
    useCallback(async () => {
      try {
        const [
          analyticsRes,
          projectsRes,
          leadsRes,
          complaintsRes,
          pricingRes,
        ] = await Promise.all([
          client.get(
            "/analytics/summary"
          ),
          client.get(
            "/projects/admin/"
          ),
          client.get("/leads/"),
          client.get("/complaints/"),
          client.get("/pricing/"),
        ]);

        setAnalytics(
          analyticsRes.data
        );
        setProjects(projectsRes.data);
        setLeads(leadsRes.data);
        setComplaints(
          complaintsRes.data
        );
        setPricing(pricingRes.data);
      } catch (error) {
        console.log(error);
        toast.error(
          "Failed to load admin dashboard"
        );
      }
    }, []);

  useEffect(() => {
    if (verifySession()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchDashboard();
    }
  }, [fetchDashboard, verifySession]);

  function logout() {
    localStorage.removeItem(
      AUTH_TOKEN_KEY
    );
    navigate("/admin/login");
  }

  async function refreshProject(projectId) {
    try {
      if (projectId) {
        const response =
          await client.get(
            `/projects/admin/${projectId}`
          );

        setEditingProject(
          response.data
        );
      }

      await fetchDashboard();
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to refresh project"
      );
    }
  }

  async function deleteProject(projectId) {
    const confirmDelete =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmDelete) return;

    try {
      await client.delete(
        `/projects/${projectId}`
      );
      toast.success(
        "Project deleted"
      );
      setEditingProject(null);
      fetchDashboard();
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to delete project"
      );
    }
  }

  async function updatePrice(id) {
    const enteredPrice = prompt(
      "Enter new price per KW"
    );

    if (!enteredPrice) return;

    try {
      await client.put(
        `/pricing/${id}`,
        {
          price_per_kw:
            Number(enteredPrice),
        }
      );

      toast.success(
        "Price updated"
      );
      fetchDashboard();
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to update price"
      );
    }
  }

  async function addBrand() {
    if (!newBrand || !newPrice) {
      toast.error("Fill all fields");
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

      toast.success("Brand added");
      setShowPricingModal(false);
      setNewBrand("");
      setNewPrice("");
      fetchDashboard();
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to add brand"
      );
    }
  }

  async function deleteBrand(id) {
    const confirmDelete =
      window.confirm(
        "Delete this brand?"
      );

    if (!confirmDelete) return;

    try {
      await client.delete(
        `/pricing/${id}`
      );
      toast.success(
        "Brand deleted"
      );
      fetchDashboard();
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to delete brand"
      );
    }
  }

  async function updateLeadStatus(
    leadId,
    status
  ) {
    await client.put(
      `/leads/${leadId}/status?status=${status}`
    );
    fetchDashboard();
  }

  async function updateComplaintStatus(
    complaintId,
    status
  ) {
    await client.put(
      `/complaints/${complaintId}/status?status=${status}`
    );
    fetchDashboard();
  }

  const filteredLeads = leads.filter(
    (lead) =>
      leadFilter === "all" ||
      lead.status === leadFilter
  );

  const filteredComplaints =
    complaints.filter(
      (complaint) =>
        complaintFilter === "all" ||
        complaint.complaint_status ===
          complaintFilter
    );

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 hidden lg:flex w-72 flex-col border-r border-white/10 bg-black/30 backdrop-blur-2xl p-6">
        <div>
          <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-black font-black">
            RB
          </div>

          <h1 className="mt-5 text-2xl font-bold">
            Solar Care Admin
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage projects, leads, pricing and support.
          </p>
        </div>

        <nav className="mt-10 space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() =>
                setActiveSection(
                  section.id
                )
              }
              className={`w-full rounded-2xl px-5 py-4 text-left font-semibold transition ${
                activeSection ===
                section.id
                  ? "bg-cyan-400 text-black"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={logout}
          className="mt-auto rounded-2xl border border-white/10 px-5 py-4 text-left text-gray-300 hover:bg-white/10"
        >
          Logout
        </button>
      </aside>

      <main className="lg:ml-72 min-h-screen">
        <div className="sticky top-0 z-30 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl px-6 py-5 lg:hidden">
          <select
            value={activeSection}
            onChange={(event) =>
              setActiveSection(
                event.target.value
              )
            }
            className="w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3"
          >
            {sections.map((section) => (
              <option
                key={section.id}
                value={section.id}
              >
                {section.label}
              </option>
            ))}
          </select>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="uppercase tracking-[6px] text-gray-400 text-sm">
                GreenSolar Administration
              </p>

              <h2 className="mt-4 text-5xl font-bold capitalize">
                {activeSection}
              </h2>
            </div>

            <button
              type="button"
              onClick={fetchDashboard}
              className="rounded-2xl bg-white/10 px-6 py-4 font-semibold hover:bg-white/20 transition"
            >
              Refresh Data
            </button>
          </div>

          {activeSection ===
            "overview" && (
            <Overview
              analytics={analytics}
              projects={projects}
              leads={leads}
              complaints={complaints}
            />
          )}

          {activeSection ===
            "projects" && (
            <ProjectsSection
              projects={projects}
              editingProject={
                editingProject
              }
              setEditingProject={
                setEditingProject
              }
              refreshProject={
                refreshProject
              }
              deleteProject={
                deleteProject
              }
            />
          )}

          {activeSection ===
            "pricing" && (
            <PricingSection
              pricing={pricing}
              updatePrice={updatePrice}
              deleteBrand={deleteBrand}
              openModal={() =>
                setShowPricingModal(
                  true
                )
              }
            />
          )}

          {activeSection === "leads" && (
            <LeadsSection
              leads={filteredLeads}
              leadFilter={leadFilter}
              setLeadFilter={
                setLeadFilter
              }
              updateLeadStatus={
                updateLeadStatus
              }
            />
          )}

          {activeSection ===
            "complaints" && (
            <ComplaintsSection
              complaints={
                filteredComplaints
              }
              complaintFilter={
                complaintFilter
              }
              setComplaintFilter={
                setComplaintFilter
              }
              updateComplaintStatus={
                updateComplaintStatus
              }
            />
          )}
        </div>
      </main>

      {showPricingModal && (
        <PricingModal
          newBrand={newBrand}
          newPrice={newPrice}
          setNewBrand={setNewBrand}
          setNewPrice={setNewPrice}
          close={() =>
            setShowPricingModal(false)
          }
          addBrand={addBrand}
        />
      )}
    </div>
  );
}

function Overview({
  analytics,
  projects,
  leads,
  complaints,
}) {
  const cards = [
    {
      label: "Total Events",
      value:
        analytics.total_events || 0,
    },
    {
      label: "Projects",
      value: projects.length,
    },
    {
      label: "Leads",
      value: leads.length,
    },
    {
      label: "Complaints",
      value: complaints.length,
    },
    {
      label: "WhatsApp Clicks",
      value:
        analytics.whatsapp_clicks || 0,
    },
    {
      label: "Project Views",
      value:
        analytics.project_views || 0,
    },
    {
      label: "Calculator Usage",
      value:
        analytics.calculator_usage || 0,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white/10 border border-white/10 p-8 rounded-3xl"
        >
          <h3 className="text-gray-400">
            {card.label}
          </h3>

          <p className="text-5xl font-bold mt-4">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectsSection({
  projects,
  editingProject,
  setEditingProject,
  refreshProject,
  deleteProject,
}) {
  return (
    <div className="mt-12 space-y-10">
      <AdminProjectUpload
        key={
          editingProject?.id || "new"
        }
        editingProject={editingProject}
        onComplete={(projectId) =>
          refreshProject(projectId)
        }
        onCancel={() =>
          setEditingProject(null)
        }
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white/10 border border-white/10 rounded-3xl p-6"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-2 text-gray-400">
                  {project.location} •{" "}
                  {project.capacity} •{" "}
                  {project.project_type}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {project.media?.length ||
                    0}{" "}
                  media files
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setEditingProject(
                      project
                    )
                  }
                  className="px-5 py-3 rounded-2xl bg-cyan-400 text-black font-bold"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteProject(
                      project.id
                    )
                  }
                  className="px-5 py-3 rounded-2xl bg-red-500 text-white font-bold"
                >
                  Delete
                </button>
              </div>
            </div>

            {project.media?.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-6">
                {project.media
                  .slice(0, 3)
                  .map((media) =>
                    media.media_type ===
                    "video" ? (
                      <video
                        key={media.id}
                        src={media.media_url}
                        className="h-24 w-full rounded-xl object-cover bg-black"
                      />
                    ) : (
                      <img
                        key={media.id}
                        src={media.media_url}
                        alt=""
                        className="h-24 w-full rounded-xl object-cover bg-black"
                      />
                    )
                  )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingSection({
  pricing,
  updatePrice,
  deleteBrand,
  openModal,
}) {
  return (
    <div className="mt-12">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={openModal}
          className="bg-green-500 hover:bg-green-400 transition text-black px-6 py-4 rounded-2xl font-bold"
        >
          Add Brand
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
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
                ₹{" "}
                {item.price_per_kw.toLocaleString()}{" "}
                / KW
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() =>
                  updatePrice(item.id)
                }
                className="bg-green-500 hover:bg-green-400 transition text-black px-6 py-3 rounded-2xl font-bold"
              >
                Update
              </button>

              <button
                type="button"
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
  );
}

function LeadsSection({
  leads,
  leadFilter,
  setLeadFilter,
  updateLeadStatus,
}) {
  return (
    <div className="mt-12">
      <div className="flex justify-end">
        <select
          value={leadFilter}
          onChange={(event) =>
            setLeadFilter(
              event.target.value
            )
          }
          className="bg-black/30 border border-white/10 rounded-xl px-4 py-3"
        >
          <option value="all">
            All Leads
          </option>
          <option value="new">New</option>
          <option value="contacted">
            Contacted
          </option>
          <option value="closed">
            Closed
          </option>
        </select>
      </div>

      <div className="mt-8 overflow-x-auto rounded-[30px] border border-white/10">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-white/10">
            <tr className="text-left">
              <th className="p-5">Name</th>
              <th className="p-5">Phone</th>
              <th className="p-5">City</th>
              <th className="p-5">Bill</th>
              <th className="p-5">KW</th>
              <th className="p-5">Status</th>
              <th className="p-5">Message</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
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
                  ₹{lead.electricity_bill}
                </td>
                <td className="p-5">
                  {lead.required_kw}
                </td>
                <td className="p-5">
                  <select
                    value={
                      lead.status || "new"
                    }
                    onChange={(event) =>
                      updateLeadStatus(
                        lead.id,
                        event.target.value
                      )
                    }
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
  );
}

function ComplaintsSection({
  complaints,
  complaintFilter,
  setComplaintFilter,
  updateComplaintStatus,
}) {
  return (
    <div className="mt-12">
      <div className="flex justify-end">
        <select
          value={complaintFilter}
          onChange={(event) =>
            setComplaintFilter(
              event.target.value
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

      <div className="space-y-6 mt-8">
        {complaints.map((complaint) => (
          <div
            key={complaint.id}
            className="bg-white/10 border border-white/10 p-8 rounded-3xl"
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div>
                <h3 className="text-3xl font-bold">
                  {
                    complaint.complaint_title
                  }
                </h3>

                <p className="mt-4 text-gray-300 max-w-4xl">
                  {
                    complaint.complaint_description
                  }
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
                  <InfoBox
                    label="Project ID"
                    value={
                      complaint.project_id ||
                      "-"
                    }
                  />
                  <InfoBox
                    label="Customer Phone"
                    value={
                      complaint.customer_phone ||
                      "-"
                    }
                  />
                  <InfoBox
                    label="Created"
                    value={
                      complaint.created_at
                        ? new Date(
                            complaint.created_at
                          ).toLocaleString()
                        : "-"
                    }
                  />
                </div>
              </div>

              <select
                value={
                  complaint.complaint_status ||
                  "Pending"
                }
                onChange={(event) =>
                  updateComplaintStatus(
                    complaint.id,
                    event.target.value
                  )
                }
                className="h-fit bg-black/30 border border-white/10 rounded-xl px-4 py-3"
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
        ))}
      </div>
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="bg-black/20 border border-white/10 rounded-2xl p-4">
      <p className="text-gray-400">
        {label}
      </p>
      <p className="mt-2 font-semibold">
        {value}
      </p>
    </div>
  );
}

function PricingModal({
  newBrand,
  newPrice,
  setNewBrand,
  setNewPrice,
  close,
  addBrand,
}) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">
      <div className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-[35px] p-10">
        <h2 className="text-4xl font-bold">
          Add Solar Brand
        </h2>

        <div className="mt-10">
          <label className="text-gray-400">
            Brand Name
          </label>
          <input
            value={newBrand}
            onChange={(event) =>
              setNewBrand(
                event.target.value
              )
            }
            placeholder="Tata Power Solar"
            className="w-full mt-4 p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
          />
        </div>

        <div className="mt-8">
          <label className="text-gray-400">
            Price Per KW
          </label>
          <input
            type="number"
            value={newPrice}
            onChange={(event) =>
              setNewPrice(
                event.target.value
              )
            }
            placeholder="70000"
            className="w-full mt-4 p-4 rounded-2xl bg-black/30 border border-white/10 outline-none"
          />
        </div>

        <div className="flex gap-4 mt-10">
          <button
            type="button"
            onClick={close}
            className="flex-1 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={addBrand}
            className="flex-1 py-4 rounded-2xl bg-green-500 hover:bg-green-400 transition text-black font-bold"
          >
            Add Brand
          </button>
        </div>
      </div>
    </div>
  );
}
