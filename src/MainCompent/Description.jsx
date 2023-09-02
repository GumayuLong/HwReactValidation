import React, { Component } from 'react'
import { NavLink } from "react-router-dom";


export default class Description extends Component {
  render() {
    return (
      <div className="container">
        <h3>
              BT Bootcamp 51
          
          </h3>
          <p>
              HW4: Form Validation
              Click  <NavLink to='/formValidation'>Here !</NavLink>
          </p>
      </div>

    )
  }
}
