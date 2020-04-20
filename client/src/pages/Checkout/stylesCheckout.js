import { makeStyles } from '@material-ui/core/styles';

const useStylesCheckout = makeStyles((theme) => ({
  checkoutContainer: {
    flex: '1 1 auto',
    boxShadow: 'inset 0 15px 15px -20px #305490',
    background: theme.palette.secondary.light,
  },
  checkout: {
    width: '450px',
    height: '450px',
    margin: '5rem auto',
    padding: '2rem 3rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  successMessage: {
    color: 'green',
    marginTop: '0.5rem',
  },
  checkoutText: {
    '& h4': {
      color: 'orange',
      marginBottom: '1rem',
      fontWeight: 'bold',
    },
  },
  cardForm: {
    display: 'flex',
    flexDirection: 'column',
    '& label': {
      marginBottom: '1rem',
      fontSize: '0.75rem',
      fontWeight: 'bold',
    },
  },
  cardInput: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '5px',
  },
  submitBtn: {
    background: theme.palette.purple.main,
    color: 'white',
    border: 'none',
    '&:hover': {
      background: theme.palette.purple.main,
    },
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStylesCheckout;
