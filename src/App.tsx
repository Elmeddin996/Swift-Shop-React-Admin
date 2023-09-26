import React from "react";
import "./App.scss";
import { AdminRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import SidebarWithHeader from "./app/components/SideBar";

function App() {
  return (
    <BrowserRouter>
      <SidebarWithHeader />
      <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;
