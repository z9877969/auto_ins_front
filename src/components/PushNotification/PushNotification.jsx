import { SnackbarS } from '../Alert/AlertMUIStyled';
import { AlertS } from './PushNotification.styled';

const PushNotification = ({ onClose, isOpen, type, message }) => {
  return (
    <SnackbarS
      open={isOpen}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <AlertS
        onClose={onClose}
        variant="outlined"
        severity={type}
        className={type}
      >
        {message}
      </AlertS>
    </SnackbarS>
  );
};

PushNotification.Error = (props) => (
  <PushNotification {...props} type={'error'} />
);
PushNotification.Info = (props) => (
  <PushNotification {...props} type={'info'} />
);
PushNotification.Warning = (props) => (
  <PushNotification {...props} type={'warning'} />
);
PushNotification.Success = (props) => (
  <PushNotification {...props} type={'success'} />
);

export default PushNotification;
