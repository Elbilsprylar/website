import React, { useEffect, useState } from "react"
import ImageGallery from "react-image-gallery"
import styles from "./Styles.module.scss"

const Gallery = ({ images }) => {
  const [imagesList, setImagesList] = useState(null)

  useEffect(() => {
    if (images) {
      let list = []
      images.map((img) =>
        list.push({
          original: img.src,
          thumbnail: img.src,
        })
      )
      setImagesList(list)
    }
  }, [images])

  return (
    <div className={styles.galleryContainer}>
      {imagesList && imagesList.length > 0 && (
        <ImageGallery
          items={imagesList}
          showPlayButton={false}
          thumbnailPosition="bottom"
          showFullscreenButton={false}
          className={styles.imageGallCont}
          additionalClass={styles.imageGallCont}
        />
      )}
    </div>
  )
}

export default Gallery
