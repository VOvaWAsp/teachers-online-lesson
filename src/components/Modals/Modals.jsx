import Modal from 'react-modal';
import Registration from '../Registration/Registration';
import css from "./Modals.module.css"
import Login from '../Login/Login';
import icon from '../../images/svg/stroke.svg'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "30px",
    border: 'none',
    padding: '0',
  },
};

function Modals({isOpen, closeModal, type, item}) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className={css.closeBtn} onClick={closeModal}>
        <svg stroke='black' width="32" height="32">
              <use
                href={`${icon}#icon-x`}
              ></use>
            </svg>
        </button>
        {type === 'login' && (
                <Login />
            )}
            {type === 'registration' && (
                <Registration />
            )}
      </Modal>
    </div>
  );
}



export default Modals;