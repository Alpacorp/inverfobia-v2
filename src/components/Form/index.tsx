import { FC, useRef, useState, useContext } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { apiCreateContact } from "../../apis/createContact";

import { useForm } from "../../hooks/useForm";

import { Button } from "../Button";
import { Cta } from "../Cta";
import { ScrollDown } from "../ScrollDown";

import { capitalize } from "../../utils";

import "../../components/component-styles.css";
import "./styles.css";
import ScoreContext from "../../context/ScoreContext";
import { Loading } from "../Loading";

export const Form: FC = () => {
  const { setDataUser } = useContext(ScoreContext);

  const [captchaStatus, setCaptchaStatus] = useState(false);
  const [dataUserSend, setDataUserSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const recaptchaRef: React.MutableRefObject<ReCAPTCHA | undefined> = useRef<
    ReCAPTCHA | undefined
  >();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const [formValues, handleInputChange, reset] = useForm({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    website: "https://inverfobia.com",
    company: "Inverfobia",
  });

  const { firstname, lastname, phone, email } = formValues;

  const handleChangeCaptcha = () => {
    const recaptchaValue = recaptchaRef?.current?.getValue();

    apiCreateContact
      .post("/captcha", {
        token: recaptchaValue,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(({ data: { message } }) => {
        if (message.success) {
          setCaptchaStatus(true);
        } else if (
          !message.success &&
          message["error-codes"][0] === "invalid-input-response"
        ) {
          alert(
            `${firstname} por favor verifica ✅ el código captcha para continuar.`
          );
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert(
          `${firstname}, tuvimos un error con la validación del captcha ❌ por favor intenta nuevamente o hazlo más tarde.`
        );
      });
  };

  const handleCreateContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    apiCreateContact
      .post("/hubspot/contact", formValues, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        res.status === 200 &&
          res.data.message.code === 409 &&
          alert(
            `Hola ${firstname}, tu correo ya está en nuestras bases de datos, sin embargo, con este nuevo registro actualizaremos la información. ¡Muchas gracias! A continuación, te mostramos tu resultado ✅`
          );
        res.status === 200 &&
          !res.data.message.code &&
          alert(
            `Hola ${firstname} ${lastname}, tu registro fue exitoso ✅ diligencia la encuesta para curarte de la Inverfobia.`
          );
        setDataUserSend(true);
      })
      .catch((err) => {
        console.log("err", err);
        alert(
          `${firstname}, tuvimos un error en el registro ❌ por favor intenta nuevamente o hazlo más tarde.`
        );
        window.location.href = "/";
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChangeCaptcha();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    if (captchaStatus) {
      handleCreateContact(e);
      setDataUser(true);
    } else {
      return;
    }
  };

  return (
    <>
      <Loading open={loading} />
      {dataUserSend ? (
        <>
          <Cta>
            <ScrollDown />
          </Cta>
        </>
      ) : (
        <section id="form" className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-title">
              <p>
                <span>
                  Regístrate y descubre la mejor forma de combatir los síntomas
                  de la
                </span>{" "}
                <strong>Inverfobia</strong>
              </p>
            </div>
            <div className="data-inputs">
              <input
                className="input"
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Digita tus nombres"
                onChange={handleInputChange}
                value={capitalize(firstname)}
                required
              />
              <input
                className="input"
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Digita tus apellidos"
                onChange={handleInputChange}
                value={capitalize(lastname)}
                required
              />
              <input
                className="input"
                type="number"
                name="phone"
                id="phone"
                onChange={handleInputChange}
                placeholder="Digita tu teléfono"
                value={phone}
                required
              />
              <input
                className="input"
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
                value={email}
                placeholder="Digita tu correo electrónico"
                required
              />
              <div className="terms">
                <input type="checkbox" name="terms" id="terms" required />
                <label htmlFor="terms">
                  Acepta la{" "}
                  <a href="" target="_blank">
                    política de privacidad
                  </a>
                </label>
              </div>
              <ReCAPTCHA
                sitekey={siteKey}
                onChange={handleChangeCaptcha}
                ref={recaptchaRef as any}
                size="compact"
              />
            </div>
            <Button type="button" text="Enviar" />
          </form>
        </section>
      )}
    </>
  );
};
