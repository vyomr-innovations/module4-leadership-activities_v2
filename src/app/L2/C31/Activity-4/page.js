"use client";

import './page.css';

import Slider from './components/Slider'


export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headingContainer" id="headingContainer">
        <h1 className="mainHeading">
          Conflict Role-Play
        </h1>
      </div>
      <hr />
      <center>
        <Slider />
      </center>

    </div>
  );
}
