import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { options } from "../devdata";

export default function LimitTags({setProducts}) {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={options}
      getOptionLabel={(option) => option.type}
      defaultValue={[options[0]]}
      //   get values
      onChange={(event, values) => {
        setProducts(values);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Products"
          placeholder="Products"
          required
        />
      )}
      sx={{ width: "500px" }}
    />
  );
}
