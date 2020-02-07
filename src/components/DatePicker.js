import React, { Fragment, useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

function DatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
    
  return (
    <Fragment>
      <KeyboardDatePicker
        clearable
        value={selectedDate}
        placeholder="10/10/2020"
        onChange={date => handleDateChange(date)}
        minDate={new Date()}
        format="MM/dd/yyyy"
      />
    </Fragment>
  );
}

export default DatePicker;