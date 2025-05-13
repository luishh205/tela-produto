import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
   
      <div className="text-2xl font-bold text-600">
        ShopEasy
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center gap-4 text-gray-600">
        <button className="hover:text-blue-600">
          🛒
        </button>
        <button className="hover:text-blue-600">
          👤
        </button>
      </div>
    </header>
  );
}
