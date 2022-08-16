import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({ label, options, getValue }) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      fullWidth
      onChange={(e, value) => {
        getValue(value.value);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
