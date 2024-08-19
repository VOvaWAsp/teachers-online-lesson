import { useState } from "react";
import { useSelector } from "react-redux";
import ModalCatalog from "../ModalCatalog/ModalCatalog";
import css from "./FavoritesList.module.css"
import Favorites from "../Favorites/Favorites";

function FavoritesList() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };
  return (
    <div>
      <ul className={css.container}>
        <Favorites isOpened={handleOpenModal} />
      </ul>
      {selectedItem && (
        <ModalCatalog item={selectedItem} closeModal={handleCloseModal} isOpened={selectedItem !== null}/>
      )}
    </div>
  );
}

export default FavoritesList;
