import { FC } from "react";
import { Box, Heading as ChakraHeading, IconButton } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  PATH,
} from "@/lib/constants";
import { useRouter } from "next/router";
import Link from "next/link";

interface HeadingProps {
  title: string;
  showBackButton?: boolean;
  isLoginPage?: boolean;
}

export const Heading: FC<HeadingProps> = ({
  title,
  showBackButton,
  isLoginPage,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

    router.push({ pathname: PATH.POSTS });
  };

  return (
    <Box pb={8} display="flex" justifyContent="space-between">
      <Box display="flex" gap={2}>
        {showBackButton && (
          <Link href={PATH.POSTS}>
            <IconButton variant="ghost" aria-label="Search database">
              <LuArrowLeft />
            </IconButton>
          </Link>
        )}

        <ChakraHeading size="3xl">{title}</ChakraHeading>
      </Box>

      {!isLoginPage && (
        <Button size="sm" onClick={handleLogout} variant="ghost">
          Log out <LuArrowRight />
        </Button>
      )}
    </Box>
  );
};
