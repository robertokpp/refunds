export type RefundItemProps = {
  id: string;
  name: string;
  category: string;
  amount: string;
  categoryIcon: string;
};

type Props = React.ComponentProps<"a"> & {
  data: RefundItemProps;
};

export function RefundItem({ data, ...rest }: Props) {
  return (
    <a
      className="flex items-center gap-3 hover:bg-green-100/5 cursor-pointer rounded-md p-2"
      {...rest}
    >
      <img src={data.categoryIcon} alt="" className="w-8 h-8" />
      <div className="flex flex-1 flex-col">
        <strong className="text-sm text-gray-100">{data.name}</strong>
        <span className="text-xs text-gray-200">{data.category}</span>
      </div>

      <span className="text-sm text-gray-100 font-semibold">
        <small className="font-normal text-gray-200">R$</small>
        {data.amount}
      </span>
    </a>
  );
}
