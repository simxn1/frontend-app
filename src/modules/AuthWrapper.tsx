import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Spinner } from "@chakra-ui/react";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, PATH } from "@/lib/constants";
import { getLocalStorageValue } from "@/lib/utils";

type AuthWrapperProps = {
  children: ReactNode;
};

export const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const { value: accessToken, isServer } = getLocalStorageValue(
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  );
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);

    if (!isServer && hasMounted && !accessToken) {
      router.push({ pathname: PATH.LOGIN });
    }
  }, [accessToken, hasMounted, isServer, router]);

  if (!hasMounted || (!accessToken && router.pathname !== PATH.LOGIN)) {
    return (
      <Box display="flex" justifyContent="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  return children;
};
