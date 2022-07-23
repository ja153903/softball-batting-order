import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { useStore } from '~/store';
import RosterCard from './RosterCard';

function Roster() {
  const players = useStore((state) => state.players);
  const swapPlayers = useStore((state) => state.swapPlayers);

  if (!players.length) {
    return null;
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    swapPlayers(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {players.map((player, index) => (
              <RosterCard player={player} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Roster;
