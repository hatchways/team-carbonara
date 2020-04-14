import { makeStyles } from '@material-ui/core/styles';

const useStylesEvent = makeStyles((theme) => ({
  eventsContainer: {
    width: '24%',
    height: '225px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 2rem 2rem 2rem',
    margin: '1rem',
  },
  eventDesc: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '1.5rem',
    flex: '4',
    '& h3': {
      margin: '0',
    },
    '& h6': {
      color: 'grey',
    },
  },
  settingsIcon: {
    color: 'lightgrey',
    marginTop: '1rem',
    float: 'right',
    marginRight: '-1rem',
  },
  linksContainer: {
    flex: '1',
    paddingTop: '1rem',
    margin: '0 -2rem',
    borderTop: `1px solid ${theme.palette.secondary.main}`,
    display: 'flex',
    justifyContent: 'space-around',
    '& div': {
      display: 'flex',
      alignItems: 'center',
      '& span': {
        marginLeft: '1rem',
      },
    },
  },
  linkButton: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },
  '@media (max-width: 1680px)': {
    eventsContainer: {
      width: '30%',
    },
  },
  '@media (max-width: 1080px)': {
    eventsContainer: {
      width: '65%',
      margin: '1.5rem auto',
    },
    linksContainer: {
      justifyContent: 'space-between',
      padding: '1rem 2rem 0 2rem',
    },
  },
  '@media (max-width: 500px)': {
    eventsContainer: {
      width: '80%',
    },
  },
}));

export default useStylesEvent;
