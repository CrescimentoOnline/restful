import PropTypes from 'prop-types'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import { AppHeader, AppFooter, Title } from './kit/Layout'
import { Flex, Box } from 'grid-styled'

const TheApp = ({ viewer, children, relay }) => (
  <div data-framework="relay">
    <AppHeader>
      <Flex wrap align='center'>
        <Box p={3} width={[1, 1 / 2]}>
          <Title>TheApp</Title>
        </Box>
        <Box p={3} width={[1, 1 / 2]}>
          <h2>Sign in</h2>
        </Box>
      </Flex>
    </AppHeader>

    {children}

    <AppFooter />
  </div>
)

TheApp.propTypes = {
  viewer: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  relay: PropTypes.object.isRequired,
};

export default createFragmentContainer(
  TheApp,
  graphql`
    fragment TheApp_viewer on User {
      id
    }
  `,
);
