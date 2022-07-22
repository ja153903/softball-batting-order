import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface Player {
  name: string;
  gender: string;
}

interface RosterSlice {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (name: string) => void;
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
    set((state: RosterSlice) => ({
      players: [...state.players, player],
    })),
  removePlayer: (name: string) =>
    set((state: RosterSlice) => ({
      players: state.players.filter((player: Player) => player.name !== name),
    })),
});

export const useStore = create<RosterSlice>()(
  devtools(
    persist((...args) => ({
      ...createRosterSlice(...args),
    }))
  )
);
