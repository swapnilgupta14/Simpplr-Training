import React from 'react';
import { CharacterCardProps } from '../types';

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
            <div className="flex">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-24 h-24 object-cover rounded-full mr-4"
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-md font-bold mb-1">{character.name}</h2>
                        <p className="text-gray-600 text-sm mb-1">
                            Status: {character.status}
                        </p>
                        <p className="text-gray-600 text-sm mb-1">
                            Species: {character.species}
                        </p>
                        <p className="text-gray-600 text-sm mb-1">
                            Gender: {character.gender}
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-sm text-blue-600 mt-2">
                <p>Origin: {character.origin.name}</p>
                <p>Last Location: {character.location.name}</p>
            </div>
        </div>
    );
};

export default CharacterCard;