import css from './MoreInfoCatalog.module.css'
import iconDefaultAvatar from "../../images/Catalog/user.png"
import icon from '../../images/svg/stroke.svg'

function MoreInfoCatalog({openMoreInfo, item}) {
    return (
        <>
        {openMoreInfo && (
            <div className={css.container}>
                {item.reviews.map(review => {
                    return ( <div key={review.reviewer_name}>
                    <div className={css.blockInofUser}>
                        <img className={css.img} src={iconDefaultAvatar} alt="" />
                    <div className={css.blockReviewAndName}>
                    <p className={css.text}>{review.reviewer_name}</p>
                    <p className={css.subtitle}>
                    <svg className={css.svgBook} width="16" height="16">
                        <use href={`${icon}#icon-star`}></use>
                    </svg>
                        {review.reviewer_rating}
                        </p>
                    </div>
                    </div>
                    <p className={css.subtitle}>{review.comment}</p>
                    </div>)
                })}
            </div>
        )}
        </>
    )
}

export default MoreInfoCatalog;