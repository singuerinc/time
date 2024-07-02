import { format } from "date-fns";
import { CloudLightning } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./useTheme";
import { useTimer } from "./useTimer";

function Block({ title, data }: { title?: string; data: React.ReactNode }) {
  return (
    <div className="flex aspect-video w-full flex-col gap-y-2 rounded-xl bg-zinc-800 p-6">
      {title && <h3 className="text-xl font-normal before:empty:inline-block">{title}</h3>}
      <h4 className="text-2xl font-semibold">{data}</h4>
    </div>
  );
}

function App() {
  useTheme();

  const timer = useTimer();
  const { time } = timer;

  return (
    <>
      <div className="flex h-full w-full select-none flex-col items-center justify-center gap-8 p-12 font-medium tabular-nums md:p-0">
        <div
          className="flex w-full items-center justify-center whitespace-nowrap leading-none"
          style={{ fontSize: "12vw" }}
        >
          <span className="flex">{format(time, "H mm ss")}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <Block data={format(time, "EEEE")} />
          <Block data={format(time, "dd")} />
          <Block data={format(time, "MMMM")} />
          <Block title="Week" data={format(time, "w")} />
          <Block title="Year" data={format(time, "yyyy")} />
          <Block title="Quarter" data={format(time, "qqq")} />
          <Block title="Weather" data={<CloudLightning size={48} />} />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
