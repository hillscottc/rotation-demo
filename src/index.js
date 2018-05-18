import {parseRotations, parseSpots} from './data-parsers'

const report = async () => {
  const rotations = await parseRotations('data-files/rotations.csv')
  console.log('rotations:', rotations) // eslint-disable-line no-console

  const spots = await parseSpots('data-files/spots.csv')
  console.log('spots:', spots) // eslint-disable-line no-console
}

report()
