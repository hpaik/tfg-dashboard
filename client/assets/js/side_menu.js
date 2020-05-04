import React, { Component} from 'react'
import ReactDOM from 'react-dom'

class Sidemenu extends Component {

  render () {
    const elements = ['UML Diagram', 'Network', 'Settings'];
    const icons = ['archive','area-chart','cog'];
    const items = [];
    for (const [index, value] of elements.entries()) {

      items.push(<a key={index} href="#">
                    <i className={`fa fa-${icons[index]}`} aria-hidden="true"></i>
                    {value}
                 </a>)
    }
    {
      /*
        The for statement creates as many options for the sideMenu as the user states in elements[]
        items[] is the array containing each of the option <tag>
        icons[] contains the font-awesome 4 icon names for each input

      */
    }
    return (
        <nav>
          {items}
        </nav>
    )
  }
}

const sidemenu = document.getElementById('sideMenu')

ReactDOM.render(<Sidemenu />, sidemenu)
