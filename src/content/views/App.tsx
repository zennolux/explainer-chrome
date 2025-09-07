import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type Explainer } from "@zennolux/explainer-wasm";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AudioPlayer } from "@/components/audio-player";
import pkg from "../../../package.json";

function App() {
  const [open, setOpen] = useState(false);
  const [explainer, setExplainer] = useState<Explainer | undefined>();

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
          <h2
            style={{ marginTop: "1rem", fontSize: "24px", fontWeight: "bold" }}
          >
            {explainer?.word}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <p>[{explainer?.pronunciation.phonetic_symbol}]</p>
            <p>
              <AudioPlayer url={explainer?.pronunciation.audio_url!} />
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
              <h5
                style={{ marginTop: 0, fontSize: "18px", fontWeight: "bold" }}
              >
                Basic Meanings:
              </h5>
              {explainer?.basic_meanings.map((item) => (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      width: "64px",
                      height: "24px",
                      background: "#99a1af",
                      display: "flex",
                      flexShrink: 0,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.attr}
                  </p>
                  <p style={{ flex: 1 }}>{item.value}</p>
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
                {explainer?.advanced_meanings.map((item) => (
                  <div
                    style={{
                      marginTop: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        width: "64px",
                        height: "24px",
                        background: "#99a1af",
                        display: "flex",
                        flexShrink: 0,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.attr}
                    </p>
                    {item.values.map((value, index) => (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                          gap: "16px",
                        }}
                      >
                        <p style={{ fontWeight: "bold", color: "#99a1af" }}>
                          {index + 1}.
                        </p>
                        <div>
                          <p>{value.en}</p>
                          <p style={{ marginTop: "10px" }}>{value.cn}</p>
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
                      <p style={{ fontWeight: "bold", color: "#99a1af" }}>
                        {index + 1}.
                      </p>
                      <p>
                        <AudioPlayer url={item.audio_url} />
                      </p>
                    </div>
                    <div>
                      <p>
                        {parse(
                          item.en.replace(
                            new RegExp(`(${explainer.word})`, "gi"),
                            `<span className="tw:text-gray-300 tw:underline tw:underline-offset-8">$1</span>`
                          )
                        )}
                      </p>
                      <p style={{ marginTop: "10px" }}>{item.cn}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
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
      </div>
    </div>
  );
}

export default App;
