import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa';
import Map from 'react-map-gl';

import DrawControl from '../draw-control';
import ControlPanel from './control-panel';

const TOKEN = 'pk.eyJ1IjoidGhlYnVsbDg4OCIsImEiOiJjbGx1d3IwczkxN3B6M2tvNzl5Zmp5YjQ5In0.hEjTjZYKx4lsvUQhnaajqw';

const LoginComponent: React.FC = () => {

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
        <div className="query-container flex flex-col justify-end ">
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
            <ControlPanel />
            <div className="absolute w-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">

                <div className="hero-content w-full flex-col  bg-white  border-2 border-white rounded-lg  bg-opacity-10 p-0">
                    <div className="card  w-4/6">
                        <div className="card-body text-white">
                            <div className="text-center mx-auto">
                                <img src="images/avatar.svg" width="100px" height="100px" />
                            </div>
                            <div className="form-control py-2">
                                <input type="text" placeholder="email" className="input input-bordered bg-opacity-30 placeholder-white" />
                            </div>
                            <div className="form-control py-2">
                                <input type="text" placeholder="password" className="input input-bordered bg-opacity-30 placeholder-white" />
                            </div>
                            <div className="form-control py-2">
                                <input type="text" placeholder="Geographical coordinates of your land" className="input input-bordered bg-opacity-30 placeholder-white" />
                            </div>

                        </div>
                    </div>
                    <div className="border-t-2 border-white w-full h-0 bg-white my-0"></div>
                    <div className="form-control mt-8 mb-12 w-2/5">
                        <Link className="btn bg-opacity-20 hover:bg-opacity-50 border-2 btn-xs sm:btn-sm md:btn-md lg:btn-lg text-white" to="/draw">
                            <FaLongArrowAltRight size="3em" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginComponent;