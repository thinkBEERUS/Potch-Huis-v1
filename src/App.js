import Dashboard from "./Home/Dashboard";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
//import Reports from "./Reports/Reports";
import Members from "./Members/Members";
import Stock from "./Stock/Stock";
import Menu from "./Menu/MenuStock";
import DocumentList from "./Auth/DocumentList";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { useState } from "react";
import Topbar from "./Layout/Topbar";
import Sidebar from "./Layout/Sidebar";
import Donations from "./Donations/Donations";
import Password from "./Auth/Password";
import ConfirmedRequests from "./Requests/ConfirmedRequests";
import RequestedItems from "./Requests/RequestedItems";
import NonDisclosureAgreement from "./Auth/NonDisclosureAgreement";
import { AppState } from "./AppState";
import UnconfirmedRequests from "./Requests/UnconfirmedRequests";
import NewRequestForm from "./Requests/NewRequestForm";
import Unconfirmed from "./Donations/Unconfirmed";
import Reporting from "./Members/Reporting";
import FAQPage from "./faq";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const [appState, setAppState] = useState({
    memberNumber: "0",
    requestNumber: "0",
  });

  if (
    location.pathname === "/" ||
    location.pathname === "/Login" ||
    location.pathname === "/Register" ||
    location.pathname === "/Password" ||
    location.pathname === "/DocumentList" ||
    location.pathname === "/NonDisclosureAgreement"
  ) {
    return (
      <AppState.Provider value={{ appState, setAppState }}>
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
                  <Route
                    path="NonDisclosureAgreement"
                    element={<NonDisclosureAgreement />}
                  />
                  <Route path="DocumentList" element={<DocumentList />} />
                  <Route path="Login" element={<Login />} />
                  <Route path="Password" element={<Password />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AppState.Provider>
    );
  } else {
    return (
      <AppState.Provider value={{ appState, setAppState }}>
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
                  <Route path="Unconfirmed" element={<Unconfirmed />} />
                  {/* <Route path="Requests" element={<Requests />} /> */}
                  <Route path="RequestedItems" element={<RequestedItems />} />
                  <Route path="Reporting" element={<Reporting />} />
                  <Route path="faq" element={<FAQPage />} />
                  <Route path="NewRequestForm" element={<NewRequestForm />} />
                  <Route
                    path="ConfirmedRequests"
                    element={<ConfirmedRequests />}
                  />
                  <Route
                    path="UnconfirmedRequests"
                    element={<UnconfirmedRequests />}
                  />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AppState.Provider>
    );
  }
}

export default App;
