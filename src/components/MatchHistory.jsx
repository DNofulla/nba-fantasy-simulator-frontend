import React from "react";
import "../styles/LeagueNews.css";

const mockMatches = [
    {
      title: "Match 1",
      description:
        "Match 1 description in full details.",
    },
    {
      title: "Match 2",
      description:
        "Match 2 description in full details.",
    },
    {
      title: "Match 3",
      description:
        "Match 3 description in full details.",
    },
    {
      title: "Match 4",
      description:
        "Match 4 description in full details.",
    },
    {
      title: "Match 5",
      description:
        "Match 5 description in full details.",
    },
  ];
  
  function generateAllMockMatches() {
    let output = [];
  
    for (let i = 0; i < 5; i++) {
      output.push(
        <div className="news">
          <div className="news-inner">
            <h1 className="hTagLeagueNews">{mockMatches[i].title}</h1>
            <h3 className="hTagLeagueNews">{mockMatches[i].description}</h3>
          </div>
          {i !== 4 ? <hr className="hrTagLeagueNews" /> : null}
        </div>
      );
    }
    return <div className="newsBox">{output}</div>;
  }
  
  export default function MatchHistory() {
    return generateAllMockMatches();
  }
  