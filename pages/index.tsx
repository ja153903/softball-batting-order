import type { NextPage } from 'next';

import useHasHydrated from '~/hooks/useHasHydrated';
import AddPlayerToRoster from '~/components/AddPlayerToRoster';
import Roster from '~/components/Roster';

const Home: NextPage = () => {
  const hasHydrated = useHasHydrated();

  // let's not render until we've hydrated
  if (!hasHydrated) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen justify-between p-2">
      <h1 className="text-lg font-bold">Lineup</h1>
      <Roster />
      <AddPlayerToRoster />
    </div>
  );
};

export default Home;
