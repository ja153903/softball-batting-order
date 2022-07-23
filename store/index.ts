import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { withImmer } from './utils';

export interface Player {
  id: string;
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
> = (set) => {
  const immerSet = withImmer(set);

  return {
    players: [],
    addPlayer: (player: Player) =>
      immerSet((state: RosterSlice) => {
        state.players.push(player);
      }),
    removePlayer: (id: string) =>
      immerSet((state: RosterSlice) => {
        state.players = state.players.filter(
          (player: Player) => player.id !== id
        );
      }),
    swapPlayers: (source: number, destination: number) =>
      immerSet((state: RosterSlice) => {
        const [removed] = state.players.splice(source, 1);
        state.players.splice(destination, 0, removed);
      }),
  };
};

export const useStore = create<RosterSlice>()(
  devtools(
    persist((...args) => ({
      ...createRosterSlice(...args),
    }))
  )
);
