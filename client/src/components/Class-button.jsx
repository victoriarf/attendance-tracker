import React from "react";
import {Button, Checkbox, FormControlLabel} from "@mui/material";
import './Class-button.css';

export const ClassButton = (props) => {
  return (
      <>
        <Button className="classButton" variant='contained' size={"medium"}> {props.userClass.name}</Button>
        <FormControlLabel control={<Checkbox
            color='default'
            className='classCheckbox'
            size={"large"}/>}
            label=''
            checked={props.isChecked}
            onChange={props.onCheckboxChange}/>
      </>
  )
}

export default ClassButton
