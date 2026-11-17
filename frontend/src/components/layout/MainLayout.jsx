
import { useState } from "react";
import { Outlet } from "react-router";

import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        abierto={menuAbierto}
        cerrarMenu={() => setMenuAbierto(false)}
      />

      <div className="main-wrapper">
        <Header
          abrirMenu={() => setMenuAbierto(true)}
        />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
