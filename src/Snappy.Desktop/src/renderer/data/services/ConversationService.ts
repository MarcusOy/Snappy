import { IConversation } from "../../components/Conversation";
import { SnappyStore } from "../DataStore";
class ConversationService {
  static update(list: IConversation[]) {
    if (list.length <= 0) return;
    SnappyStore.update((s) => {
      s.conversations = list;
      if (s.selectedContactId == "") s.selectedContactId = list[0].id;
    });
  }
  static switchTo(id: string) {
    SnappyStore.update((s) => {
      s.selectedContactId = id;
    });
  }
}

export default ConversationService;
