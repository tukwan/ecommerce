import React from 'react'

import './app.css'
import { Nav } from './components/nav'
import { Container } from './components/container'

export const App = () => {

  return (
    <div>
      <section className="hero is-dark is-bold">
        <div className="hero-head">
          <Nav />
        </div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Guitar Shop</h1>
            {/* <h2 className="subtitle"></h2> */}
          </div>
        </div>
      </section>
      <Container />
      {/* <TestStore /> */}
    </div>
  )
}
