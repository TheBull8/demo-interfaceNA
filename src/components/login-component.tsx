import React, { useState } from 'react';
import {  FaLongArrowAltRight } from 'react-icons/fa';

import ControlPanel from './control-panel';

const LoginComponent: React.FC = () => {
    return (
        <div className="query-container flex flex-col justify-end pb-64">
            <ControlPanel />
            <div className="mx-auto w-3/6" >
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
                        <button className="btn btn-ghost text-white"><FaLongArrowAltRight size="3em" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;