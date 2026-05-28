import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useActionState } from "react";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

const signInScheme = z.object({
  email: z.email({ message: "E-mail invalido" }),
  password: z.string().trim().min(1, { message: " Informe a senha" }),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null);
  const auth = useAuth();

  async function signIn(_: any, formData: FormData) {
    try {
      const data = signInScheme.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const response = await api.post("/sessions", data);

      auth.save(response.data);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return { message: " Não foi possível entrar!" };
    }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="E-mail"
        name="email"
        type="email"
        placeholder="seu@email.com"
      />

      <Input
        required
        legend="Senha"
        name="password"
        type="password"
        placeholder="123456"
      />

      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>

      <Button type="submit" isLoading={isLoading}>
        Entra
      </Button>

      <a
        href="/signup"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Criar conta
      </a>
    </form>
  );
}
