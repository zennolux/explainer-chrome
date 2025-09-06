import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Explainer } from "@zennolux/explainer-wasm";
import {
  IoCloseCircleOutline,
  IoVolumeMediumOutline as Volume,
} from "react-icons/io5";

function App() {
  const [open, setOpen] = useState(false);
  const [explainer, setExplainer] = useState<Explainer | undefined>();

  const playAudio = (url: string) => {
    chrome.runtime.sendMessage({
      type: "PLAY_AUDIO",
      target: "background",
      data: { url },
    });
  };

  useEffect(() => {
    document.addEventListener("dblclick", () => {
      const word = window.getSelection()?.toString().trim();
      console.info(word);

      if (!word || word?.length < 1) {
        return;
      }

      if (!/^[a-zA-Z]{2,}$/.test(word)) {
        return;
      }

      document.body.style.overflow = "hidden";

      chrome.runtime.sendMessage(
        { type: "FETCH_EXPLAINED_DATA", target: "background", data: { word } },
        (response: Explainer | undefined) => {
          setExplainer(response);
        }
      );
    });
  }, []);

  useEffect(() => {
    console.info(explainer);
    if (explainer) {
      setOpen(true);
    }
  }, [explainer]);

  return (
    <div style={{ display: `${open ? "block" : "none"}` }}>
      <IoCloseCircleOutline
        style={{
          position: "fixed",
          top: "0",
          right: "0",
          zIndex: 20000,
          color: "#99a1af",
          fontSize: "24px",
        }}
        onClick={() => setOpen(false)}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "400px",
          background: "#1e2939",
          color: "white",
          zIndex: 10000,
          fontSize: "18px",
        }}
      >
        <div
          style={{
            height: "15%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            {explainer?.word}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <p>[{explainer?.pronunciation.phonetic_symbol}]</p>
            <p>
              <Volume
                className="tw:hover:text-gray-300"
                style={{ fontSize: "20px" }}
                onClick={() => playAudio(explainer?.pronunciation.audio_url!)}
              />
            </p>
          </div>
        </div>
        <ScrollArea style={{ height: "75%" }}>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
          <p>Just a test!</p>
        </ScrollArea>
        <div style={{ height: "10%" }}></div>
      </div>
    </div>
  );
}

export default App;
