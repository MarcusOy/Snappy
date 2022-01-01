import { SnappyStore } from "../DataStore";
class ContactService {
  static switchToContact(id: string) {
    SnappyStore.update((s) => {
      s.selectedContactId = id;
    });
  }
}

export default ContactService;
