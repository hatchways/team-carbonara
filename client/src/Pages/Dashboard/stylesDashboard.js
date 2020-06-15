import { makeStyles } from '@material-ui/core/styles';

const useStylesDashboard = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  subHeader: {
    padding: '3rem 15rem 0 15rem',
    flex: '0 1 auto',
  },
  dashBody: {
    flex: '2 0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3rem 0',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    '& :first-child': {
      marginLeft: '1.5rem',
      fontWeight: 'bold',
    },
    '& :last-child': {
      marginLeft: '1.5rem',
      color: 'grey',
    },
  },
  addEventBtn: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  getStartedBtn: {
    borderRadius: '32px',
    padding: '1rem 2rem',
    margin: '9rem -7rem 0 0',
    float: 'right',
    background: theme.palette.primary.main,
    color: 'white',
  },
  events: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  '@media (max-width: 1680px)': {
    subHeader: {
      padding: '2rem 10rem 0 10rem',
    },
  },
  '@media (max-width: 1280px)': {
    subHeader: {
      padding: '2rem 5rem 0 5rem',
    },

    getStartedBtn: {
      margin: '9rem -3rem 0 0',
    },
  },
  '@media (max-width: 1080px)': {
    events: {
      flexDirection: 'column',
    },
    subHeader: {
      padding: '2rem 10rem 0 10rem',
    },
    panelHeader: {
      padding: '3rem 5rem',
    },
    getStartedBtn: {
      margin: '3rem ',
    },
  },
  '@media (max-width: 880px)': {
    subHeader: {
      padding: '2rem 5rem 0 5rem',
    },
  },
  '@media (max-width: 650px)': {
    panelHeader: {
      flexDirection: 'column',
      padding: '1.5rem 5rem',
    },
    profileInfo: {
      marginBottom: '2rem',
    },
    profileContainer: {
      alignItems: 'flex-start',
    },
  },
  '@media (max-width: 500px)': {
    subHeader: {
      padding: '2rem 2rem 0 2rem',
    },
    panelHeader: {
      padding: '1.5rem 2rem',
    },
  },
}));

export default useStylesDashboard;
