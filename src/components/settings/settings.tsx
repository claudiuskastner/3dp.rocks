import { Box, FormControl, FormControlLabel, FormGroup, Slider, Switch, Tab, Tabs, Typography } from "@mui/material";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { a11yProps, TabPanel } from "../tab_panel";
import {
    ImageSettings,
    ModelSettings,
    DownloadSettings,
    defaultImageSettings,
    defaultModelSettings,
    defaultDownloadSettings,
} from "./types";

function Settings() {
    const [imageSettings, setImageSettings] = useState<ImageSettings>(defaultImageSettings);
    const [modelSettings, setModelSettings] = useState<ModelSettings>(defaultModelSettings);
    const [downloadSettings, setDownloadSettings] = useState<DownloadSettings>(defaultDownloadSettings);
    const [currentTab, setCurrentTab] = useState<number>(0);

    useEffect(() => {
        let localStoredImageSettings: string | null = localStorage.getItem("imageSettings");
        let localStoredModelSettings: string | null = localStorage.getItem("modelSettings");
        let localStoredDownloadSettings: string | null = localStorage.getItem("downloadSettings");

        if (localStoredImageSettings) {
            let imageSettings: ImageSettings = JSON.parse(localStoredImageSettings);
            setImageSettings(imageSettings);
        }

        if (localStoredModelSettings) {
            let modelSettings: ModelSettings = JSON.parse(localStoredModelSettings);
            setModelSettings(modelSettings);
        }

        if (localStoredDownloadSettings) {
            let downloadSettings: DownloadSettings = JSON.parse(localStoredDownloadSettings);
            setDownloadSettings(downloadSettings);
        }
    }, []);

    const handleImageSettingsChange = (event: ChangeEvent<HTMLInputElement>) => {
        let currentImageSettings: ImageSettings = imageSettings;
        switch (event.target.name) {
            case "mirrorImage":
                currentImageSettings.mirrorImage = event.target.checked;
                break;
            case "positiveImage":
                currentImageSettings.positiveImage = event.target.checked;
                break;
            case "flipImage":
                currentImageSettings.flipImage = event.target.checked;
                break;
            case "manualRefresh":
                currentImageSettings.manualRefresh = event.target.checked;
                break;
            case "mirrorRepeat":
                currentImageSettings.mirrorRepeat = event.target.checked;
                break;
            case "flipRepeat":
                currentImageSettings.flipRepeat = event.target.checked;
                break;
            case "repeatXCount":
                if (typeof event.target.value === "number") {
                    currentImageSettings.repeatXCount = event.target.value;
                }
                break;
            case "repeatYCount":
                if (typeof event.target.value === "number") {
                    currentImageSettings.repeatYCount = event.target.value;
                }
                break;
            default:
                break;
        }
        setImageSettings(currentImageSettings);
        let jsonImageSettings: string = JSON.stringify(currentImageSettings);
        localStorage.setItem("imageSettings", jsonImageSettings);
    };

    const handleImageSliderSettingsChange = (event: Event, value: number | number[]) => {
        let currentImageSettings: ImageSettings = imageSettings;
        if (!event.target) {
            return;
        }
        if (typeof value !== "number") {
            return;
        }
        switch (event.target.name) {
            case "repeatXCount":
                currentImageSettings.repeatXCount = value;
                break;
            case "repeatYCount":
                currentImageSettings.repeatYCount = value;
                break;
            default:
                break;
        }
        setImageSettings(currentImageSettings);
        let jsonImageSettings: string = JSON.stringify(currentImageSettings);
        localStorage.setItem("imageSettings", jsonImageSettings);
    };

    const handleModelSettingsChange = (event: Event, value: number | number[]) => {
        let currentModelSettings: ModelSettings = modelSettings;
        if (!event.target) {
            return;
        }
        if (typeof value !== "number") {
            return;
        }
        switch (event.target.name) {
            case "maximumSize":
                currentModelSettings.maximumSize = value;
                break;
            case "thickness":
                currentModelSettings.thickness = value;
                break;
            case "border":
                currentModelSettings.border = value;
                break;
            case "thinnestLayer":
                currentModelSettings.thinnestLayer = value;
                break;
            case "vectorsPerPixel":
                currentModelSettings.vectorsPerPixel = value;
                break;
            case "baseDepth":
                currentModelSettings.baseDepth = value;
                break;
            case "curve":
                currentModelSettings.curve = value;
                break;
            default:
                break;
        }
        setModelSettings(currentModelSettings);
        let jsonModelSettings: string = JSON.stringify(currentModelSettings);
        localStorage.setItem("modelSettings", jsonModelSettings);
    };

    const handleDownloadSettingsChange = (event: ChangeEvent<HTMLInputElement>) => {
        let currentDownloadSettings: DownloadSettings = downloadSettings;
        switch (event.target.name) {
            case "binaryStl":
                currentDownloadSettings.binaryStl = event.target.checked;
                break;
            case "manual":
                currentDownloadSettings.manual = event.target.checked;
                break;
            default:
                break;
        }
        setDownloadSettings(currentDownloadSettings);
        let jsonDownloadSettings: string = JSON.stringify(currentDownloadSettings);
        localStorage.setItem("downloadSettings", jsonDownloadSettings);
    };

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", width: "100%", height: "80vh" }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={currentTab}
                onChange={handleTabChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
            >
                <Tab label="Model" {...a11yProps(0)} />
                <Tab label="Image" {...a11yProps(1)} />
                <Tab label="Download" {...a11yProps(2)} />
                <Tab label="Help" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={currentTab} index={0}>
                {/* Model settings */}
                <FormControl variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Maximum size (mm)"
                                    onChange={handleModelSettingsChange}
                                    max={1000}
                                    min={1}
                                    defaultValue={modelSettings.maximumSize}
                                    name="maximumSize"
                                />
                            }
                            label="Maximum size (mm)"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Thickness (mm)"
                                    onChange={handleModelSettingsChange}
                                    max={50}
                                    step={0.1}
                                    min={1}
                                    defaultValue={modelSettings.thickness}
                                    name="thickness"
                                />
                            }
                            label="Thickness (mm)"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Border (mm)"
                                    onChange={handleModelSettingsChange}
                                    max={50}
                                    step={0.1}
                                    min={0}
                                    defaultValue={modelSettings.border}
                                    name="border"
                                />
                            }
                            label="Border (mm)"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Thinnest layer (mm)"
                                    onChange={handleModelSettingsChange}
                                    max={100}
                                    step={0.1}
                                    min={0.1}
                                    defaultValue={modelSettings.thinnestLayer}
                                    name="thinnestLayer"
                                />
                            }
                            label="Thinnest layer (mm)"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Vectors per pixel"
                                    onChange={handleModelSettingsChange}
                                    max={10}
                                    min={1}
                                    defaultValue={modelSettings.vectorsPerPixel}
                                    name="vectorsPerPixel"
                                />
                            }
                            label="Vectors per pixel"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Base depth"
                                    onChange={handleModelSettingsChange}
                                    max={50}
                                    min={-50}
                                    defaultValue={modelSettings.baseDepth}
                                    name="baseDepth"
                                />
                            }
                            label="Base depth"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Curve"
                                    onChange={handleModelSettingsChange}
                                    max={360}
                                    min={0}
                                    defaultValue={modelSettings.curve}
                                    name="curve"
                                />
                            }
                            label="Curve"
                        />
                    </FormGroup>
                </FormControl>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                {/* Image settings */}
                <FormControl variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={imageSettings.mirrorImage}
                                    onChange={handleImageSettingsChange}
                                    name="mirrorImage"
                                />
                            }
                            label="Mirror Image"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={imageSettings.flipImage}
                                    onChange={handleImageSettingsChange}
                                    name="flipImage"
                                />
                            }
                            label="Flip Image"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={handleImageSettingsChange}
                                    defaultChecked={imageSettings.positiveImage}
                                    name="positiveImage"
                                />
                            }
                            label="Positive Image"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={handleImageSettingsChange}
                                    defaultChecked={imageSettings.manualRefresh}
                                    name="manualRefresh"
                                />
                            }
                            label="Manual Refresh"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={handleImageSettingsChange}
                                    defaultChecked={imageSettings.mirrorRepeat}
                                    name="mirrorRepeat"
                                />
                            }
                            label="Mirror Repeat"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={handleImageSettingsChange}
                                    defaultChecked={imageSettings.flipRepeat}
                                    name="flipRepeat"
                                />
                            }
                            label="Flip Repeat"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Repeat X Count"
                                    onChange={handleImageSliderSettingsChange}
                                    max={50}
                                    min={1}
                                    defaultValue={imageSettings.repeatXCount}
                                    name="repeatXCount"
                                />
                            }
                            label="Repeat X count"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Slider
                                    aria-label="Repeat Y Count"
                                    onChange={handleImageSliderSettingsChange}
                                    max={50}
                                    min={1}
                                    defaultValue={imageSettings.repeatYCount}
                                    name="repeatXCount"
                                />
                            }
                            label="Repeat Y count"
                        />
                    </FormGroup>
                </FormControl>
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
                {/* Download settings */}
                <FormControl variant="standard">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={downloadSettings.binaryStl}
                                    onChange={handleDownloadSettingsChange}
                                    name="binaryStl"
                                />
                            }
                            label="Binary STL | ASCII STL"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked={downloadSettings.manual}
                                    onChange={handleDownloadSettingsChange}
                                    name="manual"
                                />
                            }
                            label="Manual Download | Download on refresh"
                        />
                    </FormGroup>
                </FormControl>
            </TabPanel>
            <TabPanel value={currentTab} index={3}>
                {/* Help */}
                <Typography>Example text</Typography>
            </TabPanel>
        </Box>
    );
}

export default Settings;
