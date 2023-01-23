import { createContext, useState } from "react";

const ScoreContext = createContext({
  score: 0,
  setScore: (score: number) => {},
  dataUser: false,
  setDataUser: (dataUser: boolean) => {},
  detectedDevice: "",
  setDetectedDevice: (detectedDevice: string) => {},
});

interface ScoreProviderProps {
  children: React.ReactNode;
}

export const ScoreProvider = ({ children }: ScoreProviderProps) => {
  const [score, setScore] = useState(0);
  const [dataUser, setDataUser] = useState(false);
  const [detectedDevice, setDetectedDevice] = useState("");

  return (
    <ScoreContext.Provider
      value={{
        dataUser,
        detectedDevice,
        score,
        setDataUser,
        setDetectedDevice,
        setScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreContext;
