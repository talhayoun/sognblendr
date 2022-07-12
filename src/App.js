import "./App.css";
import { RecoilRoot, atom } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Join from "./pages/Join/Join";
import LogIn from "./pages/LogIn/LogIn";
import CreateDjAccount from "./pages/CreateDjAccount/CreateDjAccount";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import EventPlaylist from "./pages/EventPlaylist/EventPlaylist";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";
import EditPlaylist from "./pages/EditPlaylist/EditPlaylist";
import Settings from "./pages/Settings/Settigns";
import EditEvents from "./pages/EditEvents/EditEvents";
import Terms from "./pages/Terms/Terms";
import LogOut from "./pages/LogOut/LogOut";
import EventsList from "./pages/EventsList/EventsList";
import Party from "./pages/Party";
import SongsList from "./pages/SongsList";
import { ThankYouVote } from "./pages/ThankYouVote";
import { DjInfo } from "./pages/DjInfo";
import { DjListing } from "./pages/DjListing";
import { DjPlaylist } from "./pages/DjPlaylist";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <BurgerMenu />
          <Routes>
            {/* ------ DJ -------- */}
            <Route path="/" exact element={<Home />} />
            <Route path="/EventSList" exact element={<EventsList />} />
            <Route path="/Join" element={<Join />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/CreateDjAccount" element={<CreateDjAccount />} />
            <Route path="/djplaylist/:eventId" element={<DjPlaylist />} />
            <Route path="/EventPlaylist" element={<EventPlaylist />} />
            <Route path="/CreateEvent" element={<CreateEvent />} />
            <Route path="/CreatePlaylist" element={<CreatePlaylist />} />
            <Route path="/EditPlaylist" element={<EditPlaylist />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/EditEvents" element={<EditEvents />} />
            <Route path="/Terms" element={<Terms />} />
            <Route path="/LogOut" element={<LogOut />} />

            {/*  -----   Party  -------  */}
            <Route path="/Party" exact element={<Party />} />
            <Route path="/SongsList/:eventId" exact element={<SongsList />} />
            <Route path="/Thankyou/:id" exact element={<ThankYouVote />} />
            <Route path="/DjInfo/:djId" exact element={<DjInfo />} />
            <Route path="/DjListing" exact element={<DjListing />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
