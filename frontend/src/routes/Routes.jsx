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
import {KolamEditor} from "../components/KolamEditor";
import KolamAnalysis from "../pages/KolamAnalysis";
import RangoliCard from "../components/RangoliCard";

// All routes centralized here
export const routes = [
  { path: "/", element: <Home />, label: "Home" },
  { path: "/kolam-generator", element: <KolamEditor />, label: "Kolam Generator" },
  { path: "/redraw-kolam", element: <RedrawKolam />, label: "Kolam Redraw" },
  { path: "/kolam-gallery", element: <Gallery />, label: "Gallery" },
  { path: "/pattern-recognition", element: <Pattern />, label: "Pattern" },
  { path: "/rule-extraction", element: <Rule />, label: "Rule" },
  {path: "/kolam-analysis", element: <KolamAnalysis />, label: "Kolam Analysis" },
  {path:"/about", element: <About />, label: "About" },
  {path:"/kolam-editor", element: <KolamEditor />, label: "Kolam Editor" },
  {path:"/rangoli",element:<RangoliCard/>, label: "Rangoli"},
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
