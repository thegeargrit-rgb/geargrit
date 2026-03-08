"use client";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
  className?: string;
};

export function FaqAccordion({ items, className }: Props) {
  return (
    <div className={className ?? "grid gap-2"}>
      {items.map((item, index) => (
        <details key={`${item.question}-${index}`} className="rounded-md border bg-background p-3">
          <summary className="cursor-pointer text-sm font-medium">{item.question}</summary>
          <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}