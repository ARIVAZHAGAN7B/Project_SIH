import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your pages
import Home from "../pages/Home";
import About from "../pages/About";
import KolamAIGenerator from "../pages/KolamGenerator";
import Gallery from "../pages/KolamGallery";
import Pattern from "../pages/PatternRecognition";
import Rule from "../pages/RuleExtraction";
import RedrawKolam from "../pages/RedrawKolam";

// All routes centralized here
export const routes = [
  { path: "/", element: <Home />, label: "Home" },
  { path: "/generator", element: <KolamAIGenerator />, label: "Kolam Generator" },
  { path: "/redrawKolam", element: <RedrawKolam />, label: "Kolam Redraw" },
  { path: "/gallery", element: <Gallery />, label: "Gallery" },
  { path: "/pattern", element: <Pattern />, label: "Pattern" },
  { path: "/rule", element: <Rule />, label: "Rule" },
];

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRouter;
