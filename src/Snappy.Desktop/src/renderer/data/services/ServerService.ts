import { SnappyStore } from "./../DataStore";
import PersistenceService from "./PersistenceService";
import { wait } from "../Helpers";

export interface IServer {
  hostName?: string;
  apiVersion?: string;
  downloadEndpoint?: string;
  isOnline?: boolean;
}

class ServerService {
  static init(): void {
    window.addEventListener("online", () => {
      console.log("Network change (online). Checking connectivity...");
      this.isServerUp();
    });
    window.addEventListener("offline", () => {
      console.log("Network change (offline). Checking connectivity...");
      this.isServerUp();
    });
  }

  static async setServer(server: string) {
    let d = await (await fetch(`https://${server}/Spec`)).json();
    SnappyStore.update((s) => {
      s.connection.hostName = server;
      s.connection.apiVersion = d.apiVersion;
      s.connection.downloadEndpoint = d.downloadEndpoint;
      s.connection.isOnline = true;
    });
    this.store();
    await wait(100);
    return SnappyStore.getRawState().connection;
  }

  static async isServerUp(): Promise<boolean> {
    let server = SnappyStore.getRawState().connection;
    let isOnline = false;
    try {
      // Try and fetch Heatbeat endpoint
      const response = await fetch(`https://${server.hostName}/Heartbeat`);
      // Return true if response is 200
      isOnline = response.ok;
    } catch (error) {
      // Return false if fetch throws exception
      isOnline = false;
    } finally {
      SnappyStore.update((s) => {
        s.connection.isOnline = isOnline;
      });
    }
    return isOnline;
  }

  static store() {
    const { connection } = SnappyStore.getRawState();
    PersistenceService.setSecured("identity", JSON.stringify(connection));
    console.log("Storing connection state... ", { connection });
  }
}

export default ServerService;
