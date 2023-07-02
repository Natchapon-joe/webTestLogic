import {
  useState,
  useCallback,
  useMemo,
  Profiler,
  ProfilerOnRenderCallback,
} from "react";

function generateRandomNumbers() {
  const numbers: string[] = [];

  while (numbers.length < 4) {
    const randomNumber: number = Math.floor(Math.random() * 10);

    if (!numbers.includes(randomNumber.toString())) {
      numbers.push(randomNumber.toString());
    }
  }

  return numbers;
}

export default function MasterMind() {
  const onRender: ProfilerOnRenderCallback = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    console.log("Actual duration", actualDuration);
  };

  // value in put user
  const [valueInput, setValueInput] = useState<string>("");
  // show log
  const [logChat, setLogChat] = useState<string[]>([]);

  const valueRandom: string[] = useMemo(() => generateRandomNumbers(), []);
  const handleInputUser = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, valueInput: string) => {
      if (event?.key === "Enter" && valueInput !== "") {
        setLogChat((prev) => [...prev, valueInput]);
        handleCheckInput(valueInput);
        setValueInput("");
      }
    },
    [valueInput]
  );

  const handleCheckInput = (value: string) => {
    try {
      let splitString =
        value.length === 4
          ? value?.split("").map((item) => item.trim())
          : value?.split(",").map((item) => item.trim());
      if (splitString.length === 4) {
        let conutValueTrue = 0;
        let countIndexTrue = 0;
        for (let i = 0; i < valueRandom.length; i++) {
          for (let j = 0; j < splitString.length; j++) {
            if (valueRandom[i] === splitString[j] && i === j) {
              conutValueTrue++;
              countIndexTrue++;
            } else if (valueRandom[i] === splitString[j] && i !== j) {
              conutValueTrue++;
            }
          }
        }
        if (conutValueTrue === 4 && countIndexTrue === 4) {
          setLogChat((prev) => [...prev, "You win"]);
        } else {
          setLogChat((prev) => [
            ...prev,
            conutValueTrue + "," + countIndexTrue,
          ]);
        }
      } else {
        setLogChat((prev) => [...prev, "กรุณากรอกให้ถูกต้อง"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profiler id="MasterMind" onRender={onRender}>
      <div className="w-screen min-h-screen flex justify-center">
        <div className="flex flex-col flex-wrap w-full h-full max-w-[800px] max-h-[800px] bg-slate-500 rounded-[8px] my-[12px] shadow-sm">
          <div className="px-[24px] py-[12px] gap-[8px] grid grid-rows-2">
            <div className="w-full text-center text-[24px]">
              {" "}
              <b>Master Mind</b>
            </div>
            <div className="flex flex-1">
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={valueInput}
                placeholder="คอมพิวเตอร์จะมีการแรนดอมเลข 0 – 9 มา 4 ค่าโดยไม่ซ้ำกันน  ตัวอย่างเช่น 3, 6, 0, 9 หรือ 3609"
                onChange={(event) => setValueInput(event?.target?.value)}
                onKeyDown={(event) => handleInputUser(event, valueInput)}
              />
            </div>
            <div className="flex flex-col h-full max-h-[600px] w-full flex-grow bg-[#FFFF] overflow-scroll rounded-[8px] opacity-40">
              <div className="p-[12px]">
                {logChat?.map((value, index) => {
                  if (index % 2 === 0) {
                    return (
                      <div key={index} className="text-end">
                        {value}
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="text-start">
                        {value}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profiler>
  );
}
