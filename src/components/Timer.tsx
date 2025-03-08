import { useEffect, useRef, useState } from 'react';
import Container from './UI/Container.tsx';
import { useTimersContext, type Timer as TimerProps } from '../store/timers-context.tsx';

export default function Timer({name, duration}: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTimer, setRemainingTime] = useState(duration * 1000);
  const { isRunning } = useTimersContext();

  if (remainingTimer <= 0 && interval.current) {
    clearInterval(interval.current)
  }

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = Number(setInterval(function() {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) return prevTime;

          return prevTime - 50
        }
        );
      }, 50));

      interval.current = timer;
    } else if(interval.current) {
      clearInterval(interval.current)
    }

    return () => clearInterval(timer)
  }, [isRunning]);

  const formattedRemainingTime = (remainingTimer / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p><progress max={duration * 1000} value={remainingTimer} /></p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
