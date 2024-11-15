"use client";
import { loadCookiename, loadGeneral, update } from "./actions";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  // State für die Checkbox
  const [isChecked, setIsChecked] = useState(false);
  const [zeitDruck, setzeitDruck] = useState(false);
  // load
  const [loadTrackmate, setloadTrackmate] = useState(false);
  const [loadRawetc, setloadRawetc] = useState(false);
  const [loadTripogames, setloadTripogames] = useState(false);

  // Handler für Checkbox-Änderungen
  const handleCheckboxChange = async () => {
    const generalQID = localStorage.getItem("generalQID");
    setIsChecked(!isChecked); // Checkbox-Status ändern
    await update(
      {
        hinweis: true,
      },
      generalQID!
    );
  };

  useEffect(() => {
    const generalQID = localStorage.getItem("generalQID");
    loadGeneral(generalQID!).then((data) => {
      setIsChecked(data?.hinweis ?? false);
      setzeitDruck(data?.zeitdruck ?? false); //hier nimmt er aus localStorage den wert von zeitdruck
    });
  }, []);

  useEffect(() => {
    const generalQID = localStorage.getItem("generalQID");
    loadCookiename(generalQID!).then((data) => {
      setloadTrackmate(
        !!data.find((cookie) => cookie.cookiename === "TRACKMATE")
      ); //wird auf true gesetzt
      setloadRawetc(!!data.find((cookie) => cookie.cookiename === "RAWETC"));
      setloadTripogames(
        !!data.find((cookie) => cookie.cookiename === "TRIPOGAMES")
      );
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Fortschritt Umfrage
      </h1>

      <p className="mb-6 text-gray-700 text-center">
        Bitte klicke dich durch alle drei Webseiten und beantworte dort die
        Fragen.
      </p>
      {zeitDruck ? (
        <>
          <h2 className="font-semibold mb-2 text-lg text-gray-700">
            Gruppe A: ZEITDRUCK
          </h2>
          <p className="mb-6 text-gray-600">
            Du hast jeweils nur eine Minute Zeit, um die Fragen zu beantworten.
          </p>
        </>
      ) : (
        <>
          <h2 className="font-semibold mb-2 text-lg text-gray-700">
            Gruppe B: KEIN ZEITDRUCK
          </h2>
          <p className="mb-6 text-gray-600">
            Du hast soviel Zeit wie du möchtest
          </p>
        </>
      )}

      {/* Checkbox "Verstanden" */}
      <div className="mb-6">
        <label className="flex items-center text-gray-800">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange} // Checkbox-Status ändern
            className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            disabled={isChecked}
          />
          <span>Ich habe den Hinweis gelesen und verstanden</span>
        </label>
      </div>

      {/* Links werden nur anklickbar, wenn die Checkbox aktiviert ist */}
      <div className="space-y-2">
        <Link
          href="/page2"
          className={`block text-lg font-semibold underline ${
            isChecked && !loadTrackmate
              ? "text-blue-600 hover:text-blue-700"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={(e) => !isChecked || (loadTrackmate && e.preventDefault())}
        >
          TrackMate
        </Link>

        <Link
          href="/page3"
          className={`block text-lg font-semibold underline ${
            isChecked && !loadRawetc
              ? "text-blue-600 hover:text-blue-700"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={(e) => !isChecked || (loadRawetc && e.preventDefault())}
        >
          RAWetc
        </Link>

        <Link
          href="/page4"
          className={`block text-lg font-semibold underline ${
            isChecked && !loadTripogames
              ? "text-blue-600 hover:text-blue-700"
              : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={(e) => !isChecked || (loadTripogames && e.preventDefault())}
        >
          Tripogames
        </Link>

        <button
          type="submit"
          className={`py-2 px-4 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            loadTripogames && loadRawetc && loadTrackmate
              ? "bg-blue-500"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!loadTripogames || !loadRawetc || !loadTrackmate}
          onClick={() => {
            if (loadTripogames && loadRawetc && loadTrackmate) {
              window.location.href = "/pageEnd"; // Weiterleitung auf die gewünschte Seite
            }
          }}
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
