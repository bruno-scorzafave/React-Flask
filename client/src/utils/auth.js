import { createAuthProvider } from 'react-token-auth';

// createAuthProvider may return either an array-like tuple or an
// object depending on package version. Detect the shape at runtime
// and extract the expected helpers so `import { login } from ...` works.
const authResult = createAuthProvider({
    getAccessToken: (session) => session.accessToken,
    storage: localStorage,
    onUpdateToken: (token) =>
        fetch('/auth/refresh', {
            method: 'POST',
            body: token.refresh_token,
        }).then((r) => r.json()),
});

let useAuth;
let authFetch;
let login;
let logout;

// If it's iterable (array/tuple), destructure it
if (authResult && typeof authResult[Symbol.iterator] === 'function') {
    // eslint-disable-next-line prefer-destructuring
    [useAuth, authFetch, login, logout] = authResult;
} else if (authResult && typeof authResult === 'object') {
    // Some versions return an object with named exports
    useAuth = authResult.useAuth || authResult[0];
    authFetch = authResult.authFetch || authResult[1];
    login = authResult.login || authResult[2];
    logout = authResult.logout || authResult[3];
}

// Provide safe defaults to avoid runtime errors when something is missing
const noop = () => {};
useAuth = useAuth || (() => ({ isAuthenticated: false }));
authFetch = authFetch || (async (url, opts) => fetch(url, opts));
login = login || noop;
logout = logout || noop;

export { useAuth, authFetch, login, logout };