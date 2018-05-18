import csv from 'csv-parser'
import fs from 'fs'
import moment from 'moment'

export const getSpotName = (spot, rotations) => {
  for (let rotation of rotations) {
    // get this rotation's start/end for this spot's day
    const dateFormat = 'MM/DD/YYYY h:mm a'
    const rotStart = moment(`${spot.dateTime.format('MM/DD/YYYY')} ${rotation.start}`, dateFormat)
    const rotEnd = moment(`${spot.dateTime.format('MM/DD/YYYY')} ${rotation.end}`, dateFormat)
    const isInRotation = spot.dateTime >= rotStart && spot.dateTime <= rotEnd
    if (isInRotation) {
      console.log(`${spot.dateTime.format('MM/DD/YYYY h:mm a')} is in ${rotStart.format('MM/DD/YYYY h:mm a')} - ${rotEnd.format('MM/DD/YYYY h:mm a')}`) // eslint-disable-line no-console
      return {...spot, rotation: rotation.name}
    }
  }
}

export const cpvByRotationDay = () => {
  parseSpots().then(spots => {
    for (let spot of spots) {
      parseRotations().then(rotations => {
        getSpotName(spot, rotations)
        console.log('mod spot:', getSpotName(spot, rotations)) // eslint-disable-line no-console
      })
    }
  })
}

export const cpvByCreative = (creative, spotsJson) => {
  // spots for given creative
  const spots = spotsJson.filter(x => x.creative === creative)

  // total spend, view for the spots
  const totals = spots.reduce((a, b) => (
    {spend: a.spend + b.spend, views: a.views + b.views}))

  // avg spend/view
  return parseFloat(totals.spend / totals.views).toFixed(2)
}

/* Parse csv file for 'rotations' data, returns arry or json. */
export const parseRotations = (file = 'data-files/rotations.csv') =>
  new Promise((resolve, reject) => {
    let jsonArr = []
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => {
        jsonArr.push({start: data.Start, end: data.End, name: data.Name})
      })
      .on('end', () => {
        resolve(jsonArr)
      })
      .on('error', (err) => {
        reject(err)
      })
  })

/* Parse csv file for 'spots' data, returns arry or json. */
export const parseSpots = (file = 'data-files/spots.csv') =>
  new Promise((resolve, reject) => {
    let jsonArr = []
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => {
        jsonArr.push({
          dateTime: moment(`${data.Date} ${data.Time}`,
            'MM/DD/YYYY h:mm a'),
          creative: data.Creative,
          spend: parseFloat(data.Spend),
          views: parseInt(data.Views, 10)
        })
      })
      .on('end', () => {
        resolve(jsonArr)
      })
      .on('error', (err) => {
        reject(err)
      })
  })
