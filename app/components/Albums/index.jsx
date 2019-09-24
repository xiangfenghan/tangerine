import React from 'react'
import AlbumList from '../AlbumList'
import AlbumDetail from '../AlbumDetail'
import './style.less'

class Albums extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentAlbum: null,
            activeId: 0
        }

        this.onAlbumClick = this.onAlbumClick.bind(this)
    }

    onAlbumClick = (id) => {
        fetch(`http://jsonplaceholder.typicode.com/photos/?albumId=${id}&_page=1&_limit=15`)
        .then(res => res.json())
        .then((album) => {
            // console.log(album)
            this.setState({
                currentAlbum: album,
                activeId: id
            })
        })
    }

    render() {

        const { currentAlbum, activeId } = this.state
        const { albums } = this.props.state
        return (
            <div className="album">
                <div className="album__lists">
                    <AlbumList albums={albums} onClick={this.onAlbumClick} activeId={activeId}/>
                </div>
                <div className="album__details">
                    <AlbumDetail album={currentAlbum}/>
                </div>
            </div>
        )
    }
}

export default Albums
