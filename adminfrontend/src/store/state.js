import { proxy } from "valtio";

const state = proxy({
  currentUser: null,
  activeIndex: 1,
  adminActiveIndex: 1,
  receptionActiveIndex: 0,
});

export default state;