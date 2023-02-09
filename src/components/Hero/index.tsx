import { FC } from "react";

import { Info } from "../Info/info";

import "../../components/component-styles.css";
import "./styles.css";
import { Cta } from "../Cta";
import { ScrollDown } from "../ScrollDown/index";

interface HeroProps {
  children: React.ReactNode;
}

export const Hero: FC<HeroProps> = ({ children }) => {
  return (
    <section className="hero">
      <aside>
        <div className="container">
          <div className="main-message">
            <h1>
              adios <br />
              inverfobia
            </h1>
            <Info />
          </div>
          {/* <div>
            <Cta>
              <ScrollDown />
            </Cta>
          </div> */}
          <div>{children}</div>
        </div>
      </aside>
    </section>
  );
};
