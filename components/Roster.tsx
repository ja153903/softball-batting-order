import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useStore } from '~/store';

function Roster() {
  const players = useStore((state) => state.players);
  const removePlayer = useStore((state) => state.removePlayer);
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
              <Draggable
                key={player.name}
                draggableId={player.name}
                index={index}
              >
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
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Roster;
