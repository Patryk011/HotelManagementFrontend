import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

const initOptions: KeycloakConfig = {
  url: "http://localhost:8080",
  realm: "hotel-realm",
  clientId: "hotel-client",
};

const keycloak = new Keycloak(initOptions);

const initKeycloak = (): Promise<boolean> => {
  const options: KeycloakInitOptions = {
    onLoad: "check-sso",
    checkLoginIframe: false,
    pkceMethod: "S256",
  };
  return keycloak
    .init(options)
    .then((authenticated) => {
      setTimeout(
        () =>
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          ),
        0
      );

      return authenticated;
    })
    .catch((error) => {
      console.error("Keycloak initialization failed:", error);
      throw error;
    });
};

const register = (): Promise<void> => keycloak.register();
const getToken = (): string | undefined => keycloak.token;

export { initKeycloak, register, getToken, keycloak };
