import {
  useMemo,
  useState,
} from "react";

import client from "../api/client";
import toast from "react-hot-toast";

import {
  getCoordinates,
} from "../services/geocodeService";

const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_SIZE_BYTES =
  MAX_VIDEO_SIZE_MB * 1024 * 1024;

const emptyForm = {
  title: "",
  description: "",
  address: "",
  location: "",
  capacity: "",
  project_type: "",
  customer_name: "",
  phone_number: "",
};

function formFromProject(project) {
  if (!project) return emptyForm;

  return {
    title: project.title || "",
    description:
      project.description || "",
    address: project.address || "",
    location: project.location || "",
    capacity: project.capacity || "",
    project_type:
      project.project_type || "",
    customer_name:
      project.customer_name || "",
    phone_number:
      project.phone_number || "",
  };
}

export default function AdminProjectUpload({
  editingProject = null,
  onComplete,
  onCancel,
}) {
  const [loading, setLoading] =
    useState(false);

  const [mediaFiles, setMediaFiles] =
    useState([]);

  const [uploadProgress, setUploadProgress] =
    useState({});

  const [
    featuredUploadKey,
    setFeaturedUploadKey,
  ] = useState("");

  const [formData, setFormData] =
    useState(() =>
      formFromProject(editingProject)
    );

  const isEditing = Boolean(
    editingProject?.id
  );

  const title = isEditing
    ? "Edit Project"
    : "Upload New Project";

  const submitLabel = isEditing
    ? "Update Project"
    : "Upload Project";

  const selectedMedia = useMemo(
    () =>
      mediaFiles.map((file, index) => ({
        file,
        key: `${file.name}-${file.size}-${index}`,
        isVideo:
          file.type.startsWith("video"),
      })),
    [mediaFiles]
  );

  function handleFileSelection(event) {
    const files = Array.from(
      event.target.files || []
    );

    const oversizedVideo = files.find(
      (file) =>
        file.type.startsWith("video") &&
        file.size > MAX_VIDEO_SIZE_BYTES
    );

    if (oversizedVideo) {
      toast.error(
        `Video files must be ${MAX_VIDEO_SIZE_MB} MB or less`
      );
      event.target.value = "";
      return;
    }

    setMediaFiles(files);
    setUploadProgress({});
    setFeaturedUploadKey("");
  }

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function uploadMediaFiles(projectId) {
    for (const item of selectedMedia) {
      const uploadForm = new FormData();

      uploadForm.append(
        "file",
        item.file
      );

      const uploadEndpoint = item.isVideo
        ? "/upload/video"
        : "/upload/image";

      const uploadResponse =
        await client.post(
          uploadEndpoint,
          uploadForm,
          {
            onUploadProgress: (event) => {
              if (!event.total) return;

              const progress = Math.round(
                (event.loaded * 100) /
                  event.total
              );

              setUploadProgress(
                (current) => ({
                  ...current,
                  [item.key]: progress,
                })
              );
            },
          }
        );

      const addMediaResponse =
        await client.post(
          `/projects/${projectId}/media`,
          {
            media_url:
              uploadResponse.data.url,
            media_type: item.isVideo
              ? "video"
              : "image",
            is_featured:
              item.key ===
              featuredUploadKey,
          }
        );

      if (
        item.key === featuredUploadKey
      ) {
        await client.put(
          `/projects/${projectId}/media/${addMediaResponse.data.id}/featured`
        );
      }

      setUploadProgress((current) => ({
        ...current,
        [item.key]: 100,
      }));
    }
  }

  async function saveProject(event) {
    event.preventDefault();

    try {
      setLoading(true);

      let coordinates = {
        latitude:
          editingProject?.latitude || null,
        longitude:
          editingProject?.longitude || null,
      };

      const addressChanged =
        formData.address !==
        editingProject?.address;

      if (!isEditing || addressChanged) {
        coordinates =
          await getCoordinates(
            formData.address
          );
      }

      const payload = {
        ...formData,
        latitude:
          coordinates.latitude,
        longitude:
          coordinates.longitude,
      };

      const projectResponse = isEditing
        ? await client.put(
            `/projects/${editingProject.id}`,
            payload
          )
        : await client.post(
            "/projects/",
            payload
          );

      await uploadMediaFiles(
        projectResponse.data.id
      );

      toast.success(
        isEditing
          ? "Project Updated Successfully"
          : "Project Uploaded Successfully"
      );

      setFormData(emptyForm);
      setMediaFiles([]);
      setUploadProgress({});
      setFeaturedUploadKey("");

      onComplete?.(
        isEditing
          ? projectResponse.data.id
          : undefined
      );
    } catch (error) {
      console.log(error);

      toast.error(
        "Project save failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteExistingMedia(mediaId) {
    if (!editingProject?.id) return;

    const confirmDelete =
      window.confirm(
        "Delete this media item?"
      );

    if (!confirmDelete) return;

    try {
      await client.delete(
        `/projects/${editingProject.id}/media/${mediaId}`
      );

      toast.success("Media deleted");
      onComplete?.(editingProject.id);
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to delete media"
      );
    }
  }

  async function setExistingFeaturedMedia(
    mediaId
  ) {
    if (!editingProject?.id) return;

    try {
      await client.put(
        `/projects/${editingProject.id}/media/${mediaId}/featured`
      );

      toast.success(
        "Key media updated"
      );
      onComplete?.(editingProject.id);
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to update key media"
      );
    }
  }

  return (
    <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-4 text-gray-400">
            Add details, customer data, and multiple photos or videos.
          </p>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-3 rounded-2xl border border-white/10 hover:bg-white/10 transition"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form
        onSubmit={saveProject}
        className="grid md:grid-cols-2 gap-6 mt-10"
      >
        <input
          required
          type="text"
          placeholder="Project Title"
          value={formData.title}
          onChange={(event) =>
            updateField(
              "title",
              event.target.value
            )
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        <input
          required
          type="text"
          placeholder="City / Location"
          value={formData.location}
          onChange={(event) =>
            updateField(
              "location",
              event.target.value
            )
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        <input
          required
          type="text"
          placeholder="Full Address"
          value={formData.address}
          onChange={(event) =>
            updateField(
              "address",
              event.target.value
            )
          }
          className="md:col-span-2 p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        <input
          required
          type="text"
          placeholder="Capacity (Example: 20KW)"
          value={formData.capacity}
          onChange={(event) =>
            updateField(
              "capacity",
              event.target.value
            )
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        <select
          required
          value={formData.project_type}
          onChange={(event) =>
            updateField(
              "project_type",
              event.target.value
            )
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        >
          <option value="">
            Project Type
          </option>
          <option>Residential</option>
          <option>Commercial</option>
          <option>Industrial</option>
          <option>Solar Farm</option>
          <option>Agricultural</option>
        </select>

        <input
          required
          type="text"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={(event) =>
            updateField(
              "customer_name",
              event.target.value
            )
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        <input
          required
          type="text"
          placeholder="Customer Phone Number"
          value={formData.phone_number}
          onChange={(event) =>
            updateField(
              "phone_number",
              event.target.value
            )
          }
          className="p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400"
        />

        <textarea
          required
          rows={5}
          placeholder="Project Description"
          value={formData.description}
          onChange={(event) =>
            updateField(
              "description",
              event.target.value
            )
          }
          className="md:col-span-2 p-5 rounded-2xl bg-black/20 border border-white/10 text-white outline-none focus:border-cyan-400 resize-none"
        />

        {isEditing &&
          editingProject.media?.length > 0 && (
            <div className="md:col-span-2">
              <p className="text-gray-300 mb-4">
                Current Media
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {editingProject.media.map(
                  (media) => (
                    <div
                      key={media.id}
                      className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden"
                    >
                      {media.media_type ===
                      "video" ? (
                        <video
                          src={media.media_url}
                          controls
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <img
                          src={media.media_url}
                          alt=""
                          className="w-full h-40 object-cover"
                        />
                      )}

                      {media.is_featured && (
                        <div className="px-4 py-2 bg-cyan-400 text-black text-sm font-bold">
                          Key media
                        </div>
                      )}

                      {!media.is_featured && (
                        <button
                          type="button"
                          onClick={() =>
                            setExistingFeaturedMedia(
                              media.id
                            )
                          }
                          className="w-full py-3 bg-cyan-400/90 hover:bg-cyan-400 transition text-black font-semibold"
                        >
                          Set As Key
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          deleteExistingMedia(
                            media.id
                          )
                        }
                        className="w-full py-3 bg-red-500/80 hover:bg-red-500 transition text-white font-semibold"
                      >
                        Delete Media
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        <div className="md:col-span-2">
          <label className="text-gray-300">
            Upload Photos / Videos
          </label>

          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelection}
            className="mt-3 w-full text-white"
          />

          <p className="mt-2 text-sm text-gray-400">
            Videos must be {MAX_VIDEO_SIZE_MB} MB or less. You can select multiple files.
          </p>
        </div>

        {selectedMedia.length > 0 && (
          <div className="md:col-span-2 space-y-4">
            <p className="text-gray-300">
              Choose key media for project top
            </p>

            {selectedMedia.map((item) => (
              <div
                key={item.key}
                className="bg-black/20 border border-white/10 rounded-2xl p-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
                  <label className="flex items-center gap-3 min-w-0">
                    <input
                      type="radio"
                      name="featured_media"
                      checked={
                        featuredUploadKey ===
                        item.key
                      }
                      onChange={() =>
                        setFeaturedUploadKey(
                          item.key
                        )
                      }
                    />
                    <span className="truncate">
                      {item.file.name}
                    </span>
                  </label>
                  <span>
                    {uploadProgress[item.key] ||
                      0}
                    %
                  </span>
                </div>

                <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all"
                    style={{
                      width: `${
                        uploadProgress[
                          item.key
                        ] || 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-2 py-5 rounded-2xl bg-cyan-400 text-black font-bold text-lg hover:scale-[1.02] transition duration-300 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : submitLabel}
        </button>
      </form>
    </div>
  );
}
