import React, { useState } from 'react';
import { useEncounterDeck } from './EncounterDeck';
import { addCard, shuffleDeck } from '../functions/cardFunctions';

const Menu = ({ onScenarioSelect, onScenarioSet }) => {
    const { setPlayerCount, playerCount, setStagedCards, encounterDeck, setEncounterDeck, settlementDeck, setSettlementDeck, setPlayers } = useEncounterDeck();
    const [playerInputs, setPlayerInputs] = useState([]);

     const scenarios = {
        TheCapitalWasteland: ['044'],
        ThePitt:['056'],
        TheCommonWealth:['014'],
        FarHarbor: ['029','030'],
        RiseOfTheMaster:['166'],
        TheCapitalWastelandE:['044'],
        ThePittExpanded:['056'],
        TheCommonWealthExpanded:['014'],
        FarHarborExpanded:['029','030'],
        NewCalifornia:['184']
    };

    const scenarioImages = {
        FarHarbor: 'FarHarbor.jpg',
        TheCapitalWasteland: 'CapitalWasteland.jpg',
        TheCommonWealth: 'Commonwealth.jpg',
        ThePitt: 'ThePitt.jpg',
        FarHarborExpanded: 'FarHarborE.png',
        RiseOfTheMaster: 'RiseOfMaster.png',
        TheCapitalWastelandE: 'CapitalWastelandE.png',
        ThePittExpanded: 'ThePittE.png',
        TheCommonWealthExpanded: 'CommonWealthE.png',
        NewCalifornia: 'NewCalifornia.png'
    };

    
    const handlePlayerCount = (count) => {
        setPlayerCount(count);
        // Update playerInputs array to match the count
        const newPlayerInputs = new Array(count).fill('');
        // If there are existing names, keep them
        playerInputs.forEach((input, index) => {
            if (index < count) {
                newPlayerInputs[index] = input;
            }
        });
        setPlayerInputs(newPlayerInputs);
    };

    const handlePlayerInput = (value, index) => {
        const newInputs = [...playerInputs];
        newInputs[index] = value;
        setPlayerInputs(newInputs);
    };

    const handleScenarioClick = (scenarioKey) => {
        const initialCards = scenarios[scenarioKey];
        if(playerInputs[0] != ''){
            console.log(playerInputs);
            setPlayers(playerInputs);
        }
        else{
            const defNames = [];
            for(let i = 0; i < playerCount; i++){
                defNames.push("Player " + (i + 1));
            }
            console.log("default names:", defNames);
            setPlayers(defNames);
        }
        let currentDeck;
        let currentDeck2;
        let newDeck;
        switch(scenarioKey){
            case 'FarHarbor':
                currentDeck = addCard(settlementDeck, '031', playerCount); // Add specific card to the deck
                setSettlementDeck(currentDeck);
                break;
            case 'FarHarborExpanded':
                newDeck = shuffleDeck(['243(1)','243(2)']);
                currentDeck = addCard(settlementDeck, newDeck[0], playerCount); // Add specific card to the deck
                newDeck = shuffleDeck(['244(1)','244(2)','244(3)']);
                currentDeck = addCard(currentDeck, newDeck[0], playerCount); // Add specific card to the deck
                currentDeck = addCard(currentDeck, '031', playerCount); // Add specific card to the deck
                setSettlementDeck(currentDeck);
                break;
            case 'RiseOfTheMaster':
                newDeck = shuffleDeck(['240(1)','240(2)','240(3)','240(4)']);
                currentDeck = addCard(encounterDeck, newDeck[0], playerCount); // Add specific card to the deck
                newDeck = shuffleDeck(['241(1)','241(2)']);
                currentDeck2 = addCard(settlementDeck, newDeck[0], playerCount); // Add specific card to the deck
                
                setSettlementDeck(currentDeck2);
                setEncounterDeck(currentDeck);
                break;
            case 'TheCapitalWastelandExpanded':
                newDeck = shuffleDeck(['243(1)','243(2)']);
                currentDeck = addCard(settlementDeck, newDeck[0], playerCount); // Add specific card to the deck
                newDeck = shuffleDeck(['244(1)','244(2)','244(3)']);
                currentDeck = addCard(currentDeck, newDeck[0], playerCount); // Add specific card to the deck
                setSettlementDeck(currentDeck);
                break;
            case 'ThePitt':                
                break;
            case 'ThePittExpanded':
                newDeck = shuffleDeck(['243(1)','243(2)']);
                currentDeck = addCard(settlementDeck, newDeck[0], playerCount); // Add specific card to the deck
                newDeck = shuffleDeck(['244(1)','244(2)','244(3)']);
                currentDeck = addCard(currentDeck, newDeck[0], playerCount); // Add specific card to the deck
                setSettlementDeck(currentDeck);
                break;
            case 'NewCalifornia':
                newDeck = shuffleDeck(['240(1)','240(2)','240(3)','240(4)']);
                currentDeck = addCard(encounterDeck, newDeck[0], playerCount); // Add specific card to the deck
                newDeck = shuffleDeck(['241(1)','241(2)']);
                currentDeck2 = addCard(settlementDeck, newDeck[0], playerCount); // Add specific card to the deck
            
                setSettlementDeck(currentDeck2);
                setEncounterDeck(currentDeck);
                break;
            case 'TheCommonWealthExpanded':
                newDeck = shuffleDeck(['243(1)','243(2)']);
                currentDeck = addCard(settlementDeck, newDeck[0], playerCount); // Add specific card to the deck
                newDeck = shuffleDeck(['244(1)','244(2)','244(3)']);
                currentDeck = addCard(currentDeck, newDeck[0], playerCount); // Add specific card to the deck
                setSettlementDeck(currentDeck);
                break;
            default:
                console.log("scenario not found");        
        }
        
        setStagedCards(initialCards);
        onScenarioSet(true); // Set the scenario status to true
        }

        return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <p className='font-serif text-xl'>You may require cards: 104, 204-213 and 238</p>
    <div className="w-full max-w-8xl max-h-8xl p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Choose Scenario</h1>
        {/* Adjust the grid-cols to change number of columns */}
        <div className="grid grid-cols-5 gap-4 mb-6">
            {Object.keys(scenarios).map((scenarioKey) => (
                <button
                    key={scenarioKey}
                    onClick={() => handleScenarioClick(scenarioKey)}
                    className="h-60 w-75 flex flex-col items-center justify-center bg-cover bg-center rounded-lg shadow hover:bg-opacity-90"
                    style={{ backgroundImage: `url(${require(`../images/misc_assets/${scenarioImages[scenarioKey]}`)})` }}
                >
                    <span className="top-0 w-full bg-black bg-opacity-50 text-white text-lg font-semibold text-center py-1">
                        {scenarioKey}
                    </span>
                </button>
            ))}
        </div>

        <h2 className="text-xl mb-4">Set Number of Players</h2>
        <div className="flex justify-center">
            {[1, 2, 3, 4].map((count) => (
                <button
                    key={count}
                    onClick={() => handlePlayerCount(count)}
                    className={`mx-2 px-4 py-2 ${playerCount === count ? 'bg-green-700' : 'bg-green-500'} text-white rounded-lg hover:bg-green-600 focus:outline-none transition-colors`}
                >
                    {count} Player{count > 1 ? 's' : ''}
                </button>
            ))}
        </div>

        {/* Enhanced Input Fields for Visibility */}
        <div className="mt-4 w-full flex justify-center items-center">
            {playerInputs.map((input, index) => (
                <input
                    key={index}
                    type="text"
                    value={input}
                    onChange={(e) => handlePlayerInput(e.target.value, index)}
                    className="mx-2 mb-2 p-2 w-1/4 border-4 border-green-500 rounded shadow-lg focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-300"
                    placeholder={`Player ${index + 1} Name`}
                />
            ))}
        </div>
    </div>
</div>

        );
        
    };
        

export default Menu;