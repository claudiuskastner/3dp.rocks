import { useState } from "react";
import React from "react";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";

import ViewPage from "./components/view-page";
import Settings from "./components/settings/settings";
import ImagePage from "./components/images-page";
import NavBar from "./components/navigation";

import "./App.css";

import LITHO from "./litho.js";

import { a11yProps, TabPanel } from "./components/tab_panel";

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper elevation={2} className="App">
            {/* <link rel="script" ref="app.js" /> */}
            <Box className="container wrapper">
                <NavBar />
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Images" {...a11yProps(0)} />
                    <Tab label="Model" {...a11yProps(1)} />
                    <Tab label="Settings" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {/* <ImagePage /> */}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {/* <ViewPage /> */}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Settings />
                </TabPanel>
                <div className="push"></div>
            </Box>
        </Paper>
    );
}

export default App;
