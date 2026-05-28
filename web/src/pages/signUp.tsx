import { useState } from "react";
import { string, z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router";

const SignUpSchema = z
  .object({
    name: z.string().min(1, { message: "Informe o nome" }),
    email: z.email({ message: "Informe um email valido" }),
    password: z.string().min(6, { message: "Senha deve ter menos 6 dígitos" }),
    passwordConfirm: string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senha nao sao iguais",
    path: ["passwordConfirm"],
  });

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = SignUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm,
      });

      await api.post("/users", data);

      if (confirm("Cadastrado com sucesso, Ir para tela de entrar?")) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }
      if (error instanceof AxiosError) {
        return alert(error.request?.data.message);
      }
    } finally {
    }
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input
        required
        legend="Nome"
        placeholder="Informe seu nome"
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        required
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        required
        legend="Senha"
        type="password"
        placeholder="123456"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        required
        legend="Confirme sua senha"
        type="password"
        placeholder="123456"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <Button type="submit" isLoading={isLoading}>
        Cadastra
      </Button>

      <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear"
      >
        Ja tenho uma conta
      </a>
    </form>
  );
}
