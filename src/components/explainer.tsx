import { type PropsWithChildren, type CSSProperties } from "react";
import { IoVolumeMediumOutline as Volume } from "react-icons/io5";
import pkg from "../../package.json";

export function AudioPlayer({ url }: { url: string }) {
  const playAudio = (url: string) => {
    chrome.runtime.sendMessage({
      type: "PLAY_AUDIO",
      target: "background",
      data: { url },
    });
  };

  return (
    <Volume
      className="tw:text-gray-400 tw:hover:text-gray-200"
      style={{ fontSize: "24px" }}
      onClick={() => playAudio(url)}
    />
  );
}

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

export function Paragraph({
  children,
  style,
}: PropsWithChildren<{
  style?: CSSProperties;
}>) {
  return <p style={{ lineHeight: 1.6, ...style }}>{children}</p>;
}

export function Footer() {
  return (
    <div
      className="tw:text-gray-500"
      style={{
        height: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <p className="tw:underline tw:underline-offset-8">
        <a
          style={{ color: "#6a7282" }}
          href="https://github.com/zennolux/explainer"
          target="_blank"
        >
          {pkg.name}
        </a>
      </p>
      <p>v{pkg.version}</p>
    </div>
  );
}
