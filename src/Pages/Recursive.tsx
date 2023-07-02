import {
  useCallback,
  useState,
  useEffect,
  Profiler,
  ProfilerOnRenderCallback,
} from "react";

export default function Recursive() {
  const [valueInput, setValueInput] = useState<string>("");
  const [arrValue, setArrValue] = useState<number[]>([]);
  const [showOutPut, setShowOutPut] = useState<number[][]>([]);

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

  function permutations(nums: number[]): number[][] {
    if (nums.length <= 1) {
      return [nums];
    }
    const result: number[][] = [];

    for (let i = 0; i < nums.length; i++) {
      const currentNum = nums[i];
      const remainingNums = nums.filter((_, index) => index !== i);
      const subPermutations = permutations(remainingNums);

      for (const permutation of subPermutations) {
        result.push([currentNum, ...permutation]);
      }
    }

    return result;
  }

  const handleInputUser = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>, valueInput: string) => {
      if (event?.key === "Enter" && valueInput !== "") {
        handleInputUserValue(valueInput);
        setValueInput("");
      }
    },
    [valueInput]
  );

  const handleInputUserValue = useCallback(
    (value: string) => {
      const splitValueToArrInt = value.split(",").map((value) => {
        return parseInt(value.trim());
      });
      setArrValue(splitValueToArrInt);
    },
    [handleInputUser]
  );

  useEffect(() => {
    if (arrValue.length > 0) {
      const permutation: number[][] = permutations(arrValue);
      setShowOutPut([...permutation]);
    }
  }, [arrValue]);
  return (
    <Profiler id="Recursive" onRender={onRender}>
      <div className="w-screen min-h-screen flex justify-center items-start">
        <div className="flex flex-col w-full max-w-[800px] max-h-screen bg-slate-500 rounded-[8px] my-[12px] shadow-sm">
          <div className="px-[24px] py-[12px] gap-[8px] grid grid-rows-2 ">
            <div className="w-full text-center text-[24px]">
              {" "}
              <b>Permutations</b>
            </div>
            <div className="flex flex-1">
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={valueInput}
                placeholder="ใส่ค่าตามตัวอย่าง 1,2,3 "
                onChange={(event) => setValueInput(event?.target?.value)}
                onKeyDown={(event) => handleInputUser(event, valueInput)}
              />
            </div>
            <div className="flex flex-col h-full w-full max-h-[500px] flex-grow bg-[#FFFF] overflow-scroll rounded-[8px] opacity-40">
              <div className="">
                {showOutPut.map((value, index) => {
                  return <div key={index}>{value.toString()}</div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Profiler>
  );
}
