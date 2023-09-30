import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import Map, {
  NavigationControl,
  Layer,
  Source,
  Popup,
  Marker,
} from "react-map-gl";
import type { FillLayer } from "react-map-gl";

import DrawControl from "../draw-control";
import mapboxgl from "mapbox-gl";

const TOKEN = import.meta.env.VITE_MAPBOX_KEY;

interface PolygonData {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][];
  };
  properties: {
    name: string;
    description: string;
    timestamp: string;
    user: {
      id: number;
      name: string;
    };
    color: string;
    category: string;
    projection: string;
  };
}

const layerStyle: FillLayer = {
  id: "point",
  type: "fill",
  paint: {
    "fill-color": "#0000FF",
    "fill-opacity": 0.3,
  },
};
const layerStyle1: FillLayer = {
  id: "point1",
  type: "fill",
  paint: {
    "fill-color": "#00FFFF",
    "fill-opacity": 0.3,
  },
};
interface HoveredData {
  lat: number;
  lon: number;
  index: number;
}
interface ChildComponentProps {
  hoveredData: HoveredData | null;
  // ...other props
}

// const coordinates = [
//     [102.0835727024093, 14.972782907195878],
//     [102.08245690345836, 14.970274664701037],
//     [102.07771475791998, 14.971787905422005],
//     [102.07804735183862, 14.967714568737605],
//     [102.08642657280194, 14.966201299252418],
//     [102.08680208206363, 14.968139526055339],
//     [102.08907659530837, 14.971476966420795],
//     [102.08406622886764, 14.969321110264545],
//     [102.08406622886764, 14.97056487607854],
//     [102.08506401062186, 14.971860457791223],
// ];

const QueryComponent: React.FC<ChildComponentProps> = ({ hoveredData }) => {
  console.log("hoveredData in QueryComponent:", hoveredData);
  const [features, setFeatures] = useState<PolygonData[]>();
  const [showPopup, setShowPopup] = useState<boolean>(true);
  // const [markerColors, setMarkerColors] = useState(new Array(coordinates.length).fill('red'));
  const [confirmationData, setConfirmationData] = useState(null);

  const markerRef = useRef<mapboxgl.Marker>();

  const popup = useMemo(() => {
    return new mapboxgl.Popup().setText("Hello world!");
  }, []);

  const generatePolygonData = (jsonData: any): PolygonData | null => {
    const feature = Object.values(jsonData)[0] as {
      id: string;
      type: string;
      geometry: {
        type: string;
        coordinates: number[][];
      };
      properties: Record<string, unknown>;
    };

    if (!feature) {
      return null;
    }

    return {
      type: feature.type,
      geometry: feature.geometry,
      properties: {
        name: "Central Park",
        description:
          "A sample polygon representing a part of Central Park in New York City.",
        timestamp: "2023-09-19T12:34:56Z",
        user: {
          id: 123,
          name: "John Doe",
        },
        color: "#00FF00",
        category: "Park",
        projection: "EPSG:4326",
      },
    };
  };

  const sendVertices = async (
    polygonData: PolygonData
  ): Promise<any | null> => {
    const url = "https://bot-j3so72lbva-uc.a.run.app/find-trees";
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(polygonData),
      });

      if (response.ok) {
        const result = await response.json();
        return result.answer;
      } else {
        console.error(`Request failed with status code ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error("Request error:", error);
      return null;
    }
  };

  const onUpdate = useCallback((e) => {
    setConfirmationData(e);
    const modal = document.getElementById("my_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  }, []);

  const handleConfirm = useCallback(() => {
    if (confirmationData) {
      setFeatures((currFeatures) => {
        const newFeatures = { ...currFeatures };
        for (const f of confirmationData.features) {
          newFeatures[f.id] = f;
        }
        const data = generatePolygonData(newFeatures);
        if (data) {
          sendVertices(data);
        } else {
          console.log("Invalid JSON data or missing feature ID.");
        }

        return newFeatures;
      });
    }
  }, [confirmationData]);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  const handleConsole = () => {
    console.log("FEATURES", features);
  };

  return (
    <>
      <div className="query-container relative">
        <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm</h3>
            <p className="py-4">Are you sure wish to tokenize this area?</p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-primary text-white mr-3 w-24"
                  onClick={() => handleConfirm()}
                >
                  Yes
                </button>
                <button className="btn w-24">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* <button className='btn btn-primary fixed top-32 right-16 z-20' onClick={() => handleConsole()} >Delete</button> */}

        <Map
          initialViewState={{
            longitude: 12.4,
            latitude: 17.8,
            zoom: 2,
          }}
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxAccessToken={TOKEN}
        >
          {/* {coordinates.map((coords, index) => (
                        <Marker key={index} longitude={coords[0]} latitude={coords[1]}
                            color={markerColors[index]}
                            ref={markerRef} />
                    ))} */}
          <NavigationControl position="bottom-right" />
          <DrawControl
            position="bottom-right"
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true,
              point: true,
            }}
            defaultMode="draw_polygon"
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          {/* {showPopup && (
                    <Popup longitude={102.08} latitude={14.97}
                    anchor="bottom"
                    onClose={() => setShowPopup(false)}>
                    You are here
                    </Popup>)}
                    <Source id="my-data" type="geojson" data={geojson}>
                    <Layer  {...layerStyle} />
                    </Source>
                    <Source id="my-data1" type="geojson" data={geojson1}>
                    <Layer {...layerStyle1} />
                </Source> */}
        </Map>
        {/* <ControlPanel /> */}
        {/* <div className="absolute w-1/2 bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="text-center pt-5 flex-col justify-center">
                {inputFocused && (
                    <div
                    className="overflow-auto border-2 bg-opacity-30 bg-white rounded-tl-lg rounded-tr-lg border-white border-b-0 w-full mx-auto h-[32rem] px-10 pt-3 pb-5">
                    <button
                    onClick={() => setInputFocused(false)}
                    className="chat chat-end btn bg-opacity-20 hover:bg-opacity-50 border-2 btn-md  ml-auto text-white px-auto items-center flex justify-center"><FaAngleDown size="2rem" /></button>
                    {messages.map((message, index) => (
                        <ChatMessage
                        key={index}
                        sender={message.isBot ? 'start' : 'end'}
                        content={message.text}
                        
                        />
                        ))}
                        <div className="chat chat-start hidden">
                        <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                        <img src="/images/logo.svg" />
                        </div>
                        </div>
                        <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                        </div>
                        
                        </div>
                        )}
                        <div className="flex justify-center">
                        <div className={containerStartSpanClass}><FaSearch size="2em" /></div>
                        <input type="text" placeholder="Type in your question "
                        onFocus={handleInputFocus}
                        onKeyDown={handleInputKeyDown}
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                        className="text-white input input-bordered rounded-none w-2/3 input-lg query-input border-white border-2 bg-opacity-30 placeholder-white" />
                        <div className={containerEndSpanClass}>
                        <button className="btn btn-ghost">
                        <FaMicrophone size="2em" />
                        </button>
                        <button className="btn btn-ghost">
                        <FaUpload size="2em" />
                        </button>
                        </div>
                        </div>
                        <Link className="btn bg-opacity-20 hover:bg-opacity-50 border-2 btn-md text-white w-1/12 mx-auto mt-5" to="/login">
                        <FaLongArrowAltRight size="3em" />
                    </Link>
                    </div>
                </div> */}
      </div>
    </>
  );
};

export default QueryComponent;
