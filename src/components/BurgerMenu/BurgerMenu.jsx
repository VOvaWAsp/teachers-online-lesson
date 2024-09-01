import { useState } from "react";
import css from './BurgerMenu.module.css'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import icon from '../../images/svg/stroke.svg'
import Modals from "../Modals/Modals";
import { logOut } from "../../redux/auth/operation";

function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const [modalIsOpen, setIsOpened] = useState(false);
  const [modalType, setModalType] = useState("");

  const dispatch = useDispatch()

  const logOuted = () => {
    dispatch(logOut())
  }

  const isAuthenticated = useSelector(state => state.auth.token);

  function openModal(type) {
    setModalType(type);
    setIsOpened(true);
  }

  function closeModal() {
    setIsOpened(false);
    setModalType("");
  }
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
       <div className={css.burgerMenu}>
        <div className={`${css.menuIcon} ${isOpen ? css.open : ''}`} onClick={toggleMenu}>
            <div className={css.bar}>menu</div>
        </div>
        <nav className={`${css.menu} ${isOpen ? css.open : ''}`}>
        <>
      <div className={css.container}>
      <div className={`${css.menuIcon} ${isOpen ? css.open : ''}`} onClick={toggleMenu}>
            <div className={css.bar}>
            <svg stroke='black' width="32" height="32">
              <use
                href={`${icon}#icon-x`}
              ></use>
            </svg>
            </div>
        </div>
        <div className={css.navbar}>
        <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/teachers">
            Teachers
          </NavLink>
          {isAuthenticated === null ? <NavLink s className={css.disabled} to="/favorites">
            Favorites
          </NavLink> : <NavLink className={({ isActive }) => (isActive ? css.activeLink : css.link)} to="/favorites">
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
          <button onClick={logOuted} type="button" className={css.logOut}>Log Out</button>
        </div>
      </div>
      <Modals isOpen={modalIsOpen} closeModal={closeModal} type={modalType} />
    </>
        </nav>
       </div>
    )
}

export default BurgerMenu;