import type { NextPage } from 'next';

import useHasHydrated from '~/hooks/useHasHydrated';
import AddPlayerToRoster from '~/components/AddPlayerToRoster';
import Roster from '~/components/Roster';

const Home: NextPage = () => {
  const hasHydrated = useHasHydrated();

  return (
    <div className="container mx-auto">
      <h1 className="text-lg font-bold">Lineup</h1>
      {hasHydrated && <Roster />}
      {hasHydrated && <AddPlayerToRoster />}
    </div>
  );
};

export default Home;
