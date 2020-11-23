import Axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import userContext from "../services/userContext";
import "../styles/LeagueNews.css";

export default function LeagueNews() {
  const [announcements, setAnnouncements] = useState([]);
  const { userData, setUserData } = useContext(userContext);

  useEffect(() => {
    Axios.get(
      "http://localhost:8080/global/action/getAnnouncements/" +
        userData.user.id,
      {
        headers: {
          Authorization: "Bearer " + userData.token,
        },
      }
    ).then((res) => {
      setAnnouncements(res.data);
    });
  }, []);

  return (
    <div className="LeagueNews">
      <div className="AnnouncementsTitleSection">
        <h1 id="announcementsTitle">Announcements</h1>
      </div>

      <div className="InnerAnnouncementsDiv">
        {announcements.length === 0 ? (
          <div className="AnnouncementTab" style={{ color: "black" }}>
            <h1 id="announcementTabTitle">NO ANNOUNCEMENTS</h1>
            <h4 id="announcementTabDesc">NO ANNOUNCEMENTS</h4>
          </div>
        ) : (
          announcements.map((data, index) => (
            <div className="AnnouncementTab" style={{ color: "black" }}>
              <h1 id="announcementTabTitle">{data.title}</h1>
              <h4 id="announcementTabDesc">{data.description}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
