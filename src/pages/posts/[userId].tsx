import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Spinner } from "@chakra-ui/react";
import { thinkEasyApi } from "@/services/apiClient";
import { PostResponse } from "@/services/models";
import { Heading } from "@/components/Heading";
import { PostsList } from "@/components/PostsList";

const UserPostsPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);

      thinkEasyApi
        .postsControllerUserPosts(userId)
        .then((response) => {
          setPosts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch user's posts:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId]);

  if (isLoading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box>
      <Heading title={"Posts by user " + userId} showBackButton />

      <PostsList posts={posts} isLoading={isLoading} isUserPage />
    </Box>
  );
};

export default UserPostsPage;
