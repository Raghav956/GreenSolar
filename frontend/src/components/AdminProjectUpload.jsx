import { useState } from "react";

import client from "../api/client";
import toast from "react-hot-toast";

import {
  getCoordinates,
} from "../services/geocodeService";

export default function AdminProjectUpload() {

  const [loading, setLoading] =
    useState(false);

  const [mediaFile, setMediaFile] =
    useState(null);

  const [projectId, setProjectId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      title: "",

      description: "",

      address: "",

      location: "",

      capacity: "",

      project_type: "",

      customer_name: "",

      phone_number: "",
    });

  async function createProject(e) {

    e.preventDefault();

    try {

      setLoading(true);

      // AUTO FETCH COORDINATES

      const coordinates =
        await getCoordinates(
          formData.address
        );

      // FINAL DATA

      const updatedFormData = {

        ...formData,

        latitude:
          coordinates.latitude,

        longitude:
          coordinates.longitude,
      };

      // CREATE PROJECT

      const projectResponse =
        await client.post(
          "/projects/",
          updatedFormData
        );

      const createdProjectId =
        projectResponse.data.id;

      setProjectId(
        createdProjectId
      );

      // UPLOAD MEDIA

      if (mediaFile) {

        const uploadForm =
          new FormData();

        uploadForm.append(
          "file",
          mediaFile
        );

        const isVideo =
          mediaFile.type.startsWith(
            "video"
          );

        const uploadEndpoint =
          isVideo
            ? "/upload/video"
            : "/upload/image";

        const uploadResponse =
          await client.post(
            uploadEndpoint,
            uploadForm
          );

        // ATTACH MEDIA TO PROJECT

        await client.post(
          `/projects/${createdProjectId}/media`,
          {

            media_url:
              uploadResponse.data.url,

            media_type:
              isVideo
                ? "video"
                : "image",
          }
        );
      }

      toast.success(
        "Project Uploaded Successfully"
      );

      // RESET FORM

      setFormData({

        title: "",

        description: "",

        address: "",

        location: "",

        capacity: "",

        project_type: "",

        customer_name: "",

        phone_number: "",
      });

      setMediaFile(null);

    } catch (error) {

      console.log(error);

      toast.success(
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="mt-20 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[40px] p-6 md:p-10">

      <h2 className="text-4xl font-bold text-white">

        Upload New Project

      </h2>

      <p className="mt-4 text-gray-400">

        Add installations across Uttar Pradesh.

      </p>

      <form
        onSubmit={createProject}
        className="grid md:grid-cols-2 gap-6 mt-10"
      >

        {/* TITLE */}

        <input
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({

              ...formData,

              title: e.target.value,
            })
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        {/* LOCATION */}

        <input
          type="text"
          placeholder="City / Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({

              ...formData,

              location: e.target.value,
            })
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        {/* ADDRESS */}

        <input
          type="text"
          placeholder="Full Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({

              ...formData,

              address: e.target.value,
            })
          }
          className="md:col-span-2 p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        {/* CAPACITY */}

        <input
          type="text"
          placeholder="Capacity (Example: 20KW)"
          value={formData.capacity}
          onChange={(e) =>
            setFormData({

              ...formData,

              capacity: e.target.value,
            })
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        {/* TYPE */}

        <select
          value={formData.project_type}
          onChange={(e) =>
            setFormData({

              ...formData,

              project_type: e.target.value,
            })
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        >

          <option value="">
            Project Type
          </option>

          <option>
            Residential
          </option>

          <option>
            Commercial
          </option>

          <option>
            Industrial
          </option>

          <option>
            Solar Farm
          </option>

          <option>
            Agricultural
          </option>

        </select>

        {/* CUSTOMER */}

        <input
          type="text"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={(e) =>
            setFormData({

              ...formData,

              customer_name: e.target.value,
            })
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        {/* PHONE */}

        <input
          type="text"
          placeholder="Customer Phone Number"
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({

              ...formData,

              phone_number: e.target.value,
            })
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        {/* DESCRIPTION */}

        <textarea
          rows={5}
          placeholder="Project Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({

              ...formData,

              description: e.target.value,
            })
          }
          className="md:col-span-2 p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400 resize-none"
        />

        {/* MEDIA */}

        <div className="md:col-span-2">

          <label className="text-gray-300">

            Upload Image / Video

          </label>

          <input
            type="file"
            onChange={(e) =>
              setMediaFile(
                e.target.files[0]
              )
            }
            className="mt-3 w-full text-white"
          />

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 py-5 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-[1.02] transition duration-300"
        >

          {loading
            ? "Uploading..."
            : "Upload Project"}

        </button>

      </form>

    </div>
  );
}