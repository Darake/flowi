import { makeStyles } from '@material-ui/core/styles';

export const useSharedStyles = makeStyles({
  dialogButtons: {
    marginTop: 'auto'
  },
  dialogForm: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  }
});

export default { useSharedStyles };
