import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useAuthentication } from "../../hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import "./style.scss";
import { ILogin } from "../../models";
import Swal from "sweetalert2";

type Inputs = {
  email: string;
  password: string;
};

export const Login: React.FC = () => {
  const { mutateLogin, result } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: ILogin) =>
    mutateLogin(data).catch(() =>
      Swal.fire("Error!", "Email or Password is incorrect!", "error")
    );
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Login As Admin</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 8,
                    message: "Enter a valid email!",
                  },
                })}
              />
            </FormControl>
            {errors.email ? (
              <p className="error-messages">{errors.email?.message}</p>
            ) : (
              <br />
            )}

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters!",
                  },
                })}
              />
            </FormControl>
            {errors.password ? (
              <p className="error-messages">{errors.password?.message}</p>
            ) : (
              <br />
            )}
            <Stack spacing={6}>
              <Button colorScheme={"blue"} variant={"solid"} type="submit">
                Sign in
              </Button>
            </Stack>
            {result === "error" && (
              <p className="error-messages">Email or Password is incorrect!</p>
            )}
          </form>
        </Stack>
      </Flex>
    </Stack>
  );
};
