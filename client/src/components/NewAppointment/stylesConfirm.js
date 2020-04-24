const stylesConfirm = (theme) => ({
  paper: {
    width: '65%',
    height: '700px',
    maxWidth: '1000px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: '5rem auto',
  },
  backButton: {
    fontSize: '2rem',
    padding: '0',
    color: theme.palette.primary.light,
    marginBottom: '2rem',
  },
  name: {
    color: 'gray',
    letterSpacing: '1px',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  meetingName: {
    color: '#484848',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginBottom: '0.5rem',
  },
  meetingInfo: {
    flex: '0 0 35%',
    padding: '1.5rem',
    borderRight: '1px solid #eee',
  },
  meetingDuration: {
    color: 'gray',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    '& span': {
      marginLeft: '0.5rem',
      fontWeight: 'bold',
    },
  },
  eventDetails: {
    fontSize: '1rem',
    '& div': {
      padding: '0.2rem 0rem',
    },
  },
  eventTime: {
    color: theme.palette.purple.main,
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    display: 'flex',
    '& span': {
      marginLeft: '0.5rem',
    },
  },
  timeZone: {
    display: 'flex',
    color: 'gray',
    fontWeight: 'bold',
    '& span': {
      marginLeft: '0.5rem',
    },
  },
  form: {
    width: '66%',
  },
  confirmForm: {
    flex: '0 0 65%',
    padding: '1.5rem',
    flexDirection: 'column',
    '& div': {
      fontSize: '0.8rem',
      padding: '0.2rem 0',
    },
  },

  textField: {
    width: '100%',
  },
  textArea: {
    padding: '0.5rem',
    fontSize: '0.8rem',
    borderRadius: '5px',
    border: '1px solid #bbb',
    width: '100%',
    outline: 'none',
    '&:hover': {
      border: '1px solid black',
    },
    '&:focus': {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  button: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    color: '#eee',
    fontSize: '1rem',
    textTransform: 'none',
    padding: '0.5rem 1rem',
    margin: '1rem 0 0.5rem 0',
  },
  '@media (max-width: 1080px)': {
    paper: {
      flexDirection: 'column',
      position: 'relative',
      height: '100%',
    },
    backButton: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
    },
    meetingInfo: {
      flex: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderBottom: '1px solid #ccc',
      '& h1, & h4': {
        margin: '0.2rem 0',
      },
    },
    eventDetails: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      '& div': {
        padding: '0 1rem',
      },
    },
    confirmForm: {
      flex: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  '@media (max-width: 600px)': {
    eventDetails: {
      flexDirection: 'column',
      alignItems: 'left',
      '& div': {
        padding: '0 0.5rem',
      },
    },
    form: {
      width: '90%',
    },
  },
});

export default stylesConfirm;
