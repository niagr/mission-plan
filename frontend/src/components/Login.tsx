import * as React from 'react'
import * as queryString from 'query-string'
import { RouteComponentProps, withRouter } from 'react-router';
import { apiService } from 'services/api';

interface LoginProps extends RouteComponentProps {

}

class Login extends React.Component<LoginProps> {

  componentDidMount () {
    this.logIn()
  }

  async logIn () {
    const {history} = this.props
    const {code, state} = queryString.parse(location.search)
    console.log(code, state)
    if (typeof code == 'string' && typeof state == 'string') {
      const ok = await apiService.login(code, state)
      if (ok) {
        history.push('/')
      }
    } else {
      throw new Error(`code and state should be strings but were instead ${typeof code} and ${typeof state} respectively.`)
    }
  }

  render () {
    return (
      <div>
        Logging in...
      </div>
    )
  }

}

export default withRouter(Login)
