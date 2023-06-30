import React from "react";
import { ToggleButtonGroup } from "@mui/material";

function PlannerViewSelector(props) {
  return (
    <ToggleButtonGroup
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform">
      <ToggleButton value="web">TimeBlock List</ToggleButton>
      <ToggleButton value="android">Day View</ToggleButton>
      <ToggleButton value="ios">Month View</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default PlannerViewSelector;