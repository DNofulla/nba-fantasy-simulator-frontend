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

  function changeCheckedState(value) {
    setIsChecked(!value);
  }

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
        <div style={{ fontSize: "25px", marginBottom: "10px" }}>{name}</div>

        <div style={{ fontSize: "20px", marginBottom: "5px" }}>
          {average2Pointers} Two Pointers
        </div>
        <div style={{ fontSize: "20px", marginBottom: "5px" }}>
          {average3Pointers} Three Pointers
        </div>
        <div style={{ fontSize: "20px", marginBottom: "5px" }}>
          {averageAssists} Assists
        </div>
        <div style={{ fontSize: "20px", marginBottom: "5px" }}>
          {averageFreeThrows} Free Throws
        </div>
        <div style={{ fontSize: "20px", marginBottom: "5px" }}>
          {averageBlocks} Blocks
        </div>
        <div style={{ fontSize: "20px", marginBottom: "5px" }}>
          {averageRebounds} Rebounds
        </div>
        <div style={{ fontSize: "20px", marginBottom: "5px" }}>
          {averageSteals} Steals
        </div>

        <div
          style={{ fontSize: "20px", marginBottom: "5px", color: "#82c0cc" }}>
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
              let val = 0;
              if (rankingPoints > 100) {
                val = 100;
              } else {
                val = rankingPoints;
              }

              console.log("ID1");
              console.log(id);
              setIsChecked(!isChecked);
              const PlayerDataChecked = {
                id: id,
                name: name,
                rp: -val,
                count: 1,
              };
              console.log(PlayerDataChecked.id);

              const PlayerDataUnChecked = {
                id: id,
                name: name,
                rp: val,
                count: -1,
              };
              console.log(val);
              if (isChecked) {
                onChange(PlayerDataChecked);
              } else {
                onChange(PlayerDataUnChecked);
              }
            }}>
            Select Player
          </Checkbox>
        </div>
      ) : null}
    </div>
  );
}
