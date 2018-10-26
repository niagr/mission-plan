import * as React from 'react'
import * as ReactDom from 'react-dom'

import MainContainer from './components/MainContainer'

import './style.css'
import 'semantic-ui-css/semantic.min.css'

ReactDom.render(<MainContainer/>, document.getElementById('app'))