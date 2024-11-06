import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/lib/constants";

export const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const getLocalStorageValue = (
  key: string,
): { value: string | null | undefined; isServer: boolean } => {
  if (typeof window !== "undefined") {
    // This is running on the client side.
    return { value: window.localStorage.getItem(key), isServer: false };
  } else {
    // This is running on the server side.
    return { value: undefined, isServer: true };
  }
};
