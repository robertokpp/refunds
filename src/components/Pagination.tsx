import { Button } from "./Button";
import leftSvg from "../assets/left.svg";
import rightSvg from "../assets/right.svg";

type Props = {
  current: number;
  total: number;
};

export function Pagination({ current, total }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center gap-4">
      <Button variant="iconSmall">
        <img src={leftSvg} alt="Icon de esquerda" />
      </Button>
      <span className="text-sm text-gray-200">
        {current}/{total}
      </span>
      <Button variant="iconSmall">
        <img src={rightSvg} alt="Icon de direita" />
      </Button>
    </div>
  );
}
