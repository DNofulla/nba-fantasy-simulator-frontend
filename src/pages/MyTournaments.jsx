import React from "react";
import TeamInformation from "../components/TeamInformation";
import TournamentChat from "../components/TournamentChat";
import MatchHistory from "../components/MatchHistory";
import NavBar from "../components/NavBar";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

export default function MyTournaments() {
  return (
    <div className="MyTournaments">
      <NavBar />
        <Tabs variant='enclosed' size='lg'>
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'rgb(10, 53, 66)', shadow: 'none' }} 
                _hover={{ color: 'lightseagreen' }}
                >Match History</Tab>
            <Tab _selected={{ color: 'white', bg: 'rgb(10, 53, 66)', shadow: 'none' }} 
                _hover={{ color: 'lightseagreen' }}
                >Team Stats</Tab>
            <Tab _selected={{ color: 'white', bg: 'rgb(10, 53, 66)', shadow: 'none' }} 
                _hover={{ color: 'lightseagreen' }}
                >Tournament Chat</Tab>
          </TabList>

          <TabPanels>
              <TabPanel eventKey='matchhistory' title='Match History'>
                <MatchHistory />
              </TabPanel>
              <TabPanel eventKey='TeamInformation' title='Team Information'>
                <TeamInformation />
              </TabPanel>
              <TabPanel eventKey='tournamentchat' title='Tournament Chat'>
                <TournamentChat />
              </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
  );
}
