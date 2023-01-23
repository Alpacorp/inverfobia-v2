import { createContext, useState } from "react";

const ScoreContext = createContext({
  score: 0,
  setScore: (score: number) => {},
  dataUser: false,
  setDataUser: (dataUser: boolean) => {},
});

interface ScoreProviderProps {
  children: React.ReactNode;
}

export const ScoreProvider = ({ children }: ScoreProviderProps) => {
  const [score, setScore] = useState(0);
  const [dataUser, setDataUser] = useState(false);
  console.log("score context", score);
  console.log("dataUser Context", dataUser);
  return (
    <ScoreContext.Provider value={{ score, setScore, dataUser, setDataUser }}>
      {children}
    </ScoreContext.Provider>
  );
};

export default ScoreContext;
