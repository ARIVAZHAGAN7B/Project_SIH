import React from "react";
import Navbar from "./components/Navbar";
import AppRouter, { routes } from "./routes/Routes";

// import logo from "./assets/logo.png";

function App() {
  const handleHelpClick = () => {
    alert("Help button clicked!");
  };

  return (
    <>
      <Navbar
        // logo={logo}
        title="Kolam AI"
        navItems={routes}
        currentPage="Generator"
        userAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDZURIdfqcpAFiT-YtAEH4ALqwyVSdiHqgDD1gNmqwgT1vBywhoYU39yazwZfIPsTee496tAA3nVNjJj4FCy538qeVjb9QwElFCSk8r6yvFHtuFXkA_a-gfEuBFf-RyzEnzXds0AH-Lji-29RBVvwTrj7rhjlPZwHcVkeWsEmEkM5Rc_3h5zsa2f94NbfXc3RRjc-SkWIEddgsBcu1Pf9f1n2VJafe2k5O4LDB5mG17zIHF3kheiGGOt2aEOwUXcOZn9Sbj-umTXtw"
        onHelpClick={handleHelpClick}
      />
      <AppRouter />
    </>
  );
}

export default App;
