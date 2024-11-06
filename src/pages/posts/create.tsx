import { useForm } from "react-hook-form";
import { Box, Button, Input, Stack, Textarea } from "@chakra-ui/react";
import { PATH } from "@/lib/constants";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import { thinkEasyApi } from "@/services/apiClient";
import { useRouter } from "next/router";
import { Heading } from "@/components/Heading";

type PostFormData = {
  title: string;
  content: string;
};

const CreatePostPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>();

  const onSubmit = async (data: PostFormData) => {
    try {
      await thinkEasyApi.postsControllerCreate(data);
      toaster.success({ title: "Post saved successfully!" });
      reset();
      router.push({ pathname: PATH.POSTS });
    } catch (error) {
      toaster.error({ title: "Failed to create post: " + error });
      throw error;
    }
  };

  return (
    <Box>
      <Heading title="Create a Post" showBackButton />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4" align="flex-start" maxW="sm">
          <Field
            label="Title"
            invalid={!!errors.title}
            errorText={errors.title?.message}
          >
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="Title"
            />
          </Field>

          <Field
            label="Content"
            invalid={!!errors.content}
            errorText={errors.content?.message}
          >
            <Textarea
              {...register("content", { required: "Content is required" })}
              placeholder="Start typing..."
              variant="outline"
            />
          </Field>

          <Button type="submit">Create Post</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreatePostPage;
