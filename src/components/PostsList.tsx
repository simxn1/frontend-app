import { Box, Spinner } from "@chakra-ui/react";
import PostCard from "@/components/PostCard";
import { FC } from "react";
import { PostResponse } from "@/services/models";

interface PostsListProps {
  posts: PostResponse[];
  isLoading?: boolean;
  isUserPage?: boolean;
}

export const PostsList: FC<PostsListProps> = ({
  posts,
  isLoading,
  isUserPage,
}) => {
  return isLoading ? (
    <Box display="flex" justifyContent="center">
      <Spinner size="lg" />
    </Box>
  ) : (
    <Box>
      {posts.map(({ id, title, content, authorId }) => (
        <PostCard
          key={id}
          title={title}
          content={content}
          authorId={authorId}
          isUserPage={isUserPage}
        />
      ))}
    </Box>
  );
};
