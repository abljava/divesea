import { useState, useEffect, useRef } from 'react'

interface UseCountdownTimerProps {
  initialHours: number
  initialMinutes: number
  initialSeconds: number
}

interface CountdownTimerResult {
  hours: number
  minutes: number
  seconds: number
  isFinished: boolean
}

/**
 * Хук для реализации работающего таймера отсчета с обновлением каждую секунду
 * @param initialHours - начальное количество часов
 * @param initialMinutes - начальное количество минут
 * @param initialSeconds - начальное количество секунд
 * @returns объект с текущим временем (hours, minutes, seconds) и флагом isFinished
 */
export const useCountdownTimer = ({
  initialHours,
  initialMinutes,
  initialSeconds,
}: UseCountdownTimerProps): CountdownTimerResult => {
  // Преобразуем начальное время в общее количество секунд
  const getTotalSeconds = () => {
    return initialHours * 3600 + initialMinutes * 60 + initialSeconds
  }

  const [totalSeconds, setTotalSeconds] = useState(getTotalSeconds())
  const [isFinished, setIsFinished] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    // Сбрасываем состояние при изменении начальных значений
    setTotalSeconds(getTotalSeconds())
    setIsFinished(false)

    // Очищаем предыдущий интервал, если он существует
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Если время уже истекло, не запускаем таймер
    if (getTotalSeconds() <= 0) {
      setIsFinished(true)
      return
    }

    // Запускаем интервал обновления каждую секунду
    intervalRef.current = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          setIsFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Очистка интервала при размонтировании компонента
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [initialHours, initialMinutes, initialSeconds])

  // Вычисляем часы, минуты и секунды из общего количества секунд
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    hours,
    minutes,
    seconds,
    isFinished,
  }
}
