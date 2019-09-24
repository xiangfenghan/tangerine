import React from 'react'
import './style.less'

const AlbumDetail = (props) => {

    if(!props.album) {
        return (
            <h2>Please select a album</h2>
        )
    }

    return (
        <div>
           {props.album.map( (detail) => {
               return (
                   <div className="album__detail" key={detail.id}>
                       <img className="album__detail__image" src={detail.thumbnailUrl} />
                       <p key={detail.id} className="album__detail__title">{detail.title}</p>
                   </div>
               )
           })}
        </div>
    )
}

export default AlbumDetail