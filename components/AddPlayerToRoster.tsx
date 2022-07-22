import { useState } from 'react';

import { useStore } from '~/store';

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

export default AddPlayerToRoster;
