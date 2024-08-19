import Modal from "react-modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./ModalCatalog.module.css";
import icon from '../../images/svg/stroke.svg'
import { ErrorMessage } from '@hookform/error-message';

const schema = yup.object().shape({
  fullName: yup.string().min(8).max(64),
  email: yup
    .string()
    .email()
    .matches(/^(?!\@*,)/)
    .required(),
    phoneNumber: yup.number()
  .typeError("That doesn't look like a phone number")
  .positive("A phone number can't start with a minus")
  .integer("A phone number can't include a decimal point")
  .min(8)
  .required('A phone number is required'),
});

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: '#fff',
      borderRadius: '30px',
      maxWidth: '599px',
      minWidth: '260px',
      maxHeight: '80vh', 
      overflowY: 'auto',
      border: 'transparent',
    },
  };
  

function ModalCatalog({ isOpened, closeModal, item }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {};
  console.log(item);
  return (
    <div className={css.container}>
      <Modal
        isOpen={isOpened}
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
        <div className={css.blockInfo}>
          <h2 className={css.title}>Book trial lesson</h2>
          <p className={css.paragraph}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>
          <div className={css.blockTeacher}>
            <img className={css.img} src={item.avatar_url} alt="" />
            <div className={css.teacherInfo}>
              <p className={css.text}>Your teacher</p>
              <h3 className={css.subtitle}>
                {item.name}
                {item.surname}
              </h3>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={css.form}
            action=""
          >
              <h2 className={css.titleForm}>
                What is your main reason for learning English?
              </h2>
            <div className={css.containerRadio}>
              <label>
                <input type="radio" value="Career and business" {...register('categoryLearn')} />
                <span className={css.radioText}>Career and business</span>
              </label>
              <label>
                <input type="radio" value="Lesson for kids" {...register('categoryLearn')} />
                <span className={css.radioText}>Lesson for kids</span>
              </label>
              <label>
                <input type="radio" value="Living abroad" {...register('categoryLearn')} />
                <span className={css.radioText}>Living abroad</span>
              </label>
              <label>
                <input type="radio" value="Exams and coursework" {...register('categoryLearn')} />
                <span className={css.radioText}>Exams and coursework</span>
              </label>
              <label>
                <input type="radio" value="Culture, travel or hobby" {...register('categoryLearn')} />
                <span className={css.radioText}>Culture, travel or hobby</span>
              </label>
            </div>
            <div className={css.containerInput}>
              <div>
                <input
                  className={css.input}
                  type="fullName"
                  placeholder="Full Name"
                  {...register("fullName")}
                />
                <ErrorMessage
              name="fullName"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
              </div>
              <div>
                <input
                  className={css.input}
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                <ErrorMessage
              name="email"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
              </div>
              <div>
                <input
                  className={css.input}
                  type="phoneNumber"
                  placeholder="Phone number"
                  {...register("phoneNumber")}
                />
                <ErrorMessage
              name="phoneNumber"
              errors={errors}
              render={({ message }) => <p className={css.error}>{message}</p>}
            />
              </div>
            </div>
            <button className={css.btn} type="submit">
                Book
              </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCatalog;
