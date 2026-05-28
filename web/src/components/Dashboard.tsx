import { useState } from "react";
import { Input } from "./Input";
import { RefundItem, type RefundItemProps } from "./RefundItem";
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
  const [page, setPage] = useState(1);
  const [totalOfPage, setTotalOfPage] = useState(10);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([REFUND_EXAMPLE]);

  function handlePagination(action: "next" | "previous") {
    setPage((prevPage) => {
      if (action === "next" && prevPage < totalOfPage) {
        return prevPage + 1;
      }

      if (action === "previous" && prevPage > 1) {
        return prevPage - 1;
      }

      return prevPage;
    });
  }

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

      <div className="my-6 flex flex-col gap-4 max-h-85.5 overflow-y-scroll">
        {refunds.map((item) => (
          <RefundItem key={item.id} data={item} href={`/refunds/${item.id}`} />
        ))}
      </div>

      <Pagination
        current={page}
        total={totalOfPage}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </div>
  );
}
