"use client";
import { useEffect, useRef, useState } from "react";
import { loadGeneral, updateCookie } from "./actions";
import Image from "next/image";
import { Prisma } from "@prisma/client";

export default function Home() {
  const [zeitDruck, setzeitDruck] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const endTime = useRef(0);
  const [remainingTime, setRemainingTime] = useState(120 * 1000);
  const [isPageDimmed, setIsPageDimmed] = useState(false);

   // REMOVE?
   useEffect (() => {
    const generalQID = localStorage.getItem("generalQID");
    loadGeneral(generalQID!).then((data)=>{
      setzeitDruck(data?.zeitdruck ?? false) //hier nimmt er aus localStorage den wert von zeitdruck
    })
  }, []);

  //CookieHandling auf jeder Page
  const setCookieValue = async (params: Prisma.CookiesUpdateInput) => {
    const generalQID = localStorage.getItem("generalQID");
    await updateCookie(
      //params, id, cookiename
      params,
      generalQID!,
      "TRACKMATE"
    );
  };

  // Setzt Starttinme am anfang
  useEffect(() => {
    setCookieValue({
      startTime: new Date(),
    });
  }, []);

  // Timer-Logik
  useEffect(() => {
    endTime.current = Date.now() + 120 * 1000;
    const interval = setInterval(() => {
      const timeLeft = endTime.current - Date.now();
      setRemainingTime(timeLeft > 0 ? timeLeft : 0); // Timer darf nicht unter 0 fallen

      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsPageDimmed(true); // Seite ausgrauen
      }
    }, 1000); // Update jede Sekunde
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    //Banner wird nach 1,5 sec geladen
    setTimeout(() => {
      setShowBanner(true);
    }, 1500);
  }, []);

  const [selectedOptions, setSelectedOptions] = useState({
    essential: true,
    personalization: true,
    analytics: true,
    marketing: true,
    partnerSharing: true,
  });

  const [surveyAnswers, setSurveyAnswers] = useState({
    interfaceRating: "",
    understanding: "",
    userFriendliness: "",
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAccept = () => {
    console.log("Cookies accepted");
    setShowBanner(false); // Banner ausblenden
    setCookieValue({
      agree: new Date(),
    });
  };

  const handleReject = () => {
    console.log("Cookies rejected");
    setShowBanner(false); // Banner ausblenden
    setCookieValue({
      decline: new Date(),
    });
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setCookieValue({
      change: new Date(),
    });
  };

  const handleOptionChange = (event: any) => {
    const { name, checked } = event.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveSettings = () => {
    console.log("Selected options:", selectedOptions);
    setShowBanner(false);
  };

  const handleSurveyChange = (event: any) => {
    const { name, value } = event.target;
    setSurveyAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSurveySubmit = async () => {
    if (
      !surveyAnswers.interfaceRating ||
      !surveyAnswers.understanding ||
      !surveyAnswers.userFriendliness
    ) {
      setErrorMessage("Bitte alle Fragen ausfüllen.");
      return;
    }
    console.log("Survey submitted:", surveyAnswers);
    setSurveySubmitted(true);
    await setCookieValue({
      endTime: new Date(),
    });
    window.location.href = "/page1";
  };

  return (
    <div className="w-screen h-screen relative flex">
      
      {zeitDruck && (<>{/* Ausgrau-Overlay nach Ablauf des Timers */}
      {isPageDimmed && (
        <div className="fixed inset-0 bg-gray-800 opacity-100 z-30 pointer-events-none"></div>
      )}

      {/* Timer-Banner */}
      <div className="bg-white w-80 h-auto fixed right-4 top-1/4 p-4 rounded-lg shadow-lg z-50">
        <div className="text-2xl font-bold text-red-500 mb-4">
          Zeit verbleibend:
          <br />
          {Math.floor(remainingTime / 1000)} Sekunden
        </div>
      </div></>)}
      

      {/* Hintergrunddimmer für das Cookie-Banner */}
      {showBanner && <div className="fixed inset-0 bg-black opacity-50 z-40" />}

      {/* Cookie-Banner */}
      {showBanner && (
        <div
          className="w-3/5 max-w-md h-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-lg shadow-lg border border-gray-300 z-50 p-4"
          style={{ backgroundColor: "rgb(50, 25, 60)" }}
        >
          {showDetails ? (
            <>
              <h3 className="font-bold text-lg mb-4 text-white text-center">
                Cookie-Einstellungen
              </h3>
              <p className="text-white text-center text-sm mb-4">
                Bitte überprüfe die Cookie-Einstellungen und wähle deine
                bevorzugten Optionen. Alle Kategorien sind standardmäßig
                ausgewählt, um dir das beste Nutzererlebnis zu bieten.
              </p>
              <div
                className="w-full text-left mb-4 text-white overflow-y-scroll"
                style={{ maxHeight: "200px" }}
              >
                <div className="flex items-start mb-2">
                  <input
                    type="checkbox"
                    name="essential"
                    checked={selectedOptions.essential}
                    onChange={handleOptionChange}
                    disabled
                    className="mr-2"
                  />
                  <label>
                    <strong>Essentiell</strong> – Diese Technologien sind
                    erforderlich, um die Kernfunktionalität der Website zu
                    aktivieren.
                  </label>
                </div>
                <div className="flex items-start mb-2">
                  <input
                    type="checkbox"
                    name="personalization"
                    checked={selectedOptions.personalization}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label>
                    <strong>Personalisierung</strong> – Ermöglicht uns, deine
                    Präferenzen zu speichern und personalisierte Inhalte
                    anzuzeigen.
                  </label>
                </div>
                <div className="flex items-start mb-2">
                  <input
                    type="checkbox"
                    name="analytics"
                    checked={selectedOptions.analytics}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label>
                    <strong>Analyse & Statistik</strong> – Hilft uns, das
                    Nutzerverhalten zu analysieren und die Webseite zu
                    verbessern.
                  </label>
                </div>
                <div className="flex items-start mb-2">
                  <input
                    type="checkbox"
                    name="marketing"
                    checked={selectedOptions.marketing}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label>
                    <strong>Marketing</strong> – Ermöglicht gezielte Werbung,
                    die auf deine Interessen abgestimmt ist.
                  </label>
                </div>
                <div className="flex items-start mb-2">
                  <input
                    type="checkbox"
                    name="partnerSharing"
                    checked={selectedOptions.partnerSharing}
                    onChange={handleOptionChange}
                    className="mr-2"
                  />
                  <label>
                    <strong>Datenweitergabe an Partner</strong> – Teilen von
                    Daten mit Partnern außerhalb der EU, die möglicherweise
                    keinen EU-ähnlichen Datenschutz bieten.
                  </label>
                </div>
                <button
                  onClick={handleReject}
                  className="text-gray-500 text-xs underline w-1/3 mx-2 text-left"
                >
                  Ablehnen
                </button>
              </div>

              {/* Buttons für Aktionen */}
              <div className="flex justify-between w-full mt-4">
                <button
                  onClick={handleAccept}
                  className="bg-green-500 text-white py-2 px-6 rounded-full text-lg font-bold w-full mx-2"
                >
                  Akzeptieren
                </button>
                <button
                  onClick={toggleDetails}
                  className="text-gray-500 text-xs underline w-1/3 mx-2 text-left"
                >
                  Zurück
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-white text-xl font-bold mb-4 text-center">
                Cookies und Nutzerlebnis
              </p>
              <p className="text-white text-center px-2 mb-6 text-sm">
                Für ein verbessertes Nutzererlebnis nutzen wir Cookies und
                andere moderne Technologien, um dir auf dich zugeschnittene
                Inhalte bereitzustellen, deine Website-Interaktionen zu
                optimieren und dir personalisierte Empfehlungen zu geben. Zudem
                ermöglichen diese Technologien wichtige Funktionen und helfen
                uns, Statistiken über das Nutzerverhalten zu sammeln, um unsere
                Dienste stetig zu verbessern. Durch deinen Klick auf
                „Akzeptieren“ hilfst du uns, dir ein noch besseres Erlebnis zu
                bieten und stimmst gleichzeitig der Verarbeitung dieser Daten
                zu. Dies beinhaltet unter Umständen auch die Weitergabe an
                unsere sorgfältig ausgewählten Drittanbieter, inklusive Partnern
                in Ländern außerhalb der EU, die nicht immer das gleiche
                Datenschutzniveau wie die EU bieten. Mehr Informationen dazu
                findest du in unserer Datenschutzerklärung. Beachte, dass du die
                Cookie-{" "}
                <button onClick={toggleDetails} className="underline">
                  Einstellungen
                </button>{" "}
                jederzeit anpassen kannst, jedoch könnte dies die Funktionalität
                und das Nutzererlebnis auf unserer Website beeinträchtigen.
              </p>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAccept}
                  className="text-white py-2 px-4 rounded-full transition duration-200"
                  style={{ backgroundColor: "green" }}
                >
                  Zustimmen
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Umfrage-Komponente */}
      {!showBanner && !surveySubmitted && (
        <div className="bg-white w-80 h-auto fixed right-4 bottom-4 p-4 rounded-lg shadow-lg z-40">
          <h2 className="text-xl font-bold mb-4">Umfrage</h2>
          {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Wie hat dir das Interface-Design gefallen?
              </label>
              <select
                name="interfaceRating"
                value={surveyAnswers.interfaceRating}
                onChange={handleSurveyChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Bitte wählen</option>
                <option value="schlecht">Schlecht</option>
                <option value="gut">Gut</option>
                <option value="sehr gut">Sehr gut</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Konntest du verstehen, um was es auf der Seite ging?
              </label>
              <select
                name="understanding"
                value={surveyAnswers.understanding}
                onChange={handleSurveyChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Bitte wählen</option>
                <option value="ja">Ja</option>
                <option value="nein">Nein</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Wie benutzerfreundlich würdest du die Seite einschätzen?
              </label>
              <select
                name="userFriendliness"
                value={surveyAnswers.userFriendliness}
                onChange={handleSurveyChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="">Bitte wählen</option>
                <option value="sehr benutzerfreundlich">
                  Sehr benutzerfreundlich
                </option>
                <option value="benutzerfreundlich">Benutzerfreundlich</option>
                <option value="kaum benutzerfreundlich">
                  Kaum benutzerfreundlich
                </option>
              </select>
            </div>
            <button
              onClick={handleSurveySubmit}
              className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200"
            >
              Weiter
            </button>
          </div>
        </div>
      )}
      {/* Iframe für den Inhalt */}
      <iframe
        className="w-full h-full border-none"
        src="https://willemsmirellamw.wixsite.com/trackmate"
      ></iframe>
    </div>
  );
}
