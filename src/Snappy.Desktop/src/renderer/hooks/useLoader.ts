import { IServer } from "./../data/services/ServerService";
import { SnappyStore, IIdentity } from "./../data/DataStore";
import { useEffect, useState } from "react";
import PersistenceService from "../data/services/PersistenceService";
import { wait } from "../data/Helpers";

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      // Using JS IIFE here (look it up if you don't remember)
      (async function load() {
        console.log("Loader is processsing...");
        const i: IIdentity = JSON.parse(
          (await PersistenceService.getSecured("identity")) ?? "{}"
        );
        const c: IServer = JSON.parse(
          (await PersistenceService.getSecured("connection")) ?? "{}"
        );

        SnappyStore.update((state) => {
          state.identity = i;
          state.connection = c;
        });
        await wait(500);
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
