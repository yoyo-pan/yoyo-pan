import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt: any;
function App() {
  const [showPrompt, togglePrompt] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      togglePrompt(true);
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });
  }, []);

  const onClick = () => {
    togglePrompt(false);
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Install PWA</button>
        {showPrompt && <div>Install!!!</div>}
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
