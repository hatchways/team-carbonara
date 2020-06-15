import { makeStyles } from '@material-ui/core/styles';

const useStylesTimeSlot = makeStyles({
  container: {
    display: 'flex',
  },
  button: {
    flex: '1',
    width: '100%',
    border: '1px solid orange',
    fontWeight: 'bold',
    color: 'orange',
    height: '52px',
    backgroundColor: 'Transparent',
    borderRadius: '3px',
    fontSize: '1rem',
    margin: '5px',
    cursor: 'pointer',
    '&:hover': {
      border: '2px solid darkorange',
    },
    '&:focus': {
      outline: '0',
    },
  },
  confirmBtn: {
    flex: '1',
    margin: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    height: '52px',
    color: '#eee',
    backgroundColor: 'darkorange',
    borderRadius: '3px',
    border: 'none',
  },
});

export default useStylesTimeSlot;
