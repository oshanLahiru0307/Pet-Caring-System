import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  // Keep both for compatibility; prefer currentUserRole in new code
  currentUserRole: null,
  currentUserRoll: null,
  currentUserName:null,
  activeChatPartnerId: null,
  activeChatPartnerName: null,
  activeIndex: 1,
  adminActiveIndex: 1,

});

export default state;