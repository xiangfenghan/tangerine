import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LoginComponent from '../../components/Login'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser, registerUser} from '../../fetch/user/userInfo'

import * as userInfoActionsFromOtherFile from '../../actions/userinfo'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          checking: true,
          username: '',
          password: '',
          formError: ''
        }
    }
    
    render() {
        return (
            <div>
                {
                  this.state.checking
                  ?<div>{/*Loading*/}</div>
                  :<LoginComponent loginHandle={this.loginHandle.bind(this)} checkUser={this.checkUser.bind(this)} registerUser={this.registerUser.bind(this)} formError={this.state.formError}/>
                }
            </div>
        )
    }

    componentDidMount(){
      this.doCheck()
    }

    doCheck(){
      const userinfo = this.props.userinfo
      if(userinfo.username){
        //already logined , forward to user page
        this.goUserPage()
      }else{
        //has not logined , check and ready to login
        this.setState({
          checking: false
        })
        // console.log(this.state)
      }
    }

    goUserPage(){
      hashHistory.push('/User')
    }

    checkUser(username, password) {
      const result = getUser(username, password)
      result.then(res => {
        return res.json()
      }).then(json => {
          //save username
          const actions = this.props.userInfoActions
          let userinfo = this.props.userinfo
          userinfo.username = json.username
          userinfo.password = json.password
          actions.login(userinfo)
          this.goUserPage()
      }).catch(ex => {
        this.setState({
          formError: "We can't find you, please try again"
        })
          if (__DEV__) {
              console.error('No this user : ', ex.message)
          }
      })
    }

    registerUser(username, password) {
      const result = registerUser(username, password)
      result.then(res => {
          return res.json()
      }).then(json => {
          if (json.errno === 0) {
            // register successfully go to user page
            const actions = this.props.userInfoActions
            let userinfo = this.props.userinfo
            userinfo.username = json.username
            userinfo.password = json.password
            actions.update(userinfo)
            this.goUserPage()
          }
      })
    }

    //deal data after logining
    loginHandle(username, password) {

      //save username
      const actions = this.props.userInfoActions
      // console.log(actions)
      let userinfo = this.props.userinfo
      userinfo.username = username
      userinfo.password = password
      actions.login(userinfo)

      const params = this.props.params
      const router = params.router
      if(router) {
        hashHistory.push(router)
      }else{
        this.goUserPage()
      }
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
