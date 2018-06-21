import getConfig from "next/config";

// trigger oauth login redirect flow with Keycloak (CLIENT SIDE ONLY)
// https://www.keycloak.org/docs/3.0/securing_apps/topics/oidc/javascript-adapter.html
export const login = () => {
  const { Keycloak } = window;
  const { publicRuntimeConfig } = getConfig();
  const { keycloakConfig } = publicRuntimeConfig; // eslint-disable-line no-unused-vars
  const { realm, clientId, url, redirectUri } = keycloakConfig || {};
  const kc = new Keycloak({ realm, clientId, url });
  // eslint-disable-next-line no-console
  kc.init({ flow: "implicit" }).catch((error) => console.error(error));
  localStorage.setItem("kc-redirected-from", window.location.pathname);
  // eslint-disable-next-line no-console
  kc.login({ redirectUri }).catch((error) => console.error(error));
};
