import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  currentUserName:null

});

export default state;