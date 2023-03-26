import Dashboard from "./Home/Dashboard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
//import Reports from "./Reports/Reports";
import Members from "./Members/Members";
import Stock from "./Stock/Stock";
import Menu from "./Menu/MenuStock";
import MemberDonations from "./Members/MemberDonations";
import DocumentList from "./Auth/DocumentList";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import Topbar from "./Layout/Topbar";
import Sidebar from "./Layout/Sidebar";
import Donations from "./Donations/Donations";
import Confirmed from "./Donations/Confirmed";
import Password from "./Auth/Password";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();

  if (
    location.pathname === "/" ||
    location.pathname === "/Login" ||
    location.pathname === "/Register" ||
    location.pathname === "/Password" ||
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
                <Route path="DocumentList" element={<DocumentList />} />
                <Route path="Login" element={<Login />} />
                <Route path="Password" element={<Password />} />
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
                <Route index element={<Dashboard />} />
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Members" element={<Members />} />
                <Route path="Stock" element={<Stock />} />
                <Route path="Menu" element={<Menu />} />
                <Route path="Donations" element={<Donations />} />
                <Route path="Confirmed" element={<Confirmed />} />
                <Route path="MemberDonations" element={<MemberDonations />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
}

export default App;
