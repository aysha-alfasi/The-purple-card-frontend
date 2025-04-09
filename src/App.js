import React, { useState } from "react";
import Card from "./components/Card";
import Modal from "./components/Modal";
import { Howl } from "howler";
import "./App.css";

const btnSound = new Howl({
src: ['/sounds/btn.mp3'],
});
const finishSound = new Howl({
  src: ['/sounds/finish.mp3'],
});

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [cards, setCards] = useState([]);

  const openAddModal = () => {
    btnSound.play();
    setIsEditMode(true);
    setIsViewMode(false);
    setCurrentCard(null);
    setModalVisible(true);
  };

  const openEditModal = (card) => {
    setIsEditMode(true);
    setIsViewMode(false);
    setCurrentCard(card);
    setModalVisible(true);
  };

  const openViewModal = (card) => {
    setIsViewMode(true);
    setIsEditMode(false);
    setCurrentCard(card);
    setModalVisible(true);
  };

  const saveCard = (newCard) => {
    if (currentCard) {
      setCards(
        cards.map((card) => (card.id === currentCard.id ? newCard : card))
      );
    } else {
      setCards([...cards, { ...newCard, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const handleFinish = (id) => {
    finishSound.play();
    alert("Card finished: " + id);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="App">
      <h1>The Purple Card</h1>
      <button className="Add" onClick={openAddModal}> Add Idea</button>
      {modalVisible && (
        <Modal
          isEditMode={isEditMode}
          isViewMode={isViewMode}
          card={currentCard}
          onClose={closeModal}
          onSave={saveCard}
        />
      )}
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.about}
            onDelete={deleteCard}
            onEdit={() => openEditModal(card)}
            onFinish={handleFinish}
            onView={() => openViewModal(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
