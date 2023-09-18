import * as React from 'react';
import { useState, useCallback } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import Map from 'react-map-gl';


import DrawControl from '../draw-control';


const TOKEN = 'pk.eyJ1IjoidGhlYnVsbDg4OCIsImEiOiJjbGx1d3IwczkxN3B6M2tvNzl5Zmp5YjQ5In0.hEjTjZYKx4lsvUQhnaajqw';

const DrawComponent: React.FC = () => {
    const [features, setFeatures] = useState({});
    const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

    const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

    return (<div className="query-container flex flex-col justify-end">
        <Map
            initialViewState={{
                longitude: 102.08,
                latitude: 14.97,
                zoom: 16
            }}

            mapStyle="mapbox://styles/mapbox/satellite-v9"
            mapboxAccessToken={TOKEN}
        >
            <DrawControl
                position="top-left"
                displayControlsDefault={false}
                controls={{
                    polygon: true,
                    trash: true
                }}
                defaultMode="draw_polygon"
                onCreate={onUpdate}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </Map>
        {/* <ControlPanel polygons={Object.values(features)} /> */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" >
            <button className="btn bg-opacity-20 hover:bg-opacity-50 border-2 btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white"><FaLongArrowAltRight size="3em" /></button>
        </div>
    </div>
    );
}
export default DrawComponent;