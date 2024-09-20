import { useEffect, useState } from "react";
import MoreInfoCatalog from "../MoreInfoCatalog/MoreInfoCatalog";
import { useSelector } from "react-redux";
import css from './Catalog.module.css';
import icon from '../../images/svg/stroke.svg';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from "react-hot-toast";

function Catalog({ catalogs, isOpened }) {
  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [visible, setVisible] = useState(4)
  const [favoriteItems, setFavoriteItems] = useState([]);

  const isAuthenticated = useSelector(state => state.auth.token);

  useEffect(() => {
    const savedItems = JSON.parse(window.localStorage.getItem('saved')) || [];
    setFavoriteItems(savedItems);
  }, []);

  const handleFavorites = (item) => {
    if (isAuthenticated === null) {
        toast.error("please register or login")
        return;
      }
    const savedItems = JSON.parse(window.localStorage.getItem('saved')) || [];
    const itemIndex = savedItems.findIndex(savedItem => savedItem.id === item.id);
  
    if (itemIndex !== -1) {
      savedItems.splice(itemIndex, 1);
    } else {
      savedItems.push(item);
    }
  
    window.localStorage.setItem('saved', JSON.stringify(savedItems));
    setFavoriteItems(savedItems);
  };
  

  const isFavorite = (itemId) => {
    return favoriteItems.some(favItem => favItem.id === itemId);
  }  

  const loadMore = () => {
    setVisible((prevCount) => prevCount + 4);
  };

  const visibleCatalogs = catalogs.slice(0, visible);

  const handeleOpenMoreInfo = (id) => {
    setOpenMoreInfo((prevOpenMoreInfo) =>
      prevOpenMoreInfo === id ? null : id
    );
  };
  return (
    <>
      {visibleCatalogs.map((item) => {
        const isOpen = openMoreInfo === item.id;
        const isItemFavorite = isFavorite(item.id)
        return (
          <li className={css.container} key={item.id}>
            <div className={css.blockImg}>
            <svg className={css.svgOnline} width="16" height="18">
                        <use href={`${icon}#icon-online`}></use>
                    </svg>
              <img className={css.img} src={item.avatar_url} alt={item.name} />
            </div>
            <div className={css.blockCard}>
              <div className={css.blockInfo}>
              <p className={css.text}>Languages</p>
                <div className={css.blockDetailed}>
                <p className={css.subtitle}>
                    <svg className={css.svgBook} width="16" height="16">
                        <use fill="white" stroke="black" href={`${icon}#icon-book-open`}></use>
                    </svg>Lessons online</p>
                <p className={css.subtitle}>Lessons done:{item.lessons_done}</p>
                <p className={css.subtitle}>
                <svg className={css.svgBook} width="16" height="16">
                        <use href={`${icon}#icon-star`}></use>
                    </svg>
                    Rating:{item.rating}</p>
                <p className={css.subtitle}>Price / 1 hour: <span>{item.price_per_hour}</span></p>
                </div>
                <button className={css.favoriteBtn} onClick={() => handleFavorites({ ...item})}>
                    {isItemFavorite ? (<svg width="26" height="22">
                        <use stroke="black" fill="yellow" href={`${icon}#icon-favorite`}></use>
                    </svg>) : <svg width="26" height="22">
                        <use stroke="black" fill="white" href={`${icon}#icon-favorite`}></use>
                    </svg>}
                </button>
              </div>
              <div>
                <h2 className={css.title}>
                  {item.name} {item.surname}
                </h2>
                <div className={css.blockDescription}>
                <p className={css.text}>
                  Speaks:
                  {item.languages.map((language) => (
                    <span key={language} className={css.subtitleWithLine}> {language}</span>
                  ))}
                </p>
                <p className={css.text}>Lesson Info: <span className={css.subtitle}>{item.lesson_info}</span></p>
                <p className={css.text}>Conditions: <span className={css.subtitle}>{item.conditions}</span></p>
                </div>
                {isOpen === false ?
                (
                  <button
                  className={css.subtitleWithLine}
                    type="button"
                    onClick={() => handeleOpenMoreInfo(item.id)}
                  >
                    Read more
                  </button>
                ) : null}
              </div>
              {isOpen && (
                <>
                  <MoreInfoCatalog openMoreInfo={openMoreInfo} item={item} />
                </>
              )}
              <div className={css.containerLevel}>
                    {item.levels.map((item) => {
                      return ( <div key={item} className={css.blockLevel}>
                        <p className={css.textLevel}>{item}</p>
                      </div>)
                    })}
                  </div>
            {openMoreInfo && <button onClick={() => isOpened(item)} className={css.btn} type="button">Book trial lesson</button>}
            </div>
          </li>
        );
      })}
      {visibleCatalogs.length < catalogs.length && (
        <button onClick={loadMore} className={css.loadMore} type="button">Load More</button>
      )}
              <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </>
  );
}

export default Catalog;
