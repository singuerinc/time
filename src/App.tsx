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
      <div className="flex h-full w-full select-none items-center justify-center">
        <div className="flex w-full items-center justify-center whitespace-nowrap text-[27vw] tabular-nums leading-none">
          <span className="flex">{format(time, "H")}</span>
          <span className="text-light flex text-[0.1em]">{format(time, "ss")}</span>
          <span className="flex">{format(time, "mm")}</span>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
