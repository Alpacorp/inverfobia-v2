import { FC, useContext, useEffect, useState } from "react";

import ScoreContext from "../../context/ScoreContext";

import { Target } from "../Target";
import { Form } from "../../components/Form";
import { Hero } from "../../components/Hero";
import { Poll } from "../../components/Poll";
import { Loading } from "../../components/Loading";

import { scrollTo, typeDevice } from "../../utils";

import "../../global-styles.css";

export const App: FC = () => {
  const { score, dataUser, setDetectedDevice } = useContext(ScoreContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    scrollTo();
    setDetectedDevice(typeDevice());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (score === 0 && !dataUser) {
    return (
      <>
        <Loading open={loading} />
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
