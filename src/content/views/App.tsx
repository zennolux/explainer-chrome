import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Explainer } from "@zennolux/explainer-wasm";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  AttrTag,
  AudioPlayer,
  Footer,
  Paragraph,
} from "@/components/explainer";
import { hideVerticalScrollbar, showVerticalScrollbar } from "@/lib/scrollbar";

function App() {
  const [open, setOpen] = useState(false);
  const [explainer, setExplainer] = useState<Explainer | undefined>();
  const [audioPlaying, setAudioPlaying] = useState<{
    [prop: string]: boolean;
  }>();

  useEffect(() => {
    if (!chrome.runtime?.id) {
      return;
    }

    document.addEventListener("dblclick", () => {
      const word = window.getSelection()?.toString().trim();

      if (!word || word?.length < 1) {
        return;
      }

      if (!/^[a-zA-Z]{2,}$/.test(word)) {
        return;
      }

      chrome.runtime.sendMessage(
        { type: "FETCH_EXPLAINED_DATA", target: "background", data: { word } },
        (response: Explainer | undefined) => {
          if (!response) {
            return;
          }
          setExplainer(response);
        }
      );
    });

    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      const { target, type, data } = message;

      if (
        target != "contentscript" ||
        type != "AUDIO_COMPLETED_TO_PLAY" ||
        !data.ended
      ) {
        return;
      }

      setAudioPlaying({ [data.url]: false });
      sendResponse(true);
      return true;
    });
  }, []);

  useEffect(() => {
    console.info(explainer);
    if (explainer) {
      setOpen(true);
    }
  }, [explainer]);

  useEffect(() => {
    if (open) {
      hideVerticalScrollbar();
      return;
    }
    showVerticalScrollbar();
  }, [open]);

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
        <h2 style={{ marginTop: "1rem", fontSize: "24px", fontWeight: "bold" }}>
          {explainer?.word}
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <p>[{explainer?.pronunciation.phonetic_symbol}]</p>
          <p>
            <AudioPlayer
              url={explainer?.pronunciation.audio_url!}
              onPlay={(url: string) => {
                setAudioPlaying({ [url]: true });
              }}
              isPlaying={
                audioPlaying &&
                audioPlaying[explainer?.pronunciation.audio_url!]
              }
            />
          </p>
        </div>
      </div>
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
          <div>
            <h5 style={{ marginTop: 0, fontSize: "18px", fontWeight: "bold" }}>
              Basic Meanings:
            </h5>
            {explainer?.basic_meanings.map((item, index) => (
              <div
                key={index}
                style={{
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <AttrTag value={item.attr} />
                <Paragraph>{item.value}</Paragraph>
              </div>
            ))}
          </div>
          {explainer?.advanced_meanings.length! > 0 && (
            <div>
              <h5
                style={{ marginTop: 0, fontSize: "18px", fontWeight: "bold" }}
              >
                Advanced Meanings:
              </h5>
              {explainer?.advanced_meanings.map((item, key) => (
                <div
                  key={key}
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <AttrTag value={item.attr} />
                  {item.values.map((value, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "16px",
                      }}
                    >
                      <Paragraph
                        style={{ fontWeight: "bold", color: "#99a1af" }}
                      >
                        {index + 1}.
                      </Paragraph>
                      <div>
                        <Paragraph>{value.en}</Paragraph>
                        <Paragraph style={{ marginTop: "10px" }}>
                          {value.cn}
                        </Paragraph>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {explainer?.sentences.length! > 0 && (
            <div>
              <h5
                style={{ marginTop: 0, fontSize: "18px", fontWeight: "bold" }}
              >
                Sample Sentences:
              </h5>
              {explainer?.sentences.map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "start",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Paragraph style={{ fontWeight: "bold", color: "#99a1af" }}>
                      {index + 1}.
                    </Paragraph>
                    <p>
                      <AudioPlayer
                        url={item.audio_url}
                        onPlay={(url: string) =>
                          setAudioPlaying({ [url]: true })
                        }
                        isPlaying={audioPlaying && audioPlaying[item.audio_url]}
                      />
                    </p>
                  </div>
                  <div>
                    <Paragraph>
                      {parse(
                        item.en.replace(
                          new RegExp(`(${explainer.word})`, "gi"),
                          `<span className="tw:text-gray-300 tw:underline tw:underline-offset-[5px]">$1</span>`
                        )
                      )}
                    </Paragraph>
                    <Paragraph style={{ marginTop: "10px" }}>
                      {item.cn}
                    </Paragraph>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
      <Footer />
    </div>
  );
}

export default App;
