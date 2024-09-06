interface NotificationProps {
    message: string;
    type: 'error' | 'success' | 'warning'| 'info';
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div className="error-message" role="alert">
      <p>Error: {message}</p>
    </div>
  );
};

export default Notification;