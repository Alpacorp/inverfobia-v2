import { FC, useContext, useEffect } from "react";

import { typeDevice } from "../../utils";

import ScoreContext from "../../context/ScoreContext";

import { Target } from "../Target";
import { Form } from "../../components/Form";
import { Hero } from "../../components/Hero";
import { Poll } from "../../components/Poll";

import "../../global-styles.css";

export const App: FC = () => {
  const { score, dataUser, setDetectedDevice } = useContext(ScoreContext);
  useEffect(() => {
    setDetectedDevice(typeDevice());
  }, []);

  if (score === 0 && !dataUser) {
    return (
      <>
        <Hero>
          <Form />
        </Hero>
      </>
    );
  } else if (score === 0 && dataUser) {
    return <Poll />;
  } else {
    return <Target />;
  }
};
