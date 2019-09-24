import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
        this.state = {
          username: '',
          password: ''
        }
    }
    render() {
        return (
          <div id="login-container">
            <div className="logo">
                <img src='http://www.tangerinesoftware.com/img/tangerine-logo.png' alt='logo'/>
            </div>
            <p className="form-error">{this.props.formError}</p>
              <div className="input-container user-container">
                  <i className="icon-user"></i>
                  <input
                      type="text"
                      placeholder="Username"
                      required
                      onChange={this.changeUsername.bind(this)}
                      value={this.state.username}
                  />
              </div>
              <div className="input-container password-container">
                  <i className="icon-key"></i>
                  <input type="password" 
                        placeholder="Password"
                        required
                        onChange={this.changePassword.bind(this)}
                        value={this.state.password}
                        />
              </div>
              <button className="btn-login btn" onClick={this.clickLogin.bind(this)}>Login</button>
              <button className="btn-register btn" onClick={this.clickRegister.bind(this)}>Register</button>
          </div>
        )
    }
    changeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    clickLogin() {
        const username = this.state.username
        const password = this.state.password
        const checkUser = this.props.checkUser
        checkUser(username, password)
    }
    clickRegister() {
        const username = this.state.username
        const password = this.state.password
        const registerUser = this.props.registerUser
        registerUser(username, password)
    }
}

export default Login
