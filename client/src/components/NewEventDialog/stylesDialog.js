import { makeStyles } from '@material-ui/core/styles';

const useStylesDialog = makeStyles((theme) => ({
  listContainer: {
    listStyle: 'none',
    margin: '2rem 0 1rem',
    padding: '0',
    cursor: 'pointer',
    '& li': {
      display: 'inline',
      padding: '1rem 2rem',
      border: '1px solid lightgrey',
      borderRight: 'none',
    },
    '& li:last-child': {
      borderRight: '1px solid lightgrey',
    },
  },
  desc: {
    display: 'inline-block',
  },
  eventField: {
    margin: '1rem 0',
  },
}));

export default useStylesDialog;
