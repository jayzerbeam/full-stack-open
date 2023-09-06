const Notification = ({ message, messageType }) => {
  let styles =
    messageType === "success" ? "notification-success" : "notification-error";

  return message === null ? null : (
    <div>
      <p className={`notification ${styles}`}>{message}</p>
    </div>
  );
};

export default Notification;
