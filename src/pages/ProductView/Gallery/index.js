import React, { useState } from "react"
import styles from "./Styles.module.scss"

const Gallery = ({ images }) => {
  const [currentImgUrl, setCurrentImgUrl] = useState(images[0].src)
  console.log("images", images)
  return (
    <div className={styles.galleryContainer}>
      {images.length > 0 ? (
        <>
          <ul className={styles.imgsList}>
            {images.map((image, i) => (
              <li
                key={`${images}-${i}`}
                onClick={() => setCurrentImgUrl(image.src)}
              >
                <img src={image.src} alt={image.alt} />
              </li>
            ))}
          </ul>
          <img
            src={currentImgUrl}
            alt={images[0].alt}
            className={styles.mainImage}
          />
        </>
      ) : null}
    </div>
  )
}

export default Gallery
