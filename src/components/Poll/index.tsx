import { FC, useContext, useEffect, useState } from "react";

import ScoreContext from "../../context/ScoreContext";

import { apiUpdateContact } from "../../apis/updateContact";
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
  subquestions?: QuestionProps[] | undefined | [];
}

export const Poll: FC = () => {
  const { infoUser, setScore } = useContext(ScoreContext);
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [show, setShow] = useState<Boolean>(false);
  const { total } = sumRadioValues();

  const handleSubmitPoll = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setScore(total);

    apiUpdateContact.patch(
      "/hubspot/contact",
      {
        ...infoUser,
        scoreinv: total,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleShow = (): void => {
    if (selectedQuestion === "3A" && selectedOption === "3A-4") {
      setShow(true);
    } else if (selectedQuestion !== "3A" && show) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    scrollTo();
  }, []);

  useEffect(() => {
    handleShow();
  }, [selectedOption]);

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
              <div key={question.id}>
                <hr />
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
                            onChange={() => {
                              setSelectedOption(option.id as string);
                              setSelectedQuestion(question.id as string);
                            }}
                            value={option.value}
                            required
                          />
                          <label htmlFor={option.id}>{option.option}</label>
                          <div className="subquestions">
                            {show &&
                              option?.subquestions?.map(
                                (subquestion: QuestionProps) => {
                                  return (
                                    <div key={subquestion.id}>
                                      <hr />
                                      <div
                                        className="subquestion-content"
                                        key={subquestion.id}
                                      >
                                        <h4 className="subquestion-title">
                                          {subquestion.title}
                                        </h4>
                                        <div key={subquestion.id}>
                                          {subquestion.options?.map(
                                            (option: OptionsProps) => {
                                              return (
                                                <div
                                                  className="subquestion-options"
                                                  key={option.id}
                                                >
                                                  <input
                                                    id={option.id}
                                                    name={subquestion.id}
                                                    required
                                                    type="radio"
                                                    value={option.value}
                                                  />
                                                  <label htmlFor={option.id}>
                                                    {option.option}
                                                  </label>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
