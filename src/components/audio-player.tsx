import { IoVolumeMediumOutline as Volume } from "react-icons/io5";

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
