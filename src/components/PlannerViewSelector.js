import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

function PlannerViewSelector() {
  return (
    <ToggleButtonGroup
      color="secondary"
      aria-label="Platform">
      <ToggleButton value="web">TimeBlock List</ToggleButton>
      <ToggleButton value="android">TimeTable</ToggleButton>
      <ToggleButton value="ios">Month View</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default PlannerViewSelector;