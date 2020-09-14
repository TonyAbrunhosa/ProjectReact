import React, { forwardRef, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconPeople from '@material-ui/icons/People';
import IconAgenda from '@material-ui/icons/CalendarToday'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mostrarOcultarMensagem } from '../../../store/Menu/menuReducer'
import { nomeProgramaTopBar } from '../../../store/Menu/menuReducer'
import { NavLink as RouterLink } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const pages = [
  //{
    //title: 'Agenda',
    //href: '/Agenda',
    //icon: <IconAgenda />
  //},
  {
    title: 'Cliente',
    href: '/Cliente',
    icon: <IconPeople />
  }
];

const CustomRouterLink = forwardRef((props:any, ref:any) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const  SideBar = (props:any) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.openSideBar,
          [classes.drawerClose]: !props.openSideBar,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.openSideBar,
            [classes.drawerClose]: !props.openSideBar,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={e => props.mostrarOcultarMensagem(false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {pages.map( pages => (
            <ListItem key={pages.title} button onClick={(e:any) => props.nomeProgramaTopBar(pages.title)} component={CustomRouterLink} to={pages.href}>
              <ListItemIcon>{pages.icon}</ListItemIcon>
              <ListItemText primary={pages.title} />
            </ListItem>
          ))}
        </List>       
      </Drawer>
      
    </div>
  );
}

const mapStateToProps = (state:any) => ({
    openSideBar: state.menu.mostrarMenuLateral
})

const mapDispatchToProps = (dispatch:any) => bindActionCreators({ mostrarOcultarMensagem,nomeProgramaTopBar }, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(SideBar)
