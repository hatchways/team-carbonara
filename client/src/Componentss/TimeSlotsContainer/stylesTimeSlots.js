import { makeStyles } from '@material-ui/core/styles';

const useStylesTimeSlots = makeStyles({
  timeSlotContainer: {
    minWidth: '250px',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '4.2rem',
    '& p': {
      margin: '0 0 1rem 0',
      fontSize: '1.1rem',
    },
  },
  btns: {
    overflowY: 'scroll',
    maxWidth: '250px',
    maxHeight: '650px',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    overflowY: 'hidden !important',
  },
});

export default useStylesTimeSlots;
