import { makeStyles } from '@material-ui/core/styles';

const useStylesCalendar = makeStyles({
  calendarContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '5rem auto',
    width: '65%',
    height: '700px',
    maxWidth: '1100px',
  },
  calendar: {
    // flex: '1 0 auto',
    fontSize: '1.2rem',
    paddingRight: '2rem',
    '& h5': {
      marginBottom: '1.5rem',
      color: '#484848',
      fontWeight: 'bold',
    },
  },
  eventInfo: {
    width: '385px',
    // flex: '1 0 auto',
    padding: '1.5rem',
    '& h4': {
      color: '#484848',
      letterSpacing: '1px',
      fontWeight: 'bold',
    },
    '& h6': {
      color: 'gray',
      marginBottom: '0.5rem',
    },
  },
  duration: {
    color: 'grey',
    marginTop: '0.5rem',
    display: 'flex',
    '& p': {
      marginLeft: '0.5rem',
    },
  },
  selectDay: {
    display: 'flex',
    padding: '2rem 0 2rem 2rem',
  },
  meetingName: {
    textTransform: 'capitalize',
  },
  timezone: {
    width: '400px',
    padding: '1rem 0.4rem',
  },
  '@media (max-width: 1600px)': {
    eventInfo: {
      textAlign: 'center',
      width: '100%',
    },
    calendarContainer: {
      flexDirection: 'column',
      height: '100%',
      width: '50%',
    },
    duration: {
      justifyContent: 'center',
    },
    calendar: {
      paddingRight: '0',
    },
  },
  '@media (max-width: 1400px)': {
    calendarContainer: {
      width: '55%',
    },
  },
  '@media (max-width: 1260px)': {
    calendarContainer: {
      width: '70%',
    },
  },
  '@media (max-width: 1000px)': {
    calendarContainer: {
      width: '85%',
    },
  },
});

export default useStylesCalendar;
