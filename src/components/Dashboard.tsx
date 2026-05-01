import { useState } from "react";
import { Input } from "./input";
import { RefundItem } from "./RefundItem";
import { CATEGORIES } from "../utils/categories";
import { Button } from "./Button";
import { formatCurrency } from "../utils/formatCurrency";
import searchSvg from "../assets/search.svg";
import { Pagination } from "./Pagination";

const REFUND_EXAMPLE = {
  id: "123",
  name: "roberto",
  category: "Transporte",
  amount: formatCurrency(232),
  categoryIcon: CATEGORIES["transport"].icon,
};

export function Dashboard() {
  const [name, setName] = useState("");

  function fetchRefunds(e: React.SubmitEvent) {
    e.preventDefault();

    console.log(name);
  }
  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-3xl">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

      <form
        onSubmit={fetchRefunds}
        className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
        />

        <Button variant="icon" type="submit">
          <img src={searchSvg} alt="Icon de busca" className="w-5" />
        </Button>
      </form>

      <div className="mt-6 flex flex-col gap-4 max-h-85.5 overflow-y-scroll">
        <RefundItem data={REFUND_EXAMPLE} />
      </div>

      <Pagination current={1} total={10}/>
    </div>
  );
}
