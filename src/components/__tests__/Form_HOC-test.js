import React from 'react'
import FormValidate, { ErrorComponent, ruleValidate, validator } from '../Form_HOC'
import { identity, deepset } from '../../../fn'
import { mount } from 'enzyme'
import { Stateful } from 'react-mock'

describe('FormValidate', () => {
  let Form
  let wrapper
  let stateful
  let onChange
  beforeAll(() => {
    Form = FormValidate({
      form: {
        name: 'Bruno',
      }
    }, {
      name: [{ rule: identity, message: 'Name must be provided' }]
    })( Stateful )
    wrapper = mount(<Form />)
    stateful = wrapper.find(Stateful)

    onChange = stateful.prop('onChange')
  })

  const formState = () => stateful.prop('form')
  const errorsState = () => stateful.prop('errors')

  it('Change input fields', () => {
    expect(formState().name).toBe('Bruno')
    onChange('name')('John')
    expect(formState().name).toBe('John')
  })

  it('rule evaluation', () => {
    const rule = { rule: (val) => val && val.length > 3, message: 'Name must have at least 3 characters' }
    const value = '12'
    const error = ruleValidate(value)(rule)
    expect(error).toBe(rule.message)
  })

  it('validationRules', () => {
    const validationRules = {
      name: [
        { rule: identity, message: 'Name must be provided' },
        { rule: (val) => val && val.length > 3, message: 'Name must have at least 3 characters' }
      ]
    }

    const validate = validator(validationRules)
    const name = 'name'
    const value = '12'
    const errors = validate({ name, value })
    expect( errors.length ).toBe(1)
    expect( errors[0] ).toBe(validationRules.name[1].message)
  })

  it('Expect validation error', () => {
    onChange('name')('')
    expect(formState().name).toBe('')
    expect(errorsState().name).toBeDefined()
    expect(errorsState().name.props.errors).toBeDefined()
    expect(errorsState().name.props.errors[0]).toBe('Name must be provided')
    expect(errorsState().name.type).toBe(ErrorComponent)
  })

  it('Deepset', () => {
    const obj = {}
    deepset(obj, 'a.b.c.d')(21)
    expect(obj.a).toBeDefined()
    expect(obj.a.b).toBeDefined()
    expect(obj.a.b.c).toBeDefined()
    expect(obj.a.b.c.d).toBe(21)
  })
})
