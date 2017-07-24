import { dupProp } from '../'

describe( 'Functional library', () => {
  it( 'duplicated props', () => {
    const obj = { name: 'Joaquina' }
    const nameDuplicate = dupProp( 'name', 'description' )
    expect( nameDuplicate( obj ).description ).toBe( 'Joaquina')
  } )
} )
