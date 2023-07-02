import { useEffect, useState } from "react";
import data from "../Data/eng_language_data.json";
export default function AdvanceSearch() {
  const [input, setInput] = useState<{
    inputRegions: string;
    inputProvinces: string;
    inputLanguage: string;
  }>({
    inputRegions: "",
    inputProvinces: "",
    inputLanguage: "",
  });
  const [listCheckRegions, setListCheckRegions] = useState<string[]>([]);
  const [listCheckProvinces, setListCheckProvinces] = useState<string[]>([]);
  const [checkBoxProvinces, setCheckBoxProvinces] = useState<string[]>([]);
  const [listCheckLanguages, setListCheckLanguages] = useState<string[]>([]);
  let provinces: string[] = Object?.keys(data)?.flatMap((region) =>
    Object?.keys(data[region as keyof typeof data])
  );

  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    if (
      (listCheckLanguages.length === 0 && listCheckRegions.length > 0) ||
      listCheckProvinces.length > 0
    ) {
      for (const region in data) {
        const detailRegions = data[region as keyof typeof data];
        for (const detailRegion in detailRegions) {
          const languages: string[] =
            detailRegions[detailRegion as keyof typeof detailRegions];
          languages?.forEach((language: any) => {
            setLanguages((prev) => [...prev, language]);
          });
        }
      }
    }
  }, []);

  const handleCheckBox = (value: string, status: boolean) => {
    const checkBoxesAll = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    const checkBoxe = document.getElementById(value) as HTMLInputElement;

    if (value === "all" && status === true) {
      setListCheckRegions(Object.keys(data));

      checkBoxesAll.forEach((checkbox) => {
        checkbox.checked = true;
      });
      setListCheckProvinces([]);
      provinces = [];
    } else {
      checkBoxesAll.forEach((checkbox) => {
        checkbox.checked = false;
      });
      setListCheckRegions([]);
    }
    if (status === true && value !== "all") {
      checkBoxe.checked = true;
      setListCheckRegions((prev) => [...prev, value]);
    } else if (value !== "all") {
      const filterRegoin = listCheckRegions.filter((region) => {
        return region !== value;
      });
      checkBoxe.checked = false;
      setListCheckRegions(filterRegoin);
      setListCheckLanguages([]);
    }
  };

  const handleCheckBoxProvinces = (value: string, status: boolean) => {
    if (status === true) {
      setCheckBoxProvinces((prev) => [...prev, value]);
    } else {
      const filterRegoin = checkBoxProvinces.filter((provinces) => {
        return provinces !== value;
      });
      setCheckBoxProvinces(filterRegoin);
    }
  };

  useEffect(() => {
    const sortedArray = listCheckRegions.sort((a, b) => {
      const indexA = Object.keys(data).indexOf(a);
      const indexB = Object.keys(data).indexOf(b);
      return indexA - indexB;
    });
    setListCheckRegions(sortedArray);

    const filterprovinces = listCheckRegions.flatMap((Region) => {
      return Object.keys(data[Region as keyof typeof data]);
    });
    const sortedArrayProvinces = filterprovinces.sort((a, b) => {
      const indexA = provinces?.indexOf(a);
      const indexB = provinces?.indexOf(b);
      return indexA - indexB;
    });
    setListCheckProvinces(sortedArrayProvinces);
    setListCheckLanguages([]);
  }, [listCheckRegions]);

  useEffect(() => {
    setListCheckLanguages([]);
    const regionResult: string[] =
      listCheckRegions.length > 0 ? listCheckRegions : Object.keys(data);
    for (const region in regionResult) {
      const detailRegions = data[regionResult[region] as keyof typeof data];
      if (checkBoxProvinces.length > 0) {
        for (const detailRegion in checkBoxProvinces) {
          const languages: string[] =
            detailRegions[
              checkBoxProvinces[detailRegion] as keyof typeof detailRegions
            ];
          languages?.forEach((language: string) => {
            setListCheckLanguages((prev) => [...prev, language]);
          });
        }
      } else {
        for (const detailRegion in listCheckProvinces) {
          const languages: string[] =
            detailRegions[
              listCheckProvinces[detailRegion] as keyof typeof detailRegions
            ];
          languages?.forEach((language: string) => {
            setListCheckLanguages((prev) => [...prev, language]);
          });
        }
      }
    }
  }, [listCheckProvinces, checkBoxProvinces]);

  return (
    <div className="w-screen min-h-screen ">
      <div className="flex flex-col sm:flex-row px-[24px] gap-[28px]">
        <div>
          <h1>ภาค</h1>
          <input
            type="text"
            placeholder="ภาค"
            className="border-[1px] rounded-[4px]"
            value={input?.inputRegions}
            onChange={(event) => {
              setInput((prev) => ({
                ...prev,
                ["inputRegions"]: event?.target?.value,
              }));
            }}
          />
          <div className="flex">
            <div>
              <input
                type="checkbox"
                onChange={(event) =>
                  handleCheckBox("all", event.target.checked)
                }
              />
            </div>
            <div>เลือกทั้งหมด</div>
          </div>
          <div>
            {Object.keys(data)?.map((region) => {
              if (
                region
                  .toLocaleLowerCase()
                  .includes(input.inputRegions.toLocaleLowerCase()) ||
                input.inputRegions === ""
              ) {
                return (
                  <div key={region} className="flex">
                    <div>
                      <input
                        type="checkbox"
                        id={region}
                        onChange={(event) =>
                          handleCheckBox(region, event.target.checked)
                        }
                      />
                    </div>
                    <div>{region}</div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="border-[1px] rounded-[4px] shadow-sm">
          <h1>จังหวัด</h1>
          <input
            type="text"
            placeholder="จังหวัด"
            className="border-[1px] rounded-[4px]"
            value={input?.inputProvinces}
            onChange={(event) => {
              setInput((prev) => ({
                ...prev,
                ["inputProvinces"]: event?.target?.value,
              }));
            }}
          />
          <div>
            {(listCheckProvinces.length > 0
              ? listCheckProvinces
              : provinces
            )?.map((province: string) => {
              if (
                province
                  .toLocaleLowerCase()
                  .includes(input.inputProvinces.toLocaleLowerCase()) ||
                ""
              ) {
                return (
                  <div key={province} className="flex">
                    <div>
                      <input
                        type="checkbox"
                        id={province}
                        onChange={(event) =>
                          handleCheckBoxProvinces(
                            province,
                            event.target.checked
                          )
                        }
                      />
                    </div>
                    <div>{province}</div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div>
          <h1>ภาษา</h1>
          <input
            type="text"
            placeholder="ภาษา"
            className="border-[1px] rounded-[4px]"
            value={input?.inputLanguage}
            onChange={(event) => {
              setInput((prev) => ({
                ...prev,
                ["inputLanguage"]: event?.target?.value,
              }));
            }}
          />
          {listCheckLanguages.length > 0 && (
            <div className="border-[1px] rounded-[1px] shadow-sm">
              {(listCheckLanguages.length > 0
                ? listCheckLanguages
                : languages
              )?.map((language, index) => {
                if (
                  language
                    .toLocaleLowerCase()
                    .includes(input.inputLanguage.toLocaleLowerCase()) ||
                  input.inputLanguage === ""
                ) {
                  return (
                    <div key={language + index.toString()}>{language}</div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
