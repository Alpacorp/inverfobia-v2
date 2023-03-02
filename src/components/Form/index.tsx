import { FC, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useRollbar } from "@rollbar/react";

import ScoreContext from "../../context/ScoreContext";
import { apiCreateContact } from "../../apis/createContact";

import { useForm } from "../../hooks/useForm";

import { Button } from "../Button";
import { Cta } from "../Cta";
import { ScrollDown } from "../ScrollDown";

import { capitalize, validatePhone } from "../../utils";

import "../../components/component-styles.css";
import "./styles.css";

export const Form: FC = () => {
  const { setInfoUser, setDataUser, detectedDevice } = useContext(ScoreContext);

  const [captchaStatus, setCaptchaStatus] = useState<Boolean>(false);
  const [dataUserSend, setDataUserSend] = useState<Boolean>(false);
  const recaptchaRef: React.MutableRefObject<ReCAPTCHA | undefined> = useRef<
    ReCAPTCHA | undefined
  >();
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const rollbar = useRollbar();

  const [formValues, handleInputChange, reset] = useForm({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    website: "https://adiosinverfobia.com",
    company: "Inverfobia - V2",
  });

  const { email, firstname, lastname, phone } = formValues;

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
        console.log("err ❌", err);
        rollbar.info("Error en el registro de captcha", err);
        alert(
          `Hubo un error con la validación del captcha ❌ por favor intenta nuevamente o hazlo más tarde.`
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
            `Hola ${firstname} ${lastname}, tu registro de datos personales está completo y los expertos ya te esperan. Vamos al test y superemos la inverfobia.`
          );
        setDataUserSend(true);
        setInfoUser({
          firstname: capitalize(firstname),
          lastname: capitalize(lastname),
          phone,
          email,
          website: "https://inverfobia.com",
          company: "Inverfobia - V2",
          id: res.data.message.id,
        });
      })
      .catch((err) => {
        console.log("err ❌", err);
        rollbar.info("Error en el registro de contacto", err);
        alert(
          `Hubo un error en el registro ❌ por favor intenta nuevamente o hazlo más tarde.`
        );
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChangeCaptcha();

    if (!validatePhone(phone)) {
      alert(
        "❌ Por favor ingresa un número de celular válido de 10 dígitos 📲"
      );
      return;
    }

    if (captchaStatus) {
      handleCreateContact(e);
      setDataUser(true);
    } else {
      return;
    }
  };

  return (
    <>
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
              <h2>
                <span className="highlight-yellow">
                  Regístrate y haz tu test
                </span>{" "}
                para descubrir qué tipo de{" "}
                <span className="highlight-white">Inverfobia</span> tienes
              </h2>
            </div>
            <div className="data-inputs">
              <input
                className="input"
                id="firstname"
                minLength={3}
                name="firstname"
                onChange={handleInputChange}
                placeholder="Nombre(s)"
                required
                type="text"
                aria-label="Nombre(s)"
                title="Nombre(s)"
                value={capitalize(firstname)}
              />
              <input
                className="input"
                id="lastname"
                minLength={3}
                name="lastname"
                onChange={handleInputChange}
                placeholder="Apellido(s)"
                required
                type="text"
                aria-label="Apellido(s)"
                title="Apellido(s)"
                value={capitalize(lastname)}
              />
              <input
                className="input"
                id="phone"
                name="phone"
                onChange={handleInputChange}
                placeholder="Número telefónico"
                required
                type="number"
                aria-label="Número telefónico"
                title="Número telefónico"
                value={phone}
              />
              <input
                className="input"
                id="email"
                name="email"
                onChange={handleInputChange}
                placeholder="Correo electrónico"
                required
                type="email"
                aria-label="Correo electrónico"
                title="Correo electrónico"
                value={email}
              />
              <div className="terms">
                <input type="checkbox" name="terms" id="terms" required />
                <label htmlFor="terms">
                  Acepta la{" "}
                  <Link to={"/terminos"} title="política de privacidad">
                    política de privacidad
                  </Link>
                </label>
              </div>
              <ReCAPTCHA
                sitekey={siteKey}
                onChange={handleChangeCaptcha}
                ref={recaptchaRef as any}
                size={detectedDevice === "mobile" ? "compact" : "normal"}
              />
            </div>
            <Button type="button" text="EMPIEZA TU TEST" />
          </form>
        </section>
      )}
    </>
  );
};
