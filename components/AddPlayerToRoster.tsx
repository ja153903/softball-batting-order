import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useStore } from '~/store';

function AddPlayerToRoster() {
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const addPlayer = useStore((state) => state.addPlayer);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (name && gender) {
      addPlayer({ name, gender, id: uuidv4() });
    }

    setName('');
    setGender('');
  }

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-2 border border-black p-2">
        <label className="font-bold">Name</label>
        <input
          className="border border-black rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col border border-black p-2">
        <label className="font-bold">Choose your gender</label>
        {['Male', 'Female', 'Other'].map((option) => (
          <div className="flex flex-row gap-x-2" key={option}>
            <input
              type="radio"
              checked={gender === option}
              onChange={() => setGender(option)}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2.5"
      >
        Add Player
      </button>
    </form>
  );
}

export default AddPlayerToRoster;
