import React from 'react';

interface ConfirmButtonProps {
  text: string;
  onClick: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ text, onClick }) => (
  <p className='text-button' onClick={onClick}>{text}</p>
);

export default ConfirmButton;