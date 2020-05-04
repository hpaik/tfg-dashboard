import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Heading from './heading'
import Container from './container-fluid'

class ContentArea extends Component {

  render () {
    return (
      <div>
        <Heading title="Dashboard" description="This is our dashboard" />
        <Container />
      </div>
    )
  }
}

const content_area = document.getElementById('content-area')

ReactDOM.render(<ContentArea />, content_area)
