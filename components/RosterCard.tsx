import { Draggable } from 'react-beautiful-dnd';

import { useStore } from '~/store';
import type { Player } from '~/store';

interface RosterCardProps {
  player: Player;
  index: number;
}

function RosterCard({ player, index }: RosterCardProps) {
  const removePlayer = useStore((state) => state.removePlayer);

  return (
    <Draggable key={player.name} draggableId={player.name} index={index}>
      {(provided) => (
        <div
          className="flex flex-row justify-between"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>
            {player.name} - {player.gender}
          </span>
          <button onClick={() => removePlayer(player.name)}>X</button>
        </div>
      )}
    </Draggable>
  );
}

export default RosterCard;
