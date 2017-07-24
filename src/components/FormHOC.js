
import React, { PropTypes } from 'react'
import { compose, withState, mapProps } from 'recompose'
import { isObject, deepset, identity, transform } from '../../fn'

export const ErrorComponent = ({ errors }) => (
  <ul className='form-errors'>
  { errors.map( ( error, index ) => (
      <li className='form-errors-item' key={ index }>{ error }</li>
    ) ) }
  </ul>
)

ErrorComponent.propTypes = {
  errors: PropTypes.array.isRequired,
}


export const getValue = ( fw ) => ( e ) => fw(e.target.value)
export const notNull = ( arr ) => arr.filter(identity)
export const ruleValidate = ( value ) => ({ rule, message }) => rule(value)? null : message
export const validator = ( validationRules ) => ({ name, value }) =>
  validationRules[name]? notNull(validationRules[name].map(ruleValidate(value))) : null

const getError = ( errors ) => errors && errors.length>0? <ErrorComponent errors={ errors } /> : null
const keysRemoval = [ '__dataID__', 'clientMutationId' ]
const cleanupDataForm = transform(
  ( key, value ) => value && isObject( value )?
                      cleanupDataForm( value ) :
                      keysRemoval.indexOf( key ) >=0 ? undefined : value
)

const FormValidate = ( initialState, validationRules = {} ) => {
  const validate = validator(validationRules)
  return compose(
    withState('state', 'updateState', { ...cleanupDataForm(initialState), errors: {} }),
    mapProps( ({ updateState, state, ...rest }) => ({
      onChange: ( name ) => ( value ) =>
        updateState( ( state ) => {
          const errors = getError( validate({ name, value }) )
          const newForm = deepset({ ...state.form }, name)
          return {
            ...state,
            form: { ...newForm(value) },
            errors: { ...state.errors, [name]: errors },
          }
        } ),
      form: state.form,
      errors: state.errors,
      ...rest,
    }) ),
  )
}

export default FormValidate
