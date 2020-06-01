import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Heading from './heading'
import Container from './container-fluid'

class ContentArea extends Component {

  render () {
    return (
      <div>
        <Heading title="Smart Contracts Analysis Dashboard" description="This dashboard was developed to aid Ethereum developers in visually statically and dynamically analyzing their Smart Contracts" />
        <Container />
      </div>
    )
  }
}

const content_area = document.getElementById('content-area')

ReactDOM.render(<ContentArea />, content_area)
