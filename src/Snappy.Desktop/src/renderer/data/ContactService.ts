import { SnappyStore } from "./DataStore";
class ContactService {
  static switchToContact(id: string) {
    SnappyStore.update((s) => {
      s.selectedContact = id;
    });
  }
}

export default ContactService;
