
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";

function App() {

  const [selectedTeam, setSelectedTeam] = useState("All");

  const matches = [
    {
      id: 1,
      team1: "CSK",
      team2: "MI",
      date: "20 April 2026",
      venue: "Wankhede Stadium",
      price: 1500
    },
    {
      id: 2,
      team1: "RCB",
      team2: "KKR",
      date: "22 April 2026",
      venue: "M. Chinnaswamy Stadium",
      price: 1200
    },
    {
      id: 3,
      team1: "SRH",
      team2: "DC",
      date: "24 April 2026",
      venue: "Rajiv Gandhi Stadium",
      price: 1000
    },
    {
      id: 4,
      team1: "RR",
      team2: "PBKS",
      date: "26 April 2026",
      venue: "Sawai Mansingh Stadium",
      price: 900
    }
  ];

  const filteredMatches =
    selectedTeam === "All"
      ? matches
      : matches.filter(
          (match) =>
            match.team1 === selectedTeam ||
            match.team2 === selectedTeam
        );

  return (
    <div>
      <Navbar />

      <Hero />

      <section className="matches" id="matches">

        <h2>IPL Match Schedule</h2>

        <div className="filter">
          <label>Filter Team: </label>

          <select
            value={selectedTeam}
            onChange={(e) =>
              setSelectedTeam(e.target.value)
            }
          >
            <option value="All">All Teams</option>
            <option value="CSK">CSK</option>
            <option value="MI">MI</option>
            <option value="RCB">RCB</option>
            <option value="KKR">KKR</option>
            <option value="SRH">SRH</option>
            <option value="DC">DC</option>
            <option value="RR">RR</option>
            <option value="PBKS">PBKS</option>
          </select>
        </div>

        <div className="match-container">

          {filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              team1={match.team1}
              team2={match.team2}
              date={match.date}
              venue={match.venue}
              price={match.price}
            />
          ))}

        </div>

      </section>

      <footer>
        <p>© 2026 IPL Ticket Booking. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;
