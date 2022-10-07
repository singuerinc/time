import { useMachine, useSelector } from "@xstate/react";
import { assign, createMachine, State } from "xstate";

type Context = {
  time: Date;
};

type Events = { type: "TICK" };

export const timerMachine = createMachine<Context, Events>(
  {
    initial: "running",
    context: {
      time: new Date(),
    },
    on: {},
    states: {
      running: {
        entry: ["update"],
        invoke: {
          src: "tick",
        },
        on: {
          TICK: [
            {
              actions: ["update"],
            },
          ],
        },
      },
    },
  },
  {
    guards: {},
    actions: {
      update: assign({
        time: () => new Date(),
      }),
    },
    services: {
      tick: () => (callback) => {
        const id = setInterval(() => {
          callback("TICK");
        }, 500);

        callback("TICK");

        return () => clearInterval(id);
      },
    },
  }
);

export function useTimer() {
  const [, send, service] = useMachine(timerMachine);
  const time = useSelector(service, (state: State<Context>) => state.context.time);

  return {
    time,
  };
}
