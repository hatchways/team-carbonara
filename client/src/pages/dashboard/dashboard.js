import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import useStylesDashboard from './stylesDashboard';
import { withTheme } from '@material-ui/core/styles';
import { Tabs, Tab, Button, Avatar } from '@material-ui/core';
import DashPanel from '../../components/DashPanel/DashPanel';
import Event from '../../components/Event/Event';

function Dashboard() {
  const classes = useStylesDashboard();

  //Tracks active tab
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      <Navbar />
      <main className={classes.dashBody}>
        <div className={classes.subHeader}>
          <h1>My CalendApp</h1>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
            <Tab label="Event Types" />
            <Tab label="Scheduled Events" />
          </Tabs>
        </div>
        <DashPanel value={value} index={0}>
          <header className={classes.panelHeader}>
            <div className={classes.profileContainer}>
              <Avatar src="https://lh3.googleusercontent.com/-1f-lik6wjVI/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJMYmqRdLc1CHHPO_sJXKNQk8g7IXA/s96-c/photo.jpg" />
              <div className={classes.profileInfo}>
                <span>Raymond Lo</span>
                <span>calendapp.com/raymond-lo</span>
              </div>
            </div>
            <Button className={classes.addEventBtn} size="large" variant="outlined">
              + New Event Type
            </Button>
          </header>
          <section className={classes.events}>
            <Event meetingType={15} />
            <Event meetingType={30} />
            <Event meetingType={60} />
          </section>
          <Button size="large" variant="contained" className={classes.getStartedBtn}>
            Getting Started Guide
          </Button>
        </DashPanel>
      </main>
    </div>
  );
}

export default withTheme(Dashboard);
