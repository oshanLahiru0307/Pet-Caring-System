import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  // Keep both for compatibility; prefer currentUserRole in new code
  currentUserRole: null,
  currentUserRoll: null,
  currentUserName:null,
  activeChatPartnerId: null,
  activeChatPartnerName: null

});

export default state;