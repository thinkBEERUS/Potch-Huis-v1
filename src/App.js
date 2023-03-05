import Dashboard from "./Home/Dashboard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
//import Reports from "./Reports/Reports";
import Members from "./Members/Members";
import Stock from "./Stock/Stock";
import Menu from "./Menu/MenuStock";
import DocumentList from "./Auth/Document";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import Topbar from "./Layout/Topbar";
import Sidebar from "./Layout/Sidebar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  if (
    location.pathname === "/" ||
    location.pathname === "/Potch-Huis/" ||
    location.pathname === "/Register" ||
    location.pathname === "/DocumentList"
  ) {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div id="app" className="app">
            <Sidebar isSidebar={isSidebar} show={false} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} show={false} />
              <Routes>
                <Route index element={<Login />} />
                <Route path="Register" element={<Register />} />
                <Route path="Dashboard" element={<Dashboard />} />
                {/* <Route path="Reports" element={<Reports />} /> */}
                <Route path="Members" element={<Members />} />
                <Route path="DocumentList" element={<DocumentList />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  } else {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div id="app" className="app">
            <Sidebar isSidebar={isSidebar} show={true} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} show={true} />
              <Routes>
                <Route index element={<Login />} />
                <Route path="Register" element={<Register />} />
                <Route path="Dashboard" element={<Dashboard />} />
                {/* <Route path="Reports" element={<Reports />} /> */}
                <Route path="Members" element={<Members />} />
                <Route path="Stock" element={<Stock />} />
                <Route path="Menu" element={<Menu />} />
                <Route path="DocumentList" element={<DocumentList />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
}

export default App;
