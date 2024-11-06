import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
  PATH,
} from "@/lib/constants";
import { AxiosError } from "axios";
import { thinkEasyApi } from "@/services/apiClient";
import { useRouter } from "next/router";
import { Heading } from "@/components/Heading";

type LoginFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const LogInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = async (data: LoginFormData) => {
    try {
      let accessToken: string;
      let refreshToken: string;

      if (isLogin) {
        const response = await thinkEasyApi.authControllerLogin(data);

        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
      } else {
        const response = await thinkEasyApi.authControllerSignup({
          firstname: data.firstName as string,
          lastname: data.lastName as string,
          email: data.email,
          password: data.password,
        });

        accessToken = response.data.accessToken;
        refreshToken = response.data.refreshToken;
      }

      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);

      toaster.success({ title: "You've been logged in successfully!" });

      router.push({ pathname: PATH.POSTS });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message.length) {
        if (Array.isArray(error?.response.data.message)) {
          error.response?.data.message.forEach((errMessage: string) =>
            toaster.error({ title: "Login failed: " + errMessage }),
          );
        } else {
          toaster.error({
            title: "Login failed: " + error?.response.data.message,
          });
        }
      } else {
        toaster.error({ title: "Login failed: " + error });
      }
    }
  };

  const handleChangeForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box>
      <Heading title={isLogin ? "Log In" : "Sign Up"} isLoginPage />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="4" align="flex-start" maxW="sm">
          {isLogin ? null : (
            <>
              <Field
                label="First name"
                invalid={Boolean(errors.firstName)}
                errorText={errors.firstName?.message}
              >
                <Input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  placeholder="First name"
                />
              </Field>

              <Field
                label="Last name"
                invalid={Boolean(errors.lastName)}
                errorText={errors.lastName?.message}
              >
                <Input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="Last name"
                />
              </Field>
            </>
          )}

          <Field
            label="Email"
            invalid={Boolean(errors.email)}
            errorText={errors.email?.message}
          >
            <Input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
            />
          </Field>

          <Field
            label="Password"
            invalid={Boolean(errors.password)}
            errorText={errors.password?.message}
          >
            <Input
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              type="password"
            />
          </Field>

          <Button type="submit">{isLogin ? "Log In" : "Sign Up"}</Button>

          <Button variant="subtle" mt={4} onClick={handleChangeForm}>
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Log In"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LogInPage;
