import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MainContainer from './MainContainer'
import { Route } from 'react-router-dom'
import UserProfile from '../components/UserProfile'
import PostCardContainer from './PostCardContainer'
import SignIn from '../components/SignIn'
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux'
import { handleViewClick } from '../actionCreators'
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link } from 'react-router-dom' 



const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function NavContainer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
          <Link to="/">
            <ListItem button key='projects'>
              <ListItemIcon><FolderOutlinedIcon /></ListItemIcon>
              <ListItemText primary='Projects' />
            </ListItem>
          </Link>
          <Link to="/profile">
            <ListItem button key='profile'>
              <ListItemIcon><PersonOutlineOutlinedIcon /></ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItem>
          </Link>
          <Link to="/signin">
            <ListItem button key='logOut'>
              <ListItemIcon> <ExitToAppOutlinedIcon /> </ListItemIcon>
              <ListItemText primary='Log Out' />
            </ListItem>
          </Link>
      </List>
      
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
          <MenuIcon />
          </IconButton>
          <Typography variant="button" noWrap>
            <Box margin="10px" display="inline" id="list" onClick={(e) => props.handleViewClick(e.target.id)}>
                List
            </Box>
            
            <Box margin="10px" display="inline" id="preview" onClick={(e) => props.handleViewClick(e.target.id)}>
                 Preview
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route exact path="/profile" render={(routerProps) => <UserProfile {...routerProps}/> } />
        <Route exact path="/" render={(routerProps) => <MainContainer {...routerProps}/> } />
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, { handleViewClick } ) (NavContainer)