import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import fileSvg from "../assets/file.svg";
import { api } from "../services/api";

import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";

import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { z, ZodError } from "zod";

const refundsSchema = z.object({
  name: z
    .string()
    .min(1, { message: " Informe um nome claro para sua solicitação " }),
  category: z.string().min(1, { message: "Informe a categoria" }),
  amount: z.coerce
    .number({
      message: "Informe um numero valido",
    })
    .positive({ message: "Informe um numero valido e superior a zero." }),
});

export function Refund() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const navigate = useNavigate();
  const params = useParams();
  // console.log(params.id);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (params.id) {
      return navigate(-1);
    }

    try {
      setIsLoading(true);

      if (!file) {
        return alert("Selecione um arquivo de comprovante");
      }

      const fileUploadFrom = new FormData();
      fileUploadFrom.append("file", file);

      const response = await api.post("/uploads", fileUploadFrom);

      const data = refundsSchema.parse({
        name,
        category,
        amount: amount.replace(",", "."),
      });

      console.log(data);

      await api.post("/refunds", {
        ...data,
        filename: response.data.filename,
      });

      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível realizar a solicitação");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Dados da despesa para solicitar reembolso.{" "}
        </p>
      </header>

      <Input
        required
        legend="Nome da solicitação"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={!!params.id}
      />

      <div className="flex gap-4">
        <Select
          required
          legend="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!params.id}
        >
          {CATEGORIES_KEYS.map((category) => (
            <option key={category} value={category}>
              {CATEGORIES[category].name}
            </option>
          ))}
        </Select>

        <Input
          required
          legend="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={!!params.id}
        />
      </div>

      {params.id ? (
        <a
          href="https://www.google.com/?hl=pt_BR"
          target="_blank"
          className="flex items-center justify-center gap-2 text-green-100 font-semibold my-6 hover:opacity-70 transition ease-linear"
        >
          <img src={fileSvg} alt="icons de file" />
          Abrir comprovante
        </a>
      ) : (
        <Upload
          filename={file && file.name}
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
      )}

      <Button type="submit" isLoading={isLoading}>
        {params.id ? "voltar" : "Enviar"}
      </Button>
    </form>
  );
}
