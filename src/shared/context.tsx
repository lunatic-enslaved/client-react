import { createContext, PropsWithChildren, useState } from 'react';

import dayjs from '@/shared/lib/dayjs';
import { Dayjs } from 'dayjs';

interface IState {
  date: Dayjs;
  setDate: (date: Dayjs) => void;
}

export const Context = createContext<IState>({} as IState);

export const ContextProvider = (props: PropsWithChildren) => {
  const [date, setDate] = useState(dayjs.utc().startOf('day'));

  const state = {
    date,
    setDate
  };

  return <Context.Provider value={state}>{props.children}</Context.Provider>;
};
