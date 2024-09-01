import css from "./Filter.module.css";
import Select from "react-select";

function Filter({
  catalogs,
  handleFilterLanguage,
  handleFilterLevel,
  handleFilterPricePerHour,
}) {
  const languages = [
    ...new Set(catalogs.flatMap((language) => language.languages)),
  ];
  const levels = [...new Set(catalogs.flatMap((language) => language.levels))];
  const pricePerHour = [
    ...new Set(catalogs.map((language) => language.price_per_hour)),
  ];

  const languageOptions = languages.map((language) => ({
    value: language,
    label: language,
  }));
  const levelOptions = levels.map((level) => ({ value: level, label: level }));
  const priceOptions = pricePerHour.map((price) => ({
    value: price,
    label: price.toString(),
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "14px",
      padding: "16px 18px",
      backgroundColor: "#fff",
      border: "none",
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "14px",
      overflow: "hidden",
    }),
    option: (provided, state) => ({
      ...provided,
      fontFamily: "var(--font-family)",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "111%",
      color: state.isSelected ? "#fff" : "#121417",
      backgroundColor: state.isSelected ? "#8a8a89" : "transparent",
      "&:hover": {
        backgroundColor: "#e2e2e2",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "#8a8a89",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#121417",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "0", // Прибираємо додатковий відступ навколо стрілки
      display: "flex",
      alignItems: "center",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 16px", // Відступи для стрілки, щоб вона була на правильному місці
      color: "#121417", // Кастомізація кольору стрілки
    }),
    indicatorSeparator: () => ({
      display: "none", // Видаляємо розділювач між текстом і стрілкою
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0", // Вирівнювання тексту всередині селекта
      paddingLeft: "18px", // Відступ зліва для тексту
      display: "flex",
      alignItems: "center",
    }),
  };
  
  
  
  
  

  return (
    <div className={css.container}>
      <div>
        <p className={css.text}>Languages</p>
        <Select
          options={languageOptions}
          onChange={(selectedOption) =>
            handleFilterLanguage(selectedOption ? selectedOption.value : "")
          }
          styles={customStyles}
        />
      </div>
      <div>
        <p className={css.text}>Level of knowledge</p>
        <Select
          options={levelOptions}
          onChange={(selectedOption) =>
            handleFilterLevel(selectedOption ? selectedOption.value : "")
          }
          styles={customStyles}
        />
      </div>
      <div>
        <p className={css.text}>Price</p>
        <Select
          options={priceOptions}
          onChange={(selectedOption) =>
            handleFilterPricePerHour(selectedOption ? selectedOption.value : "")
          }
          styles={customStyles}
        />
      </div>
    </div>
  );
}

export default Filter;
