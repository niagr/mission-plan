import * as React from 'react'
import * as ReactDom from 'react-dom'

import MainContainer from './components/MainContainer'

import './style.css'
// import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/components/site.min.css'
import 'semantic-ui-css/components/dimmer.min.css'
import 'semantic-ui-css/components/card.min.css'
import 'semantic-ui-css/components/modal.min.css'
import 'semantic-ui-css/components/header.min.css'
import 'semantic-ui-css/components/container.min.css'
import 'semantic-ui-css/components/loader.min.css'
import 'semantic-ui-css/components/button.min.css'
import 'semantic-ui-css/components/input.min.css'
import 'semantic-ui-css/components/form.min.css'
import 'semantic-ui-css/components/label.min.css'

ReactDom.render(<MainContainer/>, document.getElementById('app'))