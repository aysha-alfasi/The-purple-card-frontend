import React from "react";
import "./Modal.css";

const Modal = ({ title, about, content, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <h4>{about}</h4>
        <p>{content}</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
