/* eslint-disable no-console */
import {parseRotations, parseSpots, getCreatives,
  cpvByCreative, cpvByRotationDay} from './data-parsers'

const report = async () => {
  const rotations = await parseRotations()
  const spots = await parseSpots(rotations)
  const creatives = getCreatives(spots)

  console.log('CPV PER CREATIVE')
  for (let creative of creatives) {
    console.log(` ${creative} :`, cpvByCreative(creative, spots))
  }

  const resultsMap = cpvByRotationDay(spots)
  console.log('\nCPV PER ROTATION DAY')
  resultsMap.forEach(v => console.log(v))
}

report()
