import { SnappyStore } from "./DataStore";
import PersistenceService from "./PersistenceService";
class IdentityService {
  static authenticate(
    username: string,
    server: string,
    access: string,
    refresh: string
  ) {
    SnappyStore.update((s) => {
      s.identity.username = username;
      s.identity.server = server;
      s.identity.accessKey = access;
      s.identity.refreshKey = refresh;
    });
    this.storeIdentity();
  }

  static logOut() {
    SnappyStore.update((s) => {
      s.identity.accessKey = undefined;
      s.identity.refreshKey = undefined;
    });
    this.storeIdentity();
  }

  static storeIdentity() {
    const i = SnappyStore.getRawState().identity;
    PersistenceService.setSecured("identity", JSON.stringify(i));
  }
}

export default IdentityService;
