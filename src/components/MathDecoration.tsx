export default function MathDecoration() {
  const symbols = [
    { char: "Σ", top: "3%", side: "left", offset: "3%", size: "3.5rem", rotate: "-8deg" },
    { char: "%", top: "13%", side: "right", offset: "4%", size: "2.5rem", rotate: "6deg" },
    { char: "√", top: "24%", side: "left", offset: "6%", size: "2.75rem", rotate: "4deg" },
    { char: "π", top: "22%", side: "right", offset: "8%", size: "3.5rem", rotate: "-4deg" },
    { char: "÷", top: "37%", side: "right", offset: "2%", size: "2.2rem", rotate: "-10deg" },
    { char: "∑", top: "40%", side: "left", offset: "1%", size: "2.25rem", rotate: "8deg" },
    { char: "≈", top: "50%", side: "left", offset: "5%", size: "3rem", rotate: "10deg" },
    { char: "Δ", top: "48%", side: "right", offset: "6%", size: "4.5rem", rotate: "-6deg" },
    { char: "×", top: "62%", side: "right", offset: "3%", size: "2.25rem", rotate: "12deg" },
    { char: "∫", top: "60%", side: "left", offset: "8%", size: "3.25rem", rotate: "-5deg" },
    { char: "%", top: "72%", side: "left", offset: "2%", size: "3.5rem", rotate: "-9deg" },
    { char: "θ", top: "74%", side: "right", offset: "1%", size: "3.5rem", rotate: "7deg" },
    { char: "√", top: "85%", side: "right", offset: "7%", size: "2.25rem", rotate: "-3deg" },
    { char: "Δ", top: "88%", side: "left", offset: "4%", size: "4.5rem", rotate: "9deg" },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {symbols.map((s, i) => (
        <span
          key={i}
          className="absolute font-[family-name:var(--font-serif)]"
          style={{
            top: s.top,
            [s.side]: s.offset,
            fontSize: s.size,
            transform: `rotate(${s.rotate})`,
            color: "var(--ink-muted)",
            opacity: 0.28,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}