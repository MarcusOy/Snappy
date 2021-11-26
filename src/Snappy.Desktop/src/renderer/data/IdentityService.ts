import { SnappyStore } from "./DataStore";
class IdentityService {
  static authenticate(
    username: string,
    server: string,
    access: string,
    refresh: string
  ) {
    SnappyStore.update((s) => {
      s.currentServer = server;
      s.identity.username = username;
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
