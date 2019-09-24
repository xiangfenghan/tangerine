import React from 'react'
import AlbumListItem from '../AlbumItem'

const AlbumList = ({ albums, ...props }) => (
    <ul>
        {albums.map( album => {
            return (
                <AlbumListItem album={album} key={album.id} {...props} />
            )
        })}
    </ul>
)

export default AlbumList