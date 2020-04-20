import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import { Typography, Paper, Button, Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStylesUpgrade from './stylesUpgrade';
import handleFetchErrors from '../../utils/handleFetchErrors';

function Upgrade({ subscriber, sub }) {
  const classes = useStylesUpgrade();

  function removeSubscription() {
    fetch(`http://localhost:3001/api/subscription/remove/${sub}`)
      .then(handleFetchErrors)
      .then((res) => {
        console.log('unsubscribed');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={classes.upgradeContainer}>
      <header>
        <Typography className={classes.headerTitle} align="center" variant="h4">
          Upgrade Plan
        </Typography>
        <Typography className={classes.headerSub} align="center" variant="subtitle1">
          You are on the free basic plan.
        </Typography>
      </header>
      <main className={classes.plansContainer}>
        <Paper className={classes.plan} elevation={6}>
          <div className={classes.pricing}>
            <div>
              <Typography align="center" variant="h5">
                Basic
              </Typography>
              <Typography align="center" variant="subtitle1">
                $0/month
              </Typography>
            </div>
            {subscriber ? (
              <Button onClick={removeSubscription} size="large" className={classes.basicBtn} variant="outlined">
                Unsubscribe
              </Button>
            ) : (
              <Button size="large" className={classes.basicBtn} variant="outlined">
                Your Plan
              </Button>
            )}
          </div>
          <Divider />
          <div className={classes.planDetails}>
            <ul>
              <li className={classes.listEle}>Single Event Type</li>
            </ul>
          </div>
        </Paper>
        <Paper className={classes.plan} elevation={6}>
          <div className={classes.premPricing}>
            <div>
              <Typography align="center" variant="h5">
                Premium
              </Typography>
              <Typography align="center" variant="subtitle1">
                $5/month
              </Typography>
            </div>
            {subscriber ? (
              <Button size="large" className={classes.premBtn} variant="outlined">
                Your Plan
              </Button>
            ) : (
              <Link to="/dashboard/user/upgrade/checkout">
                <Button size="large" className={classes.premBtn} variant="contained">
                  Upgrade
                </Button>
              </Link>
            )}
          </div>
          <Divider />
          <div className={classes.planDetails}>
            <ul>
              <li className={classes.listEle}>Unlimited Event Type</li>
              <li className={classes.listEle}>Group Meetings</li>
            </ul>
          </div>
        </Paper>
      </main>
    </div>
  );
}

export default withTheme(Upgrade);
