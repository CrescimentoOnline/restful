import PropTypes from 'prop-types'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import Input from 'react-enhanced-form'
import { FormArea, Label, PrimaryButton } from '../../../components/kit/Form'
import { Flex, Box } from 'grid-styled'
import { compose, withState, withHandlers } from 'recompose'

const hoc = compose(
  withState('userName', 'updateUserName', ''),
  withState('password', 'updatePasswordConfirmation', ''),
  withHandlers({
    handleConfirm: props => () => {
      props.userName
    },
  })
)
const SignUp = ({ viewer, updateUserName, handleConfirm }) => (
  <Flex wrap align='flex-end'	justify='space-around'>
    <FormArea>
      <Label>Name</Label>
      <PrimaryButton onClick={handleConfirm} />
    </FormArea>
  </Flex>
)

SignUp.propTypes = {
  viewer: PropTypes.object.isRequired,
}

export default createFragmentContainer(
  hoc(SignUp),
  graphql`
    fragment Signup_viewer on User {
      id
    }
  `,
)
