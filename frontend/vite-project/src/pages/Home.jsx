import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to Safeland Café
      </h1>
      <p className="text-lg text-gray-600">
        Fresh coffee, delicious meals, and a cozy atmosphere crafted for every
        moment.
      </p>

      <div className="flex gap-4">
        <a
          href="/menu"
          className="px-6 py-3 bg-cyan-600 text-white rounded-full text-sm font-semibold transition hover:bg-cyan-700"
        >

        </a>
      </div>
    </div>
  );
}
