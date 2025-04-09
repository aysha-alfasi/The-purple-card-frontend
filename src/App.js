import React, { useState } from "react";
import Card from "./components/Card";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ title: "", content: "" });
  const [editingCardId, setEditingCardId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });

  const addCard = () => {
    if (editingCardId === null) {
      const newCards = [...cards, { ...newCard, id: Date.now() }];
      setCards(newCards);
    } else {
      const updatedCards = cards.map((card) =>
        card.id === editingCardId ? { ...card, ...newCard } : card
      );
      setCards(updatedCards);
    }

    setNewCard({ title: "", content: "" });
    setEditingCardId(null);
  };

  const deleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const editCard = (id) => {
    const card = cards.find((card) => card.id === id);
    setNewCard({ title: card.title, content: card.content });
    setEditingCardId(id);
  };

  const handleFinish = (id) => {
    alert("Card finished: " + id);
  };

  const openModal = (id) => {
    const cardToView = cards.find((card) => card.id === id);
    setModalContent({ title: cardToView.title, content: cardToView.content });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="App">
      <h1>The Purple Card</h1>
      <input
        type="text"
        placeholder="Title"
        value={newCard.title}
        onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newCard.content}
        onChange={(e) => setNewCard({ ...newCard, content: e.target.value })}
      />
      <button onClick={addCard}></button>
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            content={card.content}
            onDelete={deleteCard}
            onEdit={editCard}
            onFinish={handleFinish}
            onView={openModal}
          />
        ))}
      </div>
      {modalVisible && (
        <Modal
          title={modalContent.title}
          content={modalContent.content}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
