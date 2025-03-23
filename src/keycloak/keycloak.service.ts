import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";

const initOptions: KeycloakConfig = {
  url: "http://keycloak-local.pl:8080",
  realm: "hotel-realm",
  clientId: "hotel-client",
};

const keycloak = new Keycloak(initOptions);

const refreshState = {
  timerId: null as number | null,
};

const initKeycloak = (): Promise<boolean> => {
  const options: KeycloakInitOptions = {
    onLoad: "check-sso",
    checkLoginIframe: false,
    pkceMethod: "S256",
    enableLogging: true,
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

      if (authenticated) {
        console.log("Successfully authenticated");
        startTokenRefresh();
      }

      return authenticated;
    })
    .catch((error) => {
      console.error("Keycloak initialization failed:", error);
      throw error;
    });
};

const getToken = (): string => {
  if (!keycloak.token) {
    console.warn("No token available, may need to authenticate");
    return "";
  }

  if (keycloak.isTokenExpired(30)) {
    console.warn("Token expired or expiring soon, refresh triggered");

    refreshToken().catch((err) => {
      console.error("Background token refresh failed:", err);
    });
  }

  return keycloak.token;
};

const refreshToken = async (): Promise<string> => {
  try {
    const refreshed = await keycloak.updateToken(30);

    if (refreshed) console.log("Token was successfully refreshed");

    if (!keycloak.token)
      throw new Error("Token refresh completed but no token available");

    return keycloak.token;
  } catch (error) {
    console.error(`Failed to refresh token: ${error}`);

    keycloak.login();
    throw error;
  }
};

const startTokenRefresh = (): void => {
  clearTokenRefreshInterval();

  const getRefreshInterval = (): number => {
    if (!keycloak.tokenParsed?.exp) {
      return 60000;
    }

    const expiryTime = keycloak.tokenParsed.exp * 1000;
    const currentTime = new Date().getTime();
    const timeToExpiry = expiryTime - currentTime;

    return Math.min(Math.max(timeToExpiry / 2, 30000), 300000);
  };

  refreshToken().catch((err) =>
    console.error(`Initial token refresh failed: ${err}`)
  );

  const scheduleNextRefresh = (): void => {
    const interval = getRefreshInterval();
    console.log(`Next token refresh in ${Math.round(interval / 1000)} seconds`);

    refreshState.timerId = window.setTimeout(() => {
      refreshToken()
        .then(() => scheduleNextRefresh())
        .catch((err) => {
          console.error("Scheduled token refresh failed:", err);

          refreshState.timerId = window.setTimeout(scheduleNextRefresh, 60000);
        });
    }, interval);
  };

  scheduleNextRefresh();
};

const clearTokenRefreshInterval = (): void => {
  if (refreshState.timerId !== null) {
    clearTimeout(refreshState.timerId);
    refreshState.timerId = null;
  }
};

const register = (): Promise<void> => keycloak.register();

const logout = (): Promise<void> => {
  clearTokenRefreshInterval();
  return keycloak.logout();
};

export { initKeycloak, register, getToken, keycloak, refreshToken, logout };
