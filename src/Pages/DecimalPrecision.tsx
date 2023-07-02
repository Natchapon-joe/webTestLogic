import { useState } from "react";
export default function DecimalPrecision() {
  const [input, setInput] = useState<{
    input1: string;
    input2: string;
    decimal: string;
  }>({
    input1: "",
    input2: "",
    decimal: "",
  });
  const [resultValue, setResultValue] = useState<string>("");

  function findDecimal(x: number, y: number, precision: number) {
    let remainder = x % y;
    let decimal = "";
    for (let i = 0; i < precision; i++) {
      remainder *= 10;
      let digit = Math.floor(remainder / y);
      decimal += digit.toString();
      remainder %= y;
    }

    return decimal[precision - 1];
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const numericValue = event?.target?.value.replace(/\+|-/gi, "");
    if (
      (!isNaN(parseInt(numericValue)) && /^\d*\.?\d*$/.test(numericValue)) ||
      numericValue === ""
    ) {
      setInput((prev) => ({
        ...prev,
        [key]: numericValue,
      }));
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setResultValue(
      findDecimal(
        parseInt(input.input1),
        parseInt(input.input2),
        parseInt(input.decimal)
      )
    );
    setInput({ input1: "", input2: "", decimal: "" });
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-[800px] h-full max-h-[500px] bg-[#bbecec] rounded-[8px]">
        <div className="w-full max-w-[500px] flex flex-col items-center">
          <div>DecimalPrecision</div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="flex flex-col gap-[4px] px-[8px]"
          >
            <div className="grid grid-cols-2 gap-[8px] w-full flex-wrap">
              <div className="flex relative mb-3 w-full flex-wrap flex-col">
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  aria-label="readonly input example"
                  value={input?.input1}
                  onChange={(event) => {
                    handleChange(event, "input1");
                  }}
                />
                <label
                  className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                    input?.input1 ? "translate-y-[-0.9rem] scale-75" : ""
                  }`}
                >
                  กรอกตัวเลขแรก
                </label>
              </div>
              <div className="relative mb-3 ">
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  aria-label="readonly input example"
                  value={input?.input2}
                  onChange={(event) => {
                    handleChange(event, "input2");
                  }}
                />
                <label
                  className={`pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out ${
                    input?.input2 ? "translate-y-[-0.9rem] scale-75" : ""
                  }`}
                >
                  กรอกตัวที่สอง
                </label>
              </div>
            </div>
            <div className="relative mb-3 w-full items-start justify-start">
              <input
                type="text"
                className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-100 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear  peer-focus:text-primary motion-reduce:transition-none dark:bg-neutral-700 dark:text-neutral-200 dark:peer-focus:text-primary"
                aria-label="readonly input example"
                placeholder="กรอกตำแหน่งทศนิยม"
                pattern="[0-9]*"
                value={input?.decimal}
                onChange={(event) => {
                  handleChange(event, "decimal");
                }}
              />
            </div>
            <div className="">
              <input
                type="submit"
                value={"submit"}
                className="w-full h-full cursor-pointer text-center bg-[#444] text-[#FFFF] rounded-[4px]"
              />
            </div>
            <div className="w-full h-full bg-white border-[1px] border-black rounded-[8px]">
              {resultValue}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
