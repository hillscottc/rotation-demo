/* eslint-disable no-undef */
import chai from 'chai'
import { parseRotations, parseSpots, cpvByCreative } from '../src/data-parsers'

let should = chai.should() // eslint-disable-line no-unused-vars

describe('parseRotations', () => {
  it('should return array of rotation json', () => {
    return parseRotations().then(data => {
      // console.log('data', data) // eslint-disable-line no-console
      data.length.should.eql(3)
      data[0].should.include.keys(
        'start', 'end', 'name'
      )
    })
  })
})

describe('parseSpots', () => {
  it('should return array of spot json', () => {
    return parseSpots().then(data => {
      // console.log('data', data) // eslint-disable-line no-console
      data.length.should.eql(7)
      data[0].should.include.keys(
        'date', 'time', 'creative', 'spend', 'views'
      )
    })
  })
})

// describe('cpvByCreative', () => {
//   it('should return cost per view for a creative', () => {
//     return parseSpots().then(data => {
//       const cpv = cpvByCreative('TEST001H', data)
//       // cpv.should.eql('dd')
//       console.log('cpv', cpv) // eslint-disable-line no-console
//     })
//   })
// })
