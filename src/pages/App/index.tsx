import { FC, useContext } from "react";

import ScoreContext from "../../context/ScoreContext";

import { Target } from "../Target";
import { Form } from "../../components/Form";
import { Hero } from "../../components/Hero";
import { Poll } from "../../components/Poll";

import "../../global-styles.css";

export const App: FC = () => {
  const { score, dataUser } = useContext(ScoreContext);

  console.log("dataUser inner", dataUser);

  return (
    <>
      {score === 0 ? (
        <>
          <Hero>
            <Form />
          </Hero>
          {dataUser && <Poll />}
        </>
      ) : (
        <Target />
      )}
    </>
  );
};
