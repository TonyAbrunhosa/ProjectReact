import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SideBar from './SideBar';
import TopBar from './TopBar';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Main = (props:any) => {
  const classes = useStyles();

  const { children } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopBar />
      <SideBar />
      <main  className={classes.content}>
          <div className="container" style={{ marginTop: 45}}>
            {children}
          </div>
      </main>
    </div>
  );
}

Main.propTypes = {
    children: PropTypes.node
  };

export default Main;