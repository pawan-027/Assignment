import React from "react";
import Contactform from "./Components/Contactform";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Assignment</h1>
      </header>

      <Contactform />
    </div>
  );
}

export default App;