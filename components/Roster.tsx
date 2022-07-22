import { useStore } from '~/store';

function Roster() {
  const players = useStore((state) => state.players);
  const removePlayer = useStore((state) => state.removePlayer);

  if (!players.length) {
    return null;
  }

  return (
    <ol className="list-decimal">
      {players.map((player) => (
        <li key={player.name} className="flex flex-row justify-between">
          <span>
            {player.name} - {player.gender}
          </span>
          <button onClick={() => removePlayer(player.name)}>x</button>
        </li>
      ))}
    </ol>
  );
}

export default Roster;
