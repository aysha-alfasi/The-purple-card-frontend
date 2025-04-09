import React, { useState } from "react";
import { Howl } from "howler";
import "./Card.css";

const flipSound = new Howl({
  src: ["/sounds/flip.mp3"],
});

const hoverSound = new Howl({
  src: ["/sounds/hover.mp3"],
});

const Card = ({ title, content, id, onDelete, onEdit, onFinish, onView }) => {
  const [flipped, setFlipped] = useState(false);

  const handleHover = () => {
    hoverSound.play();
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    flipSound.play();
  };

  return (
    <div className="card-container">
      <div
        className={`card ${flipped ? "flipped" : ""}`}
        onMouseEnter={handleHover}
        onClick={handleFlip}
      >
        <div className="card-inside">
          <div className="card-front">
            <h3>{title}</h3>
          </div>
          <div className="card-back">
            <p>{content}</p>
            <button onClick={() => onView(id)}>View</button>
          </div>
        </div>
      </div>
      <div className="card-buttons">
        <button onClick={() => onEdit(id)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
        <button onClick={() => onFinish(id)}>Finish</button>
      </div>
    </div>
  );
};

export default Card;
