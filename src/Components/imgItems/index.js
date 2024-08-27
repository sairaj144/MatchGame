import './index.css'

const ImgItem = props => {
  const {appDetails, Onthumbnailclick} = props
  const {thumbnailUrl, id, imageUrl} = appDetails

  const onimgclick = () => {
    Onthumbnailclick(id, imageUrl)
  }

  return (
    <li>
      <button className="app-item" onClick={onimgclick} type="button">
        <img src={thumbnailUrl} alt="thumbnail" className="app-logo" />
      </button>
    </li>
  )
}

export default ImgItem
