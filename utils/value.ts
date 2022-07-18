import { Evt, StatefulEvt } from "https://deno.land/x/evt@v2.2.0/mod.ts";
import { useState, useEffect } from 'preact/hooks'

const evtValue = new StatefulEvt('https://baidu.com');

export default function useValue(): [string, (str: string) => void] {
  const [value, setValue] = useState(evtValue.state);
  useEffect(() => {
    const ctx = Evt.newCtx();
    evtValue.attach(ctx, setValue)
    return () => {
      evtValue.detach(ctx)
    }
  }, [])
  return [value, (str: string) => {
    evtValue.post(str)
  }]
}