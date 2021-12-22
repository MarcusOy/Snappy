import { SnappyStore, IUserIdentity } from "./../data/DataStore";
import { useEffect, useState } from "react";
import PersistenceService from "../data/PersistenceService";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      // Using JS IIFE here (look it up if you don't remember)
      (async function load() {
        console.log("Loader is processsing...");
        const i: IUserIdentity = JSON.parse(
          (await PersistenceService.getSecured("identity")) ?? "{}"
        );

        SnappyStore.update((state) => {
          state.identity = i;
        });

        setIsLoading(false);
      })();
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
      console.log("Loader has failed.");
      console.log(e);
    }
  }, []);

  return { isLoading, isError } as const;
};

export default useLoader;
