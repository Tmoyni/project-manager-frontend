import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

const useStyles = makeStyles({
  root: {
    // maxWidth: 100%,
    flexGrow: 1,
  },
});

export default function Stepper(props) {
  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(0);

  const renderSwitch = (status) => {
    switch(status) {
      case 'not started':
        return 3;
      case 'In Progress':
        return 2;
      case 'Approved':
        return 4;
      default:
        return 4;
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
