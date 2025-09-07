export function AttrTag({ value }: { value: string }) {
  return (
    <p
      className="tw:bg-gray-500"
      style={{
        fontWeight: "bold",
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
