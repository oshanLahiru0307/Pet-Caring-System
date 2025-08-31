import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  activeIndex: 0,
  adminActiveIndex: 0,
  receptionActiveIndex: 0,
});

export default state;