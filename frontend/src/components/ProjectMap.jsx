import {

  GoogleMap,

  Marker,

  InfoWindow,

  useJsApiLoader,

} from "@react-google-maps/api";

import {

  useEffect,

  useState,

} from "react";

import client from "../api/client";

export default function ProjectMap() {

  const [projects, setProjects] =
    useState([]);

  const [selectedProject,
    setSelectedProject] =
    useState(null);

  const { isLoaded } =
    useJsApiLoader({

      googleMapsApiKey:
        import.meta.env
          .VITE_GOOGLE_MAPS_API_KEY,
    });

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

  const center = {

    lat: 26.8467,

    lng: 80.9462,
  };

  if (!isLoaded) {

    return (

      <div className="h-[700px] flex items-center justify-center text-2xl">

        Loading Map...

      </div>
    );
  }

  return (

    <div className="rounded-[40px] overflow-hidden border border-[#E5E5E5]">

      <GoogleMap

        mapContainerStyle={{

          width: "100%",

          height: "700px",
        }}

        center={center}

        zoom={6.5}

        options={{

          disableDefaultUI: true,

          zoomControl: true,

          mapTypeControl: false,

          streetViewControl: false,

          fullscreenControl: false,

          colorScheme: "LIGHT",
        }}
      >

        {projects.map((project) => (

          <Marker

            key={project.id}

            position={{

              lat: Number(
                project.latitude
              ),

              lng: Number(
                project.longitude
              ),
            }}

            onClick={() =>
              setSelectedProject(project)
            }
          />
        ))}

        {/* INFO WINDOW */}

        {selectedProject && (

          <InfoWindow

            position={{

              lat: Number(
                selectedProject.latitude
              ),

              lng: Number(
                selectedProject.longitude
              ),
            }}

            onCloseClick={() =>
              setSelectedProject(null)
            }
          >

            <div className="max-w-[250px]">

              {selectedProject.media
                ?.length > 0 && (

                <img
                  src={
                    selectedProject
                      .media[0]
                      .media_url
                  }
                  alt=""
                  className="w-full h-[140px] object-cover rounded-xl"
                />
              )}

              <h2 className="mt-4 text-xl font-bold text-[#171A20]">

                {selectedProject.title}

              </h2>

              <p className="mt-2 text-sm text-[#5C5E62]">

                {
                  selectedProject.description
                }

              </p>

              <div className="mt-4 flex justify-between text-sm text-[#171A20]">

                <span>

                  {
                    selectedProject.capacity
                  }

                </span>

                <span>

                  {
                    selectedProject.location
                  }

                </span>

              </div>

            </div>

          </InfoWindow>
        )}

      </GoogleMap>

    </div>
  );
}