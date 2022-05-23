import { useEffect, useState } from 'react'

const useTheme = () => {
  const [mode, setMode] = useState<'light' | 'dark' | undefined>('light')

  useEffect(() => {
    const modeMe = (e: any) => {
      setMode(e.matches ? 'dark' : 'light')
    }
    setMode(
      window?.matchMedia &&
        window?.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    )

    window
      ?.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', modeMe)
    return window
      ?.matchMedia('(prefers-color-scheme: dark)')
      .removeListener(modeMe)
  }, [])

  return mode
}

export default useTheme
