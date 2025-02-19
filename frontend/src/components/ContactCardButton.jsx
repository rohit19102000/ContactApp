import React from "react";

const ContactCardButton = ({ onClick, icon, ariaLabel }) => {
  return (
    <button 
      className="btn btn-sm" 
      onClick={onClick} 
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default ContactCardButton;
