"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { mitZeitdruck, submit } from "./actions";

interface FormData {
  alter: string;
  geschlecht: string;
  studiengang: string;
  technischeAffinitaet: string;
  q1_1: string;
  q1_2: string;
  q1_3: string;
  q1_4: string;
  q1_5: string;
  q1_6: string;
  q1_7: string;
  q1_8: string;
  q1_9: string;
}

const questions = [
  "Ich beschäftige mich gern genauer mit technischen Systemen.",
  "Ich probiere gern die Funktionen neuer technischer Systeme aus.",
  "In erster Linie beschäftige ich mich mit technischen Systemen, weil ich muss.",
  "Wenn ich ein neues technisches System vor mir habe, probiere ich es intensiv aus.",
  "Ich verbringe sehr gern Zeit mit dem Kennenlernen eines neuen technischen Systems.",
  "Es genügt mir, dass ein technisches System funktioniert, mir ist es egal, wie oder warum.",
  "Ich versuche zu verstehen, wie ein technisches System genau funktioniert.",
  "Es genügt mir, die Grundfunktionen eines technischen Systems zu kennen.",
  "Ich versuche, die Möglichkeiten eines technischen Systems vollständig auszunutzen.",
];

const inverted = [false, false, true, false, false, true, false, false, true];

const WelcomePage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange", // Validate fields as user interacts
    defaultValues: {
      alter: "",
      geschlecht: "",
      studiengang: "",
      technischeAffinitaet: "",
      q1_1: "",
      q1_2: "",
      q1_3: "",
      q1_4: "",
      q1_5: "",
      q1_6: "",
      q1_7: "",
      q1_8: "",
      q1_9: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const zeitdruck = await mitZeitdruck();
    const responses = await submit({
      age: Number(data.alter),
      sex: data.geschlecht,
      selfAss: data.technischeAffinitaet,
      study: data.studiengang,
      q1: Number(data.q1_1),
      q2: Number(data.q1_2),
      q3: Number(data.q1_3),
      q4: Number(data.q1_4),
      q5: Number(data.q1_5),
      q6: Number(data.q1_6),
      q7: Number(data.q1_7),
      q8: Number(data.q1_8),
      q9: Number(data.q1_9),
      qAnswer: 0,
      zeitdruck: zeitdruck,
      hinweis: false,
    });
    localStorage.setItem("generalQID", responses.id);
    localStorage.setItem("zeitdruck", zeitdruck? "true" : "false");
    window.location.href = "/page1";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Willkommen zur Umfrage</h1>
      <p className="mb-6">
        Vielen Dank, dass du an dieser Studie teilnimmst. Ich möchte
        herausfinden, wie nutzerfreundlich verschiedene Webseiten wahrgenommen
        werden. Aber zu Beginn habe ich ein paar Fragen an dich. Bitte fülle
        alles aus und klicke dann auf weiter!
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-lg font-bold mb-4">
          Fragen zur Interaktion mit technischen Systemen:
        </h2>

        {questions.map((question, index) => (
          <div key={index}>
            <label className="block font-medium text-gray-700">
              {question}
            </label>
            <Controller
              name={`q1_${index + 1}` as keyof FormData}
              control={control}
              rules={{ required: "Dieses Feld ist erforderlich" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Bitte auswählen
                  </option>
                  <option value={inverted[index] ? 6 : 1}>
                    Stimmt gar nicht
                  </option>
                  <option value={inverted[index] ? 5 : 2}>
                    Stimmt weitgehend nicht
                  </option>
                  <option value={inverted[index] ? 4 : 3}>
                    Stimmt eher nicht
                  </option>
                  <option value={inverted[index] ? 3 : 4}>Stimmt eher</option>
                  <option value={inverted[index] ? 2 : 5}>
                    Stimmt weitgehend
                  </option>
                  <option value={inverted[index] ? 1 : 6}>Stimmt völlig</option>
                </select>
              )}
            />
            {errors[`q1_${index + 1}` as keyof FormData] && (
              <p className="text-red-500 text-sm">
                {errors[`q1_${index + 1}` as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}

        <h2 className="text-lg font-bold mb-4">Allgemeine Fragen:</h2>

        <div>
          <label className="block font-medium text-gray-700">Alter:</label>
          <Controller
            name="alter"
            control={control}
            rules={{
              required: "Alter ist erforderlich",
              min: { value: 18, message: "Mindestalter ist 18" },
              max: { value: 99, message: "Höchstalter ist 99" },
            }}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          />
          {errors.alter && (
            <p className="text-red-500 text-sm">{errors.alter.message}</p>
          )}
        </div>

        {/* Geschlecht */}
        <div>
          <label className="block font-medium text-gray-700">Geschlecht:</label>
          <Controller
            name="geschlecht"
            control={control}
            rules={{ required: "Geschlecht ist erforderlich" }}
            render={({ field }) => (
              <select
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Bitte auswählen
                </option>
                <option value="Männlich">Männlich</option>
                <option value="Weiblich">Weiblich</option>
                <option value="Divers">Divers</option>
              </select>
            )}
          />
          {errors.geschlecht && (
            <p className="text-red-500 text-sm">{errors.geschlecht.message}</p>
          )}
        </div>

        {/* Technische Affinität */}
        <div>
          <label className="block font-medium text-gray-700">
            Wie technisch affin würdest du dich selber einschätzen?
          </label>
          <Controller
            name="technischeAffinitaet"
            control={control}
            rules={{ required: "Technische Affinität ist erforderlich" }}
            render={({ field }) => (
              <select
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Bitte auswählen
                </option>
                <option value="Niedrig">Niedrig</option>
                <option value="Mittel">Mittel</option>
                <option value="Hoch">Hoch</option>
              </select>
            )}
          />
          {errors.technischeAffinitaet && (
            <p className="text-red-500 text-sm">
              {errors.technischeAffinitaet.message}
            </p>
          )}
        </div>

        {/* Studiengang */}
        <div>
          <label className="block font-medium text-gray-700">
            Studiengang:
          </label>
          <Controller
            name="studiengang"
            control={control}
            rules={{ required: "Studiengang ist erforderlich" }}
            render={({ field }) => (
              <select
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Bitte auswählen
                </option>
                <option value="Technischer Studiengang">
                  Technischer Studiengang
                </option>
                <option value="Sozialer Studiengang">
                  Sozialer Studiengang
                </option>
                <option value="Kein Studium">Kein Studium</option>
              </select>
            )}
          />
          {errors.studiengang && (
            <p className="text-red-500 text-sm">{errors.studiengang.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          Weiter
        </button>
      </form>
    </div>
  );
};

export default WelcomePage;
