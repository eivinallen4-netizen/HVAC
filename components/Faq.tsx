"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";
import { Icon } from "./Icon";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item${isOpen ? " open" : ""}`} key={f.q}>
            <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              {f.q}
              <span className="faq-ic">
                <Icon name="plus" size={18} />
              </span>
            </button>
            <div className="faq-a">
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
