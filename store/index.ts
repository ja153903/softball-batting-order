import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import produce from 'immer';

interface Player {
  name: string;
  gender: string;
}

interface RosterSlice {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (name: string) => void;
  swapPlayers: (source: number, destination: number) => void;
}

type Slices = RosterSlice;

type ZustandMiddleware = [
  ['zustand/devtools', never],
  ['zustand/persist', unknown]
];

const createRosterSlice: StateCreator<
  Slices,
  ZustandMiddleware,
  [],
  RosterSlice
> = (set) => ({
  players: [],
  addPlayer: (player: Player) =>
    set(
      produce((state: RosterSlice) => {
        state.players.push(player);
      })
    ),
  removePlayer: (name: string) =>
    set(
      produce((state: RosterSlice) => {
        state.players = state.players.filter(
          (player: Player) => player.name !== name
        );
      })
    ),
  swapPlayers: (source: number, destination: number) =>
    set(
      produce((state: RosterSlice) => {
        const [removed] = state.players.splice(source, 1);
        state.players.splice(destination, 0, removed);
      })
    ),
});

export const useStore = create<RosterSlice>()(
  devtools(
    persist((...args) => ({
      ...createRosterSlice(...args),
    }))
  )
);
