import React, { useState, useEffect, useCallback } from 'react';
import Map from 'react-map-gl';

import DrawControl from '../draw-control';


const TOKEN = import.meta.env.VITE_MAPBOX_KEY;

const QueryComponent: React.FC = () => {

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

    return (
        <div className="query-container">
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
                    position="bottom-right"
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
        </div>
    );
};

export default QueryComponent;


