import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const useStyles = makeStyles({
  root: {
    width: 300,
    // flexGrow: 1,
  },
});

export default function Stepper(props) {
  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(0);

  const renderSwitch = (status) => {
    switch(status) {
      case 'Not Started':
        return 0;
      case 'In Progress':
        return 1;
      case 'Edits Needed':
        return 2;
      case 'Approved':
        return 3;
      default:
        return 0;
    }
  }

  return (
    <MobileStepper
      variant="progress"
      steps={4}
      position="static"
      activeStep={renderSwitch(props.post.attributes.status)}
      className={classes.root}
    />
  );
}
