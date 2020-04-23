import { makeStyles } from '@material-ui/core/styles';

const useStylesUpgrade = makeStyles((theme) => ({
  upgradeContainer: {
    background: theme.palette.secondary.light,
    flex: '1 1 auto',
    boxShadow: `inset 0 15px 15px -20px #305490`,
    '& header': {
      margin: '5rem 0 1rem',
      '& h5': {
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        color: '',
      },
      '& h6': {
        color: 'darkgray',
        marginTop: '0.5rem',
      },
    },
  },
  plansContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  plan: {
    width: '400px',
    margin: '2rem',
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    '& a': {
      margin: '0 auto',
    },
  },
  basicBtn: {
    borderColor: 'orange',
    color: 'orange',
    width: '150px',
    margin: '0 auto',
  },
  planDetails: {
    textAlign: 'center',
    flex: '1',
    '& ul': {
      listStyle: 'none',
      padding: '0',
    },
  },
  pricing: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    flex: '3',
    '& div': {
      '& h5': {
        color: theme.palette.purple.main,
        fontWeight: 'bold',
      },
      '& h6': {
        fontWeight: 'bold',
      },
    },
  },
  premPricing: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    flex: '3',
    '& div': {
      '& h5': {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
      },
      '& h6': {
        fontWeight: 'bold',
      },
    },
  },
  premBtn: {
    color: 'white',
    margin: '0 auto',
    background: theme.palette.primary.main,
    width: '150px',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default useStylesUpgrade;
