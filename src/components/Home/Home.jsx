import { useState } from "react";
import girlWithLaptop from "../../images/Home/girlWithLaptop.jpg";
import Modals from "../Modals/Modals";
import css from "./Home.module.css";

function Home() {
    const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  function openModal(type) {
    setModalType(type);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalType("");
  }
  return (
    <section className={css.container}>
      <div className={css.heroContainer}>
        <div className={css.heroBlock}>
          <h1 className={css.title}>
            Unlock your potential with the best{" "}
            <span className={css.titleSpan}>language</span> tutors
          </h1>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button
            onClick={() => openModal("login")}
            className={css.btn}
            type="button"
          >
            Get started
          </button>
        </div>
        <div>
          <img
            className={css.img}
            src={girlWithLaptop}
            alt="girl with laptop"
          />
        </div>
      </div>
      <div className={css.benefitscontainer}>
        <div className={css.benefitsBlock}>
          <h3 className={css.subtitle}>32,000 +</h3>
          <p className={css.benefitsText}>Experienced tutors</p>
        </div>
        <div className={css.benefitsBlock}>
          <h3 className={css.subtitle}>300,000 +</h3>
          <p className={css.benefitsText}>5-star tutor reviews</p>
        </div>
        <div className={css.benefitsBlock}>
          <h3 className={css.subtitle}>120 +</h3>
          <p className={css.benefitsText}>Subjects taught</p>
        </div>
        <div className={css.benefitsBlock}>
          <h3 className={css.subtitle}>200 +</h3>
          <p className={css.benefitsText}>Tutor nationalities</p>
        </div>
      </div>
      <Modals isOpen={modalIsOpen} closeModal={closeModal} type={modalType} />
    </section>
  );
}

export default Home;
