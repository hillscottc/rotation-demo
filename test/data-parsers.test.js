/* eslint-disable no-undef */
import chai from 'chai'
import moment from 'moment'

import { parseRotations, parseSpots, getRotationName,
  cpvByCreative, cpvByRotationDay, dateFormat } from '../src/data-parsers'

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
  it('should return array of spot json', async () => {
    const rotations = await parseRotations()
    const spots = await parseSpots(rotations)
    // console.log('spots', spots) // eslint-disable-line no-console
    spots.length.should.eql(7)
    spots[0].should.include.keys(
      'dateTime', 'rotation', 'creative', 'spend', 'views'
    )
  })
})

describe('cpvByCreative', () => {
  it('should return cost per view for a creative', async () => {
    const rotations = await parseRotations()
    const spots = await parseSpots(rotations)
    const cpv = cpvByCreative('TEST001H', spots)
    cpv.should.eql('2.81')
  })
})

describe('getRotationName', () => {
  it('should return rotation name for spot', () => {
    const dateTime = moment('12/01/2018 8:30 AM', dateFormat)
    return parseRotations().then(rotations => {
      const name = getRotationName(dateTime, rotations)
      name.should.eql('Morning')
    })
  })
})

describe('cpvByRotationDay', () => {
  it('should return cpvByRotationDay', async () => {
    const rotations = await parseRotations()
    const spots = await parseSpots(rotations)
    cpvByRotationDay(spots)
  })
})
