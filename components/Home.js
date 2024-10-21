import { useEffect, useState } from 'react';
import Card from './Card';
import styles from '../styles/Home.module.css';

function Home() {
  const deck = [
    { id: 1, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 2, name: 'billiard ball', image: '/billiardball.svg' },
    { id: 3, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 4, name: 'bubble tea', image: '/bubbletea.svg' },
    { id: 5, name: 'cactus', image: '/cactus.svg' },
    { id: 6, name: 'cactus', image: '/cactus.svg' },
    { id: 7, name: 'dog', image: '/dog.svg' },
    { id: 8, name: 'dog', image: '/dog.svg' },
    { id: 9, name: 'laptop', image: '/laptop.svg' },
    { id: 10, name: 'laptop', image: '/laptop.svg' },
    { id: 11, name: 'octopus', image: '/octopus.svg' },
    { id: 12, name: 'octopus', image: '/octopus.svg' },
    { id: 13, name: 'strawberry', image: '/strawberry.svg' },
    { id: 14, name: 'strawberry', image: '/strawberry.svg' },
    { id: 15, name: 'sunglasses', image: '/sunglasses.svg' },
    { id: 16, name: 'sunglasses', image: '/sunglasses.svg' },
  ];

  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [found, setFound] = useState([]);

  const shuffleDeck = () => {
    setSelected([]);
    setFound([]);

    setTimeout(() => {
      const newCards = [...deck];

      for (let i = newCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
      }

      setCards(newCards);
    }, 600);
  };

  useEffect(() => {
    shuffleDeck();
  }, []);

  useEffect(() => {
    if (found.length === cards.length / 2) {
      setTimeout(() => shuffleDeck(), 1000);
    }
  }, [found]);

  const selectCard = (id) => {
    const card = cards.find(e => e.id === id);

    if (found.includes(card.name) || selected.length === 2) return;

    if (selected.length === 0) {
      setSelected([card.id]);
      return;
    }

    setSelected([...selected, card.id]);

    const previousCard = cards.find(e => e.id === selected[0]);

    if (previousCard.name === card.name) {
      setFound([...found, card.name]);
      setSelected([]);
    } else {
      setTimeout(() => setSelected([]), 500);
    }
  };

  const cardsToDisplay = cards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        selectCard={selectCard}
        selected={selected.includes(card.id)}
        found={found.includes(card.name)}
      />
    );
  });

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>
          Memory Game 🧠
        </h1>
        <div className={styles.headerDivider} />
      </div>

      <div className={styles.main}>
        <div className={styles.grid}>
          {cardsToDisplay}
        </div>
      </div>
    </div>
  );
}

export default Home;
