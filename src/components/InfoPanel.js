import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import { apiFetch } from '../Api/ApiFetch';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: '0 auto',
    marginTop: 50
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function InfoPanel() {
  const classes = useStyles();

  //const [summary, setSummary] = useState([])

  useEffect( () => {
    const apiData = async () => {
      const useFetch = await fetch("https://who-covid-19-data.p.rapidapi.com/api/data");
      const apiResponse = await useFetch.json();
      console.log(apiResponse);
    };
    
    apiData()
  }, [])



  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} elevation={3}>Grid 1</Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} elevation={3}>Grid 2</Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper} elevation={3}>Grid 2</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
