import { useLocalStorage } from "@uidotdev/usehooks";
import cn from "classnames";
import { format, getDaysInMonth, getISOWeeksInYear } from "date-fns";
import { SwatchBookIcon } from "lucide-react";
import React, { useCallback, useMemo, type PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { useTheme } from "./useTheme";
import { useTimer } from "./useTimer";

function Block({
  title,
  data,
  theme,
  children,
}: PropsWithChildren<{ title?: string; data: React.ReactNode;theme: Theme }>) {
  const themes = {
    orange: {
      title:{"text-orange-400": true},
      data: {"text-neutral-900 dark:text-orange-200": true}
    },
    pink: {
      title:{"text-pink-400": true},
      data: {"text-neutral-900 dark:text-pink-200": true}
    },
    teal: {
      title:{"text-teal-600": true},
      data:{"text-neutral-900 dark:text-teal-200": true}
    },
    cyan: {
      title:{"text-cyan-400": true},
      data: {"text-neutral-900 dark:text-cyan-200": true}
    },
  } satisfies Record<Theme, {title:Record<string, boolean>, data:Record<string, boolean>}>;
  
  return (
    <div className="flex aspect-video w-fit flex-col gap-y-4 self-start rounded-xl bg-neutral-200/30 p-6 dark:bg-neutral-800/30">
      <div className="flex flex-col gap-y-1">
        {title && (
          <h3 className={cn("text-xs font-semibold  before:empty:inline-block", themes[theme].title)}>
            {title}
          </h3>
        )}
        <h4 className={cn("text-2xl font-medium", themes[theme].data)}>{data}</h4>
      </div>
      {children}
    </div>
  );
}

enum Theme {
  "orange" = "orange",
  "pink" = "pink",
  "teal" = "teal",
  "cyan" = "cyan",
}

const themes = {
  0: Theme.orange,
  1: Theme.teal,
  2: Theme.pink,
  3: Theme.cyan,
} as Record<number, Theme> satisfies Record<number, Theme>;

function App() {
  useTheme();
  const [themeIndex, setThemeIndex] = useLocalStorage<number>("themeIndex", 0);
  const theme = useMemo<Theme>(() => themes[themeIndex], [themeIndex])

  const timer = useTimer();
  const { time } = timer;

  const timeStr = format(time, "H:mm:ss");
  const dayStr = format(time, "EEEE");
  const dayNumStr = format(time, "d");
  const dayNum = Number.parseInt(format(time, "d"), 10);
  const monthNum = Number.parseInt(format(time, "M"), 10);
  const weekNum = Number.parseInt(format(time, "w"), 10);
  const quarterStr = format(time, "qqq");
  const quarterNum = Number.parseInt(format(time, "q"), 10);
  const weeksInYear = getISOWeeksInYear(time);
  const daysInMonth = getDaysInMonth(time);

  const toggleTheme = useCallback(() => {
    setThemeIndex((themeIndex + 1) % 4);
  }, [theme])

  return (
    <>
    <div className="fixed top-0 right-0 mr-4 mt-4">
      <SwatchBookIcon className="text-neutral-600 cursor-pointer" onClick={toggleTheme}/>
    </div>
      <div className="flex h-full w-full select-none flex-col items-center justify-center gap-8 p-12 font-medium tabular-nums md:p-0">
        <div className="flex w-full items-center justify-center whitespace-nowrap leading-none">
          <div className="flex">
            <div className="text-neutral-600" style={{ fontSize: "12vw" }}>
              {timeStr}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Block theme={theme} title="Day name" data={dayStr}>
            <div className="flex w-fit gap-x-3">
              <Circles theme={theme} total={7} current={dayNum} />
            </div>
          </Block>
          <Block theme={theme} title="Day number" data={dayNumStr}>
            <div className="grid w-fit grid-cols-7 gap-3">
              <Circles theme={theme} total={daysInMonth} current={dayNum} />
            </div>
          </Block>
          <Block theme={theme} title="Month" data={format(time, "MMMM")}>
            <div className="grid w-fit grid-cols-3 gap-3">
              <Circles theme={theme} total={12} current={monthNum} />
            </div>
          </Block>
          <Block theme={theme} title="Year" data={format(time, "yyyy")} />
          <Block theme={theme} title="Week" data={format(time, "w")}>
            <div className="grid w-fit grid-cols-7 gap-3">
              <Circles theme={theme} total={weeksInYear} current={weekNum} />
            </div>
          </Block>
          <Block theme={theme} title="Quarter" data={quarterStr}>
            <div className="grid w-fit grid-cols-4 gap-3">
              <Circles theme={theme} total={4} current={quarterNum} />
            </div>
          </Block>
        </div>
      </div>
      <Outlet />
    </>
  );
}

function Circles({ total, current, theme }: { total: number; current: number; theme: Theme }) {
  const themes = {
    orange: (idx: number) => ({
      "bg-orange-600/20 dark:bg-orange-900/70": current > idx + 1,
      "bg-neutral-200 dark:bg-neutral-900": current < idx + 1,
      "bg-orange-500 dark:bg-orange-500": current === idx + 1,
    }),
    pink: (idx: number) => ({
      "bg-pink-600/10 dark:bg-pink-900/70": current > idx + 1,
      "bg-neutral-200 dark:bg-neutral-900": current < idx + 1,
      "bg-pink-500 dark:bg-pink-500": current === idx + 1,
    }),
    teal: (idx: number) => ({
      "bg-teal-600/10 dark:bg-teal-900/70": current > idx + 1,
      "bg-neutral-200 dark:bg-neutral-900": current < idx + 1,
      "bg-teal-500 dark:bg-teal-500": current === idx + 1,
    }),
    cyan: (idx: number) => ({
      "bg-cyan-600/10 dark:bg-cyan-900/70": current > idx + 1,
      "bg-neutral-200 dark:bg-neutral-900": current < idx + 1,
      "bg-cyan-500 dark:bg-cyan-500": current === idx + 1,
    }),
  } satisfies Record<Theme, (idx: number) => Record<string, boolean>>;

  return (
    <>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={cn("h-3 w-3 rounded-full", themes[theme](i))} />
      ))}
    </>
  );
}

export default App;
