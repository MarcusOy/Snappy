import { SnappyStore } from "../DataStore";
import PersistenceService from "./PersistenceService";
class IdentityService {
  static authenticate(username: string, access: string, refresh: string) {
    SnappyStore.update((s) => {
      s.identity.username = username;
      s.identity.accessToken = access;
      s.identity.refreshToken = refresh;
    });
    this.store();
  }

  static logOut() {
    SnappyStore.update((s) => {
      s.identity.accessToken = undefined;
      s.identity.refreshToken = undefined;

      s.connection.apiVersion = undefined;
      s.connection.downloadEndpoint = undefined;
      s.connection.isOnline = undefined;
    });
    this.store();
  }

  static store() {
    const { identity } = SnappyStore.getRawState();
    PersistenceService.setSecured("identity", JSON.stringify(identity));
  }
}

export default IdentityService;
