import React, { useEffect, useState } from "react";
import "../styles/PlayerCard.css";
import { Checkbox, Progress, Image } from "@chakra-ui/core";

export default function PlayerCard({
  id,
  rankingPoints,
  name,
  pts2,
  pts3,
  asst,
  ft,
  b,
  rb,
  st,
  onChange,
  type,
  setActivePlayers,
  activePlayers,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [average2Pointers, setAverage2Pointers] = useState(0);
  const [average3Pointers, setAverage3Pointers] = useState(0);
  const [averageRebounds, setAverageRebounds] = useState(0);
  const [averageBlocks, setAverageBlocks] = useState(0);
  const [averageAssists, setAverageAssists] = useState(0);
  const [averageSteals, setAverageSteals] = useState(0);
  const [averageFreeThrows, setFreeThrows] = useState(0);

  useEffect(() => {
    setAverage2Pointers(pts2);
    setAverage3Pointers(pts3);
    setAverageAssists(asst);
    setFreeThrows(ft);
    setAverageBlocks(b);
    setAverageRebounds(rb);
    setAverageSteals(st);
  }, []);

  return (
    <div className="PlayerCard">
      <div className="PlayerImage">
        <Image
          size="100%"
          objectFit="fill"
          src={
            "https://cdn.nba.com/headshots/nba/latest/260x190/" + id + ".png"
          }
          alt="Tournament Image"
        />
      </div>

      <div className="PlayerDescription">
        <div style={{ fontSize: "1.4em", marginBottom: "10px" }}>{name}</div>

        <div style={{ fontSize: "1.1em", marginBottom: "5px" }}>
          {average2Pointers} Two Pointers
        </div>
        <div style={{ fontSize: "1.1em", marginBottom: "5px" }}>
          {average3Pointers} Three Pointers
        </div>
        <div style={{ fontSize: "1.1em", marginBottom: "5px" }}>
          {averageAssists} Assists
        </div>
        <div style={{ fontSize: "1.1em", marginBottom: "5px" }}>
          {averageFreeThrows} Free Throws
        </div>
        <div style={{ fontSize: "1.1em", marginBottom: "5px" }}>
          {averageBlocks} Blocks
        </div>
        <div style={{ fontSize: "1.1em", marginBottom: "5px" }}>
          {averageRebounds} Rebounds
        </div>
        <div style={{ fontSize: "1.1em", marginBottom: "5px" }}>
          {averageSteals} Steals
        </div>

        <div
          style={{ fontSize: "1.1em", marginBottom: "5px", color: "#82c0cc" }}>
          {rankingPoints > 100 ? 100 : rankingPoints} Ranking Points
        </div>
        <Progress
          borderRadius="15px"
          hasStripe
          isAnimated
          color="yellow"
          size="lg"
          m="auto"
          w="80%"
          value={rankingPoints > 100 ? 100 : rankingPoints}
        />
      </div>
      {type !== "NO" ? (
        <div className="CheckboxDivPCard">
          <Checkbox
            id={`player${id}`}
            size="lg"
            variantColor="yellow"
            defaultIsunChecked
            onChange={() => {
              setIsChecked(!isChecked);
              if (isChecked === true) {
                //setActivePlayers([...activePlayers, setActivePlayers]);
                onChange({
                  id: id,
                  name: name,
                  rp: rankingPoints,
                  type: "INCREASE",
                });
              } else {
                //const index = activePlayers.indexOf(id);
                //activePlayers.splice(index, 1);
                setActivePlayers(activePlayers);
                onChange({
                  id: id,
                  name: name,
                  rp: rankingPoints,
                  type: "DECREASE",
                });
              }
            }}>
            Select Player
          </Checkbox>
        </div>
      ) : null}
    </div>
  );
}
