import React, { useState } from "react"
import styles from "./Styles.module.scss"

const Gallery = ({ images }) => {
  const [currentImgUrl, setCurrentImgUrl] = useState(images[0].src)
  return (
    <div className={styles.galleryContainer}>
      {images.length > 0 ? (
        <>
          <div className={styles.galleryImgContainer}>
            <img
              src={currentImgUrl}
              alt={images[0].alt}
              className={styles.mainImage}
            />
          </div>
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
        </>
      ) : null}
    </div>
  )
}

export default Gallery
