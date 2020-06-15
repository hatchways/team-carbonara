import { makeStyles } from '@material-ui/core/styles';

const useStylesDashPanel = makeStyles((theme) => ({
  panelContainer: {
    background: theme.palette.secondary.light,
    padding: '0 15rem',
    fontSize: '1.1rem',
    flex: '1 1 auto',
  },
  '@media (max-width: 1680px)': {
    panelContainer: {
      padding: '0 10rem',
    },
  },
  '@media (max-width: 1280px)': {
    panelContainer: {
      padding: '0 5rem',
    },
  },
  '@media (max-width: 880px)': {
    panelContainer: {
      padding: '0',
    },
  },
}));

export default useStylesDashPanel;
