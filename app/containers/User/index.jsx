import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import Albums from '../../components/Albums'
import Header from '../../components/Header'
import axios from 'axios'

class User extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
            albums: []
        }
    }
    
    componentDidMount() {
        // if not login, go to login page
        if (!this.props.userinfo.username) {
            hashHistory.push('/')
        } else {
            // axios.get('http://jsonplaceholder.typicode.com/albums')
            // .then(res => {
            //     this.setState({
            //         albums: res.data
            // }, function(){console.log(this.state)})
            // })

            fetch('http://jsonplaceholder.typicode.com/albums?_page=1&_limit=10')
            .then(res => res.json())
            .then((albums) => {
                this.setState({
                    albums: albums
            }, function(){console.log(this.state)})
            })
        }
    }

    

    render() {
        return (
            <div className="user__home">
                <Header user={this.props.userinfo}/>
                <Albums state={this.state} />
            </div>
        )
    }
}

// -------------------redux react bind--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User)
