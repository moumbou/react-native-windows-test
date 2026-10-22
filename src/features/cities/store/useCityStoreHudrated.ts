import { useEffect, useState } from 'react';
import { useCityStore } from './useCityStore';

export function useCityStoreHydrated(): boolean {
  const [hydrated, setHydrated] = useState(useCityStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useCityStore.persist.onFinishHydration(() =>
      setHydrated(true),
    );
    setHydrated(useCityStore.persist.hasHydrated());
    return unsubscribe;
  }, []);

  return hydrated;
}
