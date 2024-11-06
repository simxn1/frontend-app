import type { AppProps } from "next/app";
import { Provider } from "@/components/ui/provider";
import { Box } from "@chakra-ui/react";
import { AuthWrapper } from "@/modules/AuthWrapper";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Box suppressHydrationWarning pt={8} maxWidth={1200} margin="auto">
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </Box>

      <Toaster />
    </Provider>
  );
}
