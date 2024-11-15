"use client";
import React from "react";

const EndPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Umfrage Ende</h1>
      <p className="mb-6">
        Vielen Dank, dass du an dieser Studie teilgenommen hast! Hol dir gerne Deine Belohnung ab!
      </p>
      <div className="flex justify-center">
        <img src={"/pic1.png"} alt="picDanke" className="h-[25rem]" />
      </div>
    </div>
  );
};

export default EndPage;
