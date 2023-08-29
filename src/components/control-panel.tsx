import * as React from 'react';
import area from '@turf/area';

function ControlPanel(props) {
  // let polygonArea = 0;
  // for (const polygon of props.polygons) {
  //   polygonArea += area(polygon);
  // }

  return (
    <div className="absolute top-2 right-2 flex items-center">
      {/* <h3>Draw Polygon</h3>
      {polygonArea > 0 && (
        <p>
          {Math.round(polygonArea * 100) / 100} <br />
          square meters
        </p>
      )} */}

      <img src="/images/logo.svg" alt="Burger" />

      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-lg btn-square btn-ghost text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-12 h-12 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-gray-100 text-neutral-400">
            {/* Sidebar content here */}
            <li className="p-3 mt-5"><a className="text-lg ">About Us</a></li>
            <li className="p-3"><a className="text-lg ">Contact Us</a></li>
            <li className="p-3"><a className="text-lg ">Privacy Policy</a></li>
          </ul>
          <ul className="mt-auto mr-5 menu menu-horizontal  text-neutral-400 ">
            <li className=""><a className="underline">Facebook</a></li>
            <li className=""><a className="underline">Instagram</a></li>
            <li className=""><a className="underline">Linkedin</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ControlPanel);