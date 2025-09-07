export function AttrTag({ value }: { value: string }) {
  return (
    <p
      style={{
        fontWeight: "bold",
        background: "#99a1af",
        width: "64px",
        height: "24px",
        display: "flex",
        flexShrink: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {value}
    </p>
  );
}
