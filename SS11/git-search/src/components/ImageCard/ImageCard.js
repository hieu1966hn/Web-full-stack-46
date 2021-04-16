function ImageCard({
  imageUrl = 'https://doctors24h.vn/uploads/faqs/03_2020/02/meo-bi-ho-nhu-the-nao.jpg',
  description = 'Meo meo'
}) {
  return (
    <div className="image-row row mb-3">
      <div className="image-card col-12 col-md-3">
        <img
          className="img-fluid"
          src={imageUrl}
          alt="vietnam"
        />
      </div>
      <div className="image-description col-12 col-md-9">
        <h1>{description}</h1>
      </div>
    </div>
  )
}
export default ImageCard;