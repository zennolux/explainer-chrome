import { type PropsWithChildren, type CSSProperties } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IoVolumeMediumOutline as Volume,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { name, version, homepage } from "../../package.json";

export function Container({
  children,
  open,
  setOpen,
}: PropsWithChildren<{ open: boolean; setOpen: CallableFunction }>) {
  return (
    <div
      className={`${open ? "explainer-animation" : "tw:hidden"}`}
      style={{
        position: "fixed",
        top: 0,
        right: "-400px",
        height: "100vh",
        width: "400px",
        background: "#1e2939",
        color: "#ebe7eb",
        zIndex: 10000,
        fontSize: "18px",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
      }}
    >
      <IoCloseCircleOutline
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 20000,
          color: "#99a1af",
          fontSize: "24px",
        }}
        onClick={() => setOpen(false)}
      />
      {children}
    </div>
  );
}

export function Header({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        height: "15%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {children}
    </div>
  );
}

export function Content({ children }: PropsWithChildren) {
  return (
    <ScrollArea style={{ height: "75%" }}>
      <div
        style={{
          marginTop: "16px",
          marginLeft: "16px",
          marginRight: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {children}
      </div>
    </ScrollArea>
  );
}

export function Title({
  children,
  size = "normal",
}: PropsWithChildren<{ size?: ["large", "normal"][number] }>) {
  return (
    <h5
      style={{
        marginTop: 0,
        fontSize: size == "large" ? "24px" : "18px",
        fontWeight: "bold",
      }}
    >
      {children}
    </h5>
  );
}

export function AudioPlayer({
  url,
  onPlay,
  isPlaying = false,
}: {
  url: string;
  onPlay?: CallableFunction;
  isPlaying?: boolean;
}) {
  const playAudio = async (url: string) => {
    if (!chrome.runtime?.id) {
      return;
    }

    const response = await chrome.runtime.sendMessage({
      type: "PLAY_AUDIO",
      target: "background",
      data: { url },
    });

    true === response.startPlay && onPlay && onPlay(url);
  };

  return (
    <Volume
      className={`tw:text-gray-400 tw:hover:text-gray-200 ${
        isPlaying && "tw:animate-ping"
      }`}
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
        <a style={{ color: "#6a7282" }} href={homepage} target="_blank">
          {name}
        </a>
      </p>
      <p>{version}</p>
    </div>
  );
}
