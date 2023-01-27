import { FC, useContext, useEffect } from "react";

import ScoreContext from "../../context/ScoreContext";

import { questions } from "../../db/questions/questions.json";

import { sumRadioValues, scrollTo } from "../../utils";

import { Button } from "../Button";

import "../../components/component-styles.css";
import "../Form/styles.css";
import "./styles.css";

export interface QuestionProps {
  id?: string | undefined;
  options?: OptionsProps[] | undefined;
  title?: string;
}

export interface OptionsProps {
  id?: string | undefined;
  option?: string;
  options?: string | (string & {}) | undefined | null;
  title?: string;
  value?: number;
}

export const Poll: FC = () => {
  const { setScore } = useContext(ScoreContext);

  const handleSubmitPoll = (e: React.FormEvent<HTMLFormElement>) => {
    const { total } = sumRadioValues();
    e.preventDefault();
    setScore(total);
  };

  useEffect(() => {
    scrollTo();
  }, []);

  return (
    <section id="poll" className="form">
      <div className="container title">
        <h2>
          Todo listo. Estás a unas preguntas de{" "}
          <span className="highlight-yellow">encontrar la cura</span>
        </h2>
      </div>
      <form onSubmit={handleSubmitPoll}>
        <div className="container">
          {questions.map((question: QuestionProps) => {
            return (
              <div className="question-content" key={question.id}>
                <h4 className="question-title">{question.title}</h4>
                <div key={question.id}>
                  {question.options?.map((option: OptionsProps) => {
                    return (
                      <div className="question-options" key={option.id}>
                        <input
                          type="radio"
                          id={option.id}
                          name={question.id}
                          value={option.value}
                          required
                        />
                        <label htmlFor={option.id}>{option.option}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <Button type="button" text="ENVIAR" />
      </form>
    </section>
  );
};
