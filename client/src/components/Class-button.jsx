import React from "react";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import './Class-button.css';

export const ClassButton = (props) => {
  return (
      <>
        <Button className="classButton" variant='contained' size={"medium"}> {props.user.name}</Button>
        <FormControlLabel control={<Checkbox color='default' className='classCheckbox' size={"large"}/>}
            label=''/>
      </>
  )
}

export default ClassButton
