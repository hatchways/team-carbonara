const stylesForm = {
  loginHeader: {
    textAlign: 'center',
  },
  paper: {
    width: '30%',
    height: '350px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '1.5rem',
  },
  helpText: {
    marginTop: '1rem',
    textAlign: 'center',
    '& a': {
      color: 'orange',
    },
  },

  '@media (max-width: 600px)': {
    paper: {
      width: '85%',
    },
  },
  '@media (min-width: 601px)': {
    paper: {
      width: '55%',
    },
  },
  '@media (min-width: 700px)': {
    paper: {
      width: '400px',
    },
  },
};

export default stylesForm;
