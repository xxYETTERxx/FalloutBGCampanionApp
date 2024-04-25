// StagingArea.jsx
import React, { useState } from 'react';
import Card from './Card'; // Importing other required components
import '../styles/StagingArea.css'; // Importing CSS
import {  useEncounterDeck } from './EncounterDeck';

const StagingArea = () => {
    const { stagedCards } = useEncounterDeck();

    const [drawnCard, setDrawnCard] = useState(null); // State to track the last drawn card
    const DrawCardButton = ({ setDrawnCard }) => {
    const { drawEncounter, drawSettlement } = useEncounterDeck();
    const [zoomLevel, setZoomLevel] = useState(1); // State for zoom
    const [isScrolling, setIsScrolling] = useState(false); // State for scrolling
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 }); 
   
    const handleDraw = () => {
        const drawnCard = drawEncounter(); // Draw a card from the deck
        if (drawnCard) {
            setDrawnCard(drawnCard); // Set the drawn card in the parent state
        } else {
            console.log('No cards left in the deck'); // If the deck is empty, log a message
        }
    };

    return (
        <button onClick={handleDraw}>
            Draw Card
        </button>
    );
};

    return (
       
        <div className="staging-area"> {/* Ensure context access */}
            {stagedCards.map((card) => (
                <div key={card} className="staged-card">
                    <Card cardNumber={card} /> {/* Render the card */}
                </div>
            ))}
            <div>
                {drawnCard && <Card cardNumber={drawnCard} />} {/* Conditionally render drawn card */}
            </div>
            <div>
                <DrawCardButton setDrawnCard={setDrawnCard} /> {/* Draw card button */}
            </div>
            
        </div>
        
      
    );
};

export default StagingArea; // Default export