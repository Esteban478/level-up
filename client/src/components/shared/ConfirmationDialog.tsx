import '../../styles/ConfirmationDialog.css';

interface ConfirmationDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        <p>{message}</p>
        <div className="confirmation-dialog-buttons">
          <button className="btn confirm-button" onClick={onConfirm}>Yes</button>
          <button className="btn cancel-button"onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;