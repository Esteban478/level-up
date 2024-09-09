interface ConfirmButtonProps {
  text: string;
  onClick: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ text, onClick }) => (
  <h2 className='text-button' onClick={onClick}>{text}</h2>
);

export default ConfirmButton;