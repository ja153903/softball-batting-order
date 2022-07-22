import { useState } from 'react';
import type { NextPage } from 'next';

import { useStore } from '../store';
import useHasHydrated from '../hooks/useHasHydrated';

function Roster() {
  const players = useStore((state) => state.players);
  const removePlayer = useStore((state) => state.removePlayer);

  if (!players.length) {
    return null;
  }

  return (
    <div>
      {players.map((player) => (
        <li key={player.name} className="flex flex-row justify-between">
          <span>
            {player.name} - {player.gender}
          </span>
          <button onClick={() => removePlayer(player.name)}>x</button>
        </li>
      ))}
    </div>
  );
}

// TODO: This should have its own container
function AddPlayerToRoster() {
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const addPlayer = useStore((state) => state.addPlayer);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (name && gender) {
      addPlayer({ name, gender });
    }

    setName('');
    setGender('');
  }

  return (
    <form className="flex flex-row gap-x-4" onSubmit={handleSubmit}>
      <label>
        Name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <div>
        <p>Choose your gender</p>
        {['Male', 'Female', 'Other'].map((option) => (
          <div key={option}>
            <input
              type="radio"
              checked={gender === option}
              onChange={() => setGender(option)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <button type="submit">Add Player</button>
    </form>
  );
}

const Home: NextPage = () => {
  const hasHydrated = useHasHydrated();

  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold">Lineup</h1>
      {hasHydrated && <Roster />}
      {hasHydrated && <AddPlayerToRoster />}
    </div>
  );
};

export default Home;
