import { SnappyStore } from "./DataStore";
class IdentityService {
  static authenticate(access: string, refresh: string) {
    SnappyStore.update((s) => {
      s.identity.accessKey = access;
      s.identity.refreshKey = refresh;
    });
  }

  static logOut() {
    SnappyStore.update((s) => {
      s.identity.accessKey = undefined;
      s.identity.refreshKey = undefined;
      s.identity.contact = undefined;
    });
  }
}

export default IdentityService;
