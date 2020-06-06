import { makeStyles } from '@material-ui/core/styles';

const useStylesConfirmed = makeStyles({
  paper: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: '10rem auto',
    width: '600px',
    height: '400px',
  },
  textContainer: {
    display: 'flex',
    paddingLeft: '4rem',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  headerText: {
    '& h4': {
      color: '#484848',
      marginBottom: '0.5rem',
    },
    '& p': {
      marginBottom: '1rem',
    },
  },
  meetingIcon: {
    height: '23px',
    width: '23px',
    borderRadius: '50%',
    background: 'darkorange',
  },
  durationContainer: {
    display: 'flex',
    '& h5': {
      marginLeft: '0.5rem',
      textTransform: 'capitalize',
      fontWeight: '450',
    },
  },
  apptContainer: {
    display: 'flex',
    color: 'purple',
    marginTop: '0.5rem',
    '& h6': {
      marginLeft: '0.5rem',
    },
  },
  timezone: {
    display: 'flex',
    color: 'gray',
    marginTop: '0.5rem',
    '& h6': {
      marginLeft: '0.5rem',
    },
  },
});

export default useStylesConfirmed;
