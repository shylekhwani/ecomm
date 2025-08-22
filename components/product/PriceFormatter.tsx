import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = new Number(amount).toLocaleString("en-US", {
    currency: "USD",
    style: "currency",
    minimumFractionDigits: 2,
  });
  return (
    <span
      className={twMerge("text-sm font-semibold text-[#151515]", className)}
    >
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;

/*
--> new Number(amount) → wraps the number in a Number object.

--> .toLocaleString("en-US", { ... }) formats the number according to U.S. currency rules.
       --currency: "USD" → display as dollars.
       --style: "currency" → show the $ sign and proper money formatting.
       --minimumFractionDigits: 2 → always show two decimal places.
 */