import { format } from "date-fns";
import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./useTheme";
import { useTimer } from "./useTimer";

function App() {
  useTheme();

  const timer = useTimer();
  const { time } = timer;

  return (
    <>
      <div className="flex h-full w-full select-none flex-col items-center justify-center font-medium tabular-nums">
        <div className="text-">{format(time, "d/M")}</div>
        <div className="flex w-full items-center justify-center whitespace-nowrap text-[27vw] leading-none">
          <span className="flex">{format(time, "H")}</span>
          <span className="text-light flex w-[3vw] justify-end text-[0.1em] text-red-600">
            {format(time, "ss")}
          </span>
          <span className="flex">{format(time, "mm")}</span>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
