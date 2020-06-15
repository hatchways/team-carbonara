const stylesOnBoarding = {
  paper: {
    width: '50%',
    height: '400px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  headRow: {
    display: 'flex',
    flexDirection: 'column',
    height: '5rem',
  },
  headContent: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    '& h2': {
      flex: '0 0 50%',
      alignSelf: 'center',
    },
  },
  //profile_settings
  urlField: {
    '& input': {
      borderLeft: '1px solid #eee',
      paddingLeft: '0.8rem',
    },
  },
  btnContainer: {
    margin: 'auto',
  },
  //connected
  connectedPage: {
    margin: '0 0 2rem 0',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    '& h3': {
      padding: '1rem 1rem 1rem 0',
      margin: '0.5rem 0 0 0',
      flexGrow: 1,
    },
    '& div': {
      padding: '1rem 1rem 1rem 1.5rem',
      margin: '0.5rem 0 0 0',
      flexGrow: 1,
      '& span': {
        fontWeight: 'bold',
      },
    },
  },
  //availability
  hoursRow: {
    display: 'flex',
    flexDirection: 'row',
    '& span': {
      fontSize: '1rem',
      padding: ' 0 5% 0 5%',
      alignSelf: 'center',
    },
  },
  checkBoxGroup: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    '& label:last-child': {
      border: 'none',
    },
  },
  checkBoxLabel: {
    borderRight: '1px solid #eee',
    margin: '0px',
    padding: '0.2rem 0 0.5rem 0',
    flex: '0 0 14.28%',
  },
  checkBoxLabelLabel: {
    fontSize: '0.7rem',
  },
};

export default stylesOnBoarding;
