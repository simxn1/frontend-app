import { FC } from "react";
import { Box, Button, Card } from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import { PATH } from "@/lib/constants";

interface PostCardProps {
  title: string;
  content: string;
  authorId: string;
  isUserPage?: boolean;
}

const PostCard: FC<PostCardProps> = ({
  title,
  content,
  authorId,
  isUserPage,
}) => (
  <Card.Root mb={2}>
    <Card.Header>
      <Box display="flex" justifyContent="space-between">
        <Card.Title>{title}</Card.Title>

        {!isUserPage && (
          <Link href={PATH.POSTS + "/" + authorId} passHref>
            <Button variant="ghost" colorPalette="blue">
              See all posts from this user
              <LuArrowRight />
            </Button>
          </Link>
        )}
      </Box>
    </Card.Header>

    <Card.Body>
      <Card.Description>{content}</Card.Description>
    </Card.Body>
  </Card.Root>
);

export default PostCard;
