import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { connect } from 'react-redux'
import { viewProfile, viewProjects } from '../actionCreators'



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function Navigation(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            List
          </Typography>
          <Typography variant="h6" noWrap>
             Preview
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <List>
            <ListItem onClick={props.viewProjects}button key="Projects">
              {/* <ListItemIcon> <InboxIcon /> </ListItemIcon> */}
              <ListItemText primary="Projects" />
            </ListItem>

            <ListItem onClick={props.viewProfile} button key="Profile">
              {/* <ListItemIcon> <InboxIcon /> </ListItemIcon> */}
              <ListItemText primary="Profile" />
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
        profileSelected: state.profileSelected
    }
}

export default connect(mapStateToProps, { viewProfile, viewProjects }) (Navigation)

