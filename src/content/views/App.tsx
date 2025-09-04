import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { IoVolumeMediumOutline as Volume } from "react-icons/io5";
import { type Explainer } from "@zennolux/explainer-wasm";

function App() {
  const [explainer, setExplainer] = useState<Explainer | undefined>();
  const [openSheet, setOpenSheet] = useState(false);

  const playAudio = (url: string) => {
    chrome.runtime.sendMessage({
      type: "PLAY_AUDIO",
      target: "background",
      data: { url },
    });
  };

  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    console.info(theme);

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
          setExplainer(response);
        }
      );
    });
  }, []);

  useEffect(() => {
    console.info(explainer);
    if (explainer) {
      setOpenSheet(true);
    }
  }, [explainer]);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <SheetContent
        className="tw:border-border tw:outline-ring/50 tw:bg-background tw:text-foreground tw:h-full tw:font-mon"
        style={{ zIndex: 1000000 }}
        side="bottom"
      >
        <SheetHeader className="tw:h-[12%]">
          <SheetTitle className="tw:flex tw:justify-center tw:items-center">
            {explainer?.word}
          </SheetTitle>
          <SheetDescription className="tw:mt-2 tw:flex tw:justify-center tw:items-center tw:gap-2">
            <p>[{explainer?.pronunciation.phonetic_symbol}]</p>
            <p>
              <Volume
                className="tw:text-2xl tw:hover:text-gray-300"
                onClick={() => playAudio(explainer?.pronunciation.audio_url!)}
              />
            </p>
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="tw:w-[99%] tw:h-[78%]">
          <div className="tw:mt-2 tw:mx-2">
            <h4 className="tw:dark:text-gray-200">Basic Meanings:</h4>
            {explainer?.basic_meanings.map((item) => (
              <div className="tw:mt-2 tw:flex tw:gap-2">
                <h4 className="tw:flex tw:justify-center tw:items-center tw:text-gray-100 tw:font-extrabold tw:w-15 tw:h-5 tw:bg-gray-800 tw:shadow-background">
                  {item.attr}
                </h4>
                <p className="tw:dark:text-gray-300">{item.value}</p>
              </div>
            ))}
          </div>
          {explainer?.advanced_meanings.length! > 0 && (
            <div className="tw:mt-2 tw:mx-2">
              <h4 className="tw:dark:text-gray-200">Advanced Meanings:</h4>
              {explainer?.advanced_meanings.map((item, index) => (
                <div className="tw:mt-2" key={index}>
                  <div className="tw:flex tw:flex-col tw:gap-2">
                    <h4 className="tw:flex tw:justify-center tw:items-center tw:text-gray-100 tw:font-extrabold tw:w-15 tw:h-5 tw:bg-gray-800 tw:shadow-background">
                      {item.attr}
                    </h4>
                    <div>
                      {item.values.map((value, key) => (
                        <>
                          <div className="tw:flex tw:gap-2 tw:mt-2" key={key}>
                            <h4 className="tw:text-gray-500">{key + 1}.</h4>
                            <div className="tw:flex tw:flex-col tw:gap-1">
                              <p>{value.en}</p>
                              <p>{value.cn}</p>
                            </div>
                          </div>
                          {key < item.values.length - 1 && (
                            <Separator className="tw:mt-1" />
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {explainer?.sentences.length! > 0 && (
            <div className="tw:mt-2 tw:mx-2">
              <h4 className="tw:dark:text-gray-200">Sample Sentences:</h4>
              {explainer?.sentences.map((item, index) => (
                <div className="tw:mt-2" key={index}>
                  <div className="tw:flex tw:gap-2 tw:items-start">
                    <div className="tw:flex tw:gap-1">
                      <h4 className="tw:text-gray-500">{index + 1}.</h4>
                      <p>
                        <Volume
                          className="tw:text-2xl tw:text-gray-400 tw:hover:text-gray-300"
                          onClick={() => playAudio(item.audio_url)}
                        />
                      </p>
                    </div>
                    <div className="tw:flex tw:flex-col tw:gap-1">
                      <p>
                        {parse(
                          item.en.replace(
                            new RegExp(`(${explainer.word})`, "gi"),
                            `<span className="tw:font-extrabold tw:dark:text-gray-100 tw:underline tw:underline-offset-4">$1</span>`
                          )
                        )}
                      </p>
                      <p>{item.cn}</p>
                    </div>
                  </div>
                  {index < explainer.sentences.length - 1 && (
                    <Separator className="tw:mt-1" />
                  )}
                </div>
              ))}
            </div>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <SheetFooter className="tw:h-[10%] tw:w-full"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default App;
