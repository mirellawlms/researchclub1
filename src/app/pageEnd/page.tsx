"use client";
import React from "react";

const EndPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Finale Fragen</h1>
      <div>
        <label className="block font-medium text-gray-700">
          Hast du dich während der Umfrage unter Stress gesezt gefühlt?
        </label>
        <div className="mt-2 flex space-x-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-md shadow-sm"
          >
            Ja
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded-md shadow-sm"
          >
            Nein
          </button>
        </div>
      </div>

      <div>
        <label className="block font-medium text-gray-700">
          Hast du auf den vorherigen Websiten auf coookies geachtet?
        </label>
        <div className="mt-2 flex space-x-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-md shadow-sm"
          >
            Ja
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded-md shadow-sm"
          >
            Nein
          </button>
        </div>
      </div>
      <div>
        <label className="block font-medium text-gray-700">
          Sind dir Datenschutzeinstellungen und Cookies wichtig?
        </label>
        <div className="mt-2 flex space-x-4">
          <button
            type="button"
            className="px-4 py-2 border rounded-md shadow-sm"
          >
            Ja
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded-md shadow-sm"
          >
            Nein
          </button>
        </div>
      </div>
      <hr></hr>
      <h1 className="text-2xl font-bold mb-4">Umfrage Ende</h1>
      <p className="mb-6">
        Vielen Dank, dass du an dieser Studie teilgenommen hast!
      </p>
      <div className="flex justify-center">
        <img src={"/pic1.png"} alt="picDanke" className="h-[25rem]" />
      </div>
    </div>
  );
};

export default EndPage;
