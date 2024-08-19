import { useState } from "react";
import { useSelector } from "react-redux";
import Catalog from "../Catalog/Catalog";
import ModalCatalog from "../ModalCatalog/ModalCatalog";
import Filter from "../Filter/Filter";
import css from "./CatalogList.module.css"

function CatalogList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const catalogs = useSelector((state) => state.catalog.items);
  const [language, setLanguage] = useState(null)
  const [level, setLevel] = useState(null)
  const [pricePerHour, setPriceHour] = useState(null)

  const handleFilterLanguage = (value) => {
    setLanguage(value);
  };

  const handleFilterLevel = (value) => {
    setLevel(value);
  };

  const handleFilterPricePerHour = (value) => {
    setPriceHour(value);
  };

  const filtereCatalogs = catalogs.filter(item => {
    return (
        (!language || item.languages.includes(language)) &&
        (!level || item.levels.includes(level)) &&
        (!pricePerHour || item.price_per_hour === Number(pricePerHour))
    );
  });

  console.log(catalogs);
  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };
  return (
    <div>
      <Filter handleFilterLanguage={handleFilterLanguage} handleFilterLevel={handleFilterLevel} handleFilterPricePerHour={handleFilterPricePerHour} catalogs={catalogs} />
      <ul className={css.container}>
        <Catalog catalogs={filtereCatalogs} isOpened={handleOpenModal} />
      </ul>
      {selectedItem && (
        <ModalCatalog item={selectedItem} closeModal={handleCloseModal} isOpened={selectedItem !== null}/>
      )}
    </div>
  );
}

export default CatalogList;
