import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/login";
import Join from "./pages/Join/Join";
import CreateDjAccount from "./pages/CreateDjAccount/CreateDjAccount";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import Settings from "./pages/settings/Settings";
import Terms from "./pages/Terms/Terms";
import EventsList from "./pages/EventsList/EventsList";
import Party from "./pages/party";
import SongsList from "./pages/songsList";
import { ThankYouVote } from "./pages/ThankYouVote";
import { DjInfo } from "./pages/dj";
import { DjListing } from "./pages/DjListing";
import { DjPlaylist } from "./pages/DjPlaylist";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {

  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <BurgerMenu />
          <Routes>
            {/* ------ DJ -------- */}
            <Route path="/" exact element={<Home />} />
            <Route
              path="/eventslist"
              exact
              element={
                <ProtectedRoute>
                  <EventsList />
                </ProtectedRoute>
              }
            />
            <Route path="/Join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/CreateDjAccount" element={<CreateDjAccount />} />
            <Route
              path="/djplaylist/:eventId"
              exact
              element={
                <ProtectedRoute>
                  <DjPlaylist />
                </ProtectedRoute>
              }
            />
            <Route path="/event" element={<CreateEvent />} />
            <Route
              path="/createEvent"
              exact
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              exact
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route path="/Terms" element={<Terms />} />

            {/*  -----   Party  -------  */}
            <Route path="/Party" exact element={<Party />} />
            <Route path="/SongsList/:eventId" exact element={<SongsList />} />
            <Route path="/Thankyou/:id" exact element={<ThankYouVote />} />
            <Route path="/dj/:eventId" exact element={<DjInfo />} />
            <Route path="/DjListing" exact element={<DjListing />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
