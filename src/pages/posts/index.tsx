import { useEffect, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toaster } from "@/components/ui/toaster";
import { thinkEasyApi } from "@/services/apiClient";
import { PostResponse } from "@/services/models";
import { Heading } from "@/components/Heading";
import { PATH } from "@/lib/constants";
import { PostsList } from "@/components/PostsList";

const AllPostsPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const response = await thinkEasyApi.postsControllerGetAllPosts();
        setIsLoading(false);

        setPosts(
          response.data.sort(
            (a: PostResponse, b: PostResponse) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          ),
        );
      } catch (error) {
        toaster.error({ title: "Failed to load posts: " + error });
      }
    }
    fetchPosts();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredPosts = searchValue
    ? posts.filter(
        ({ title, content }) =>
          title.includes(searchValue) || content.includes(searchValue),
      )
    : posts;

  return (
    <Box>
      <Heading title="All Posts" />

      <Box display="flex" justifyContent="space-between" mb={6} gap={4}>
        <InputGroup width={250} startElement={<LuSearch />}>
          <Input
            onChange={handleSearchChange}
            value={searchValue}
            placeholder="Search posts"
          />
        </InputGroup>

        <Link href={PATH.CREATE_POST} passHref legacyBehavior>
          <Button as="a">Create Post</Button>
        </Link>
      </Box>

      <PostsList posts={filteredPosts} isLoading={isLoading} />
    </Box>
  );
};

export default AllPostsPage;
