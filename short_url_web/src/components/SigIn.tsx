import { Button, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { Input } from "./Form/Input";
import { InputPassword } from "./Form/InputPassword";
interface FormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido!")
    .required("E-mail é obrigatório!"),
  password: Yup.string().required("Senha é obrigatória!"),
});

export const SignIn = () => {
  const { signIn } = useAuth();

  const handleSignIn = ({ email, password }: FormData) => {
    signIn(email, password);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  return (
    <Stack
      flex="1"
      spacing={4}
      as="form"
      maxW="96"
      align="center"
      onSubmit={handleSubmit(handleSignIn)}
    >
      <Input placeholder="E-mail" {...register("email")} error={errors.email} />

      <InputPassword
        placeholder="Senha"
        {...register("password")}
        error={errors.password}
      />

      <Button title="Entrar" colorScheme="purple" type="submit" width="100%">
        Entrar
      </Button>
    </Stack>
  );
};