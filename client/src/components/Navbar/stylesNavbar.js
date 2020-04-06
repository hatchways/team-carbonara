import { makeStyles } from '@material-ui/core/styles';

const useStylesNavbar = makeStyles((theme) => ({
  navbar: {
    boxShadow: `3px 3px 5px ${theme.palette.secondary.main}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem 5rem',
    '& span': {
      color: theme.palette.primary.main,
    },
    '& div': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.2rem',
      '& nav': {
        marginRight: '5rem',
        '& :last-child': {
          color: theme.palette.primary.light,
        },
      },
    },
  },
  link: {
    margin: '0 1rem',
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-around',
    '& span': {
      marginLeft: '1rem',
      color: 'black',
      fontWeight: 'bold',
    },
  },
  '@media (max-width: 1280px)': {
    navbar: {
      padding: '1.5rem 2rem',
      '& div': {
        '& nav': {
          marginRight: '2rem',
        },
      },
    },
  },
  '@media (max-width: 880px)': {
    navbar: {
      justifyContent: 'space-around',
      '& div': {
        '& nav': {
          marginRight: '2rem',
        },
      },
    },
  },
  '@media (max-width: 800px)': {
    navbar: {
      padding: '2rem 0',
      '& h1': {
        display: 'none',
      },
      '& div': {
        '& nav': {
          marginRight: '0',
        },
      },
    },
    profile: {
      '& > *, div': {
        display: 'none',
      },
    },
  },
}));

export default useStylesNavbar;
