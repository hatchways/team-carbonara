import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import OnBoardButton from '../../components/OnBoardButton';
import ProgressBar from '../../components/ProgressBar';

const pageStyle = (theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid grey',
    'border-radius': '5px',
    width: '500px',
  },
});

function ConnectedPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div>Your Google calendar is connected!</div>
      <ProgressBar />
      <div>Here's how CalendApp will work with [email]</div>
      <div>
        - We will check [email] for conflicts. <Link to="/profile_settings">Edit</Link>
      </div>
      <div>
        - We will add event to [email]. <Link to="/profile_settings">Edit</Link>
      </div>
      <OnBoardButton router={Link} link="/avail_settings" />
    </div>
  );
}

export default withStyles(pageStyle)(ConnectedPage);
