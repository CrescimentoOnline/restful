import queryMiddleware from 'farce/lib/queryMiddleware'
import createRender from 'found/lib/createRender'
import makeRouteConfig from 'found/lib/makeRouteConfig'
import Route from 'found/lib/Route'
import { Resolver } from 'found-relay'
import React from 'react'
import { graphql } from 'react-relay'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

import TheApp from './components/TheApp'
import Signup from './core/components/authentication/Signup'

export const historyMiddlewares = [queryMiddleware]

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  })

  return new Resolver(environment)
}

const SignupQuery = graphql`
  query router_Signup_Query {
    viewer {
      ...Signup_viewer
    }
  }
`

export const routeConfig = makeRouteConfig(
  <Route
    path="/"
    Component={TheApp}
    query={graphql`
      query router_TheApp_Query {
        viewer {
          ...TheApp_viewer
        }
      }
    `}
  >
    <Route
      Component={Signup}
      query={SignupQuery}
      />
  </Route>,
)

export const render = createRender({})
