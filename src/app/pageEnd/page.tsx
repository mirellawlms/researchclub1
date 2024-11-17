"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const EndPage = () => {
  const { control } = useForm(); // Nur `control` verwenden, ohne `handleSubmit`

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Finale Fragen</h1>
      {/* Frage 1 */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Hast du dich während der Umfrage unter Stress gesetzt gefühlt?
        </label>
        <Controller
          name="stressGefuehlt"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Bitte auswählen
              </option>
              <option value="Ja">Ja</option>
              <option value="Nein">Nein</option>
            </select>
          )}
        />
      </div>

      {/* Frage 2 */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Hast du auf den vorherigen Websites auf Cookies geachtet?
        </label>
        <Controller
          name="cookiesBeachtet"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Bitte auswählen
              </option>
              <option value="Ja">Ja</option>
              <option value="Nein">Nein</option>
            </select>
          )}
        />
      </div>

      {/* Frage 3 */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">
          Sind dir Datenschutzeinstellungen und Cookies wichtig?
        </label>
        <Controller
          name="datenschutzWichtig"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Bitte auswählen
              </option>
              <option value="Ja">Ja</option>
              <option value="Nein">Nein</option>
            </select>
          )}
        />
      </div>

      <hr className="my-6" />
      <h1 className="text-2xl font-bold mb-4">Umfrage Ende</h1>
      <p className="mb-6">
        Vielen Dank, dass du an dieser Studie teilgenommen hast!
      </p>
      <div className="flex justify-center mb-6">
        <img src={"/pic1.png"} alt="picDanke" className="h-[25rem]" />
      </div>
    </div>
  );
};

export default EndPage;
