import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { type Explainer } from "@zennolux/explainer-wasm";
import {
  AttrTag,
  AudioPlayer,
  Container,
  Content,
  Footer,
  Header,
  Paragraph,
  Title,
} from "@/components/explainer";

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

  useEffect(() => explainer && setOpen(true), [explainer]);

  return (
    <Container open={open} setOpen={setOpen}>
      <Header>
        <Title size="large">{explainer?.word}</Title>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--item-space)",
          }}
        >
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
      </Header>
      <Content>
        <div>
          <Title>Basic Meanings:</Title>
          {explainer?.basic_meanings.map((item, index) => (
            <div
              key={index}
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "var(--item-space)",
              }}
            >
              <AttrTag value={item.attr} />
              <Paragraph>{item.value}</Paragraph>
            </div>
          ))}
        </div>
        {explainer?.advanced_meanings.length! > 0 && (
          <div>
            <Title>Advanced Meanings:</Title>
            {explainer?.advanced_meanings.map((item, key) => (
              <div
                key={key}
                style={{
                  marginTop: "var(--item-space)",
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
                      gap: "var(--item-space)",
                    }}
                  >
                    <Paragraph style={{ fontWeight: "bold", color: "#99a1af" }}>
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
            <Title>Sample Sentences:</Title>
            {explainer?.sentences.map((item, index) => (
              <div
                key={index}
                style={{
                  marginTop: "var(--item-space)",
                  display: "flex",
                  alignItems: "start",
                  gap: "var(--item-space)",
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
                      onPlay={(url: string) => setAudioPlaying({ [url]: true })}
                      isPlaying={audioPlaying && audioPlaying[item.audio_url]}
                    />
                  </p>
                </div>
                <div
                  style={
                    audioPlaying && audioPlaying[item.audio_url]
                      ? { color: "#e5e7eb" }
                      : {}
                  }
                >
                  <Paragraph>
                    {parse(
                      item.en.replace(
                        new RegExp(`(${explainer.word})`, "gi"),
                        `<span className="tw:font-bold tw:underline tw:underline-offset-8">$1</span>`
                      )
                    )}
                  </Paragraph>
                  <Paragraph style={{ marginTop: "10px" }}>{item.cn}</Paragraph>
                </div>
              </div>
            ))}
          </div>
        )}
      </Content>
      <Footer />
    </Container>
  );
}

export default App;
