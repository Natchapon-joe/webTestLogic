import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="border-[1px] rounded-[8px] w-full max-w-[800px] h-full max-h-[800px] bg-slate-500">
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-[16px] py-[24px] text-white">
          <Link to="advanceSearch">
            <div className="cursor-pointer w-[200px] border-[1px] h-[24px] text-center">
              AdvanceSearch
            </div>
          </Link>
          <Link to="mastermind">
            <div className="cursor-pointer w-[200px] border-[1px] h-[24px] text-center">
              MasterMind
            </div>
          </Link>
          <Link to="recursive">
            <div className="cursor-pointer w-[200px] border-[1px] h-[24px] text-center">
              Recursive
            </div>
          </Link>
          <Link to="decimalprecision">
            <div className="cursor-pointer w-[200px] border-[1px] h-[24px] text-center">
              DecimalPrecision
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
