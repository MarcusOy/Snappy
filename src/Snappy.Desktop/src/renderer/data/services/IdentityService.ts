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
      s.identity = {};
      s.connection = {};
      s.conversations = [];
      s.selectedContactId = "";
      s.currentUser = {};
    });
    this.store();
  }

  static store() {
    const { identity } = SnappyStore.getRawState();
    PersistenceService.setSecured("identity", JSON.stringify(identity));
  }
}

export default IdentityService;
