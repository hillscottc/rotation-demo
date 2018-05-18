/* eslint-disable no-undef */
import chai from 'chai'
import { parseRotations, parseSpots } from '../src/data-parsers'

let should = chai.should() // eslint-disable-line no-unused-vars

describe('parseRotations', () => {
  it('should return array of rotation json', (done) => {
    parseRotations('data-files/rotations.csv')
      .then((data) => {
        // console.log('data', data) // eslint-disable-line no-console
        data.length.should.eql(3)
        data[0].should.include.keys(
          'start', 'end', 'name'
        )
      })
    done()
  })
})

describe('parseSpots', () => {
  it('should return array of spot json', (done) => {
    parseSpots('data-files/spots.csv')
      .then((data) => {
        // console.log('data', data) // eslint-disable-line no-console
        data.length.should.eql(7)
        data[0].should.include.keys(
          'date', 'time', 'creative', 'spend', 'views'
        )
      })
    done()
  })
})
