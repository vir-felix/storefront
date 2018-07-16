import { autorun, configure } from "mobx";
import AuthStore from "./AuthStore";
import CartStore from "./CartStore";
import RoutingStore from "./RoutingStore";
import UIStore from "./UIStore";

configure({ enforceActions: true });

const authStore = new AuthStore("meteorToken");
const cartStore = new CartStore();
const keycloakAuthStore = new AuthStore("keycloakToken");
const routingStore = new RoutingStore();
const uiStore = new UIStore();

autorun(() => {
  const { query } = routingStore;
  if (query && query.limit) {
    uiStore.setPageSize(parseInt(query.limit, 10));
  }

  if (query && query.sortby) {
    uiStore.setSortBy(query.sortby);
  }
});

export default {
  authStore,
  cartStore,
  keycloakAuthStore,
  routingStore,
  uiStore
};
