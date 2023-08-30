import React from 'react';
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa';

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