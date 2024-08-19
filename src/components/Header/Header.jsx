import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import Modals from "../Modals/Modals";
import { useState } from "react";
import icon from '../../images/svg/stroke.svg'
import { useSelector } from "react-redux";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const isAuthenticated = useSelector(state => state.auth.token);

  function openModal(type) {
    setModalType(type);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalType("");
  }
  return (
    <>
      <div className={css.container}>
        <div>
          <h2>
            <svg width="28" height="28">
              <use
                href={`${icon}#icon-ukraine`}
              ></use>
            </svg>
            LearnLingo
          </h2>
        </div>
        <div className={css.BurgerMenu}>
        <BurgerMenu />
        </div>
        <div className={css.navbar}>
          <NavLink className={css.link} to="/">
            Home
          </NavLink>
          <NavLink className={css.link} to="/teachers">
            Teachers
          </NavLink>
          {isAuthenticated === null ? <NavLink aria-disabled="true" className={`${css.link} ${css.disabled}`} to="/favorites">
            Favorites
          </NavLink> : <NavLink className={css.link} to="/favorites">
            Favorites
          </NavLink>}
        </div>
        <div className={css.navbar}>
          <button
            className={css.logIn}
            type="button"
            onClick={() => openModal("login")}
          >
            <svg width="20" height="20">
              <use
                href={`${icon}#icon-log-in`}
              ></use>
            </svg>
            Log in
          </button>
          <button
            className={css.registration}
            type="button"
            onClick={() => openModal("registration")}
          >
            Registration
          </button>
        </div>
      </div>
      <Modals isOpen={modalIsOpen} closeModal={closeModal} type={modalType} />
    </>
  );
}

export default Header;
