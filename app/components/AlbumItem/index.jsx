import React from 'react'
import './style.less'

class AlbumListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // active: false
        }
    }

    render () {
        const { album, onClick, activeId } = this.props
        // const { active } = this.state
        const active  = album.id === activeId
        return (
        <li className={active ? "album__album active" : "album__album" } onClick={() => {
            onClick(album.id)}
        }>
            <img className="album__album__image" src="https://picsum.photos/id/214/200" />
            <span className="album__album__title">{album.title}</span>
        </li>
        )}
}

export default AlbumListItem