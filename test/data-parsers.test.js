/* eslint-disable no-undef, no-console */
import chai from 'chai'
import moment from 'moment'

import { parseRotations, parseSpots, getRotationName,
  cpvByCreative, cpvByRotationDay, getCreatives,
  dateFormat } from '../src/data-parsers'

let should = chai.should() // eslint-disable-line no-unused-vars

describe('parseRotations', () => {
  it('should return array of rotation json', () => {
    return parseRotations().then(data => {
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
    // console.log('spots', spots)
    spots.length.should.eql(7)
    spots[0].should.include.keys(
      'dateTime', 'rotation', 'creative', 'spend', 'views'
    )
  })
})

describe('getCreatives', () => {
  it('should return Set of creative names', async () => {
    const rotations = await parseRotations()
    const spots = await parseSpots(rotations)
    const creatives = getCreatives(spots)
    creatives.size.should.eql(2)
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
  it('should return Map of cpvByRotationDay', async () => {
    const rotations = await parseRotations()
    const spots = await parseSpots(rotations)
    const resultsMap = cpvByRotationDay(spots)
    // resultsMap.forEach(v => console.log(v))
    resultsMap.size.should.eql(4)
  })
})
