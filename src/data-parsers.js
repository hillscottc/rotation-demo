import csv from 'csv-parser'
import fs from 'fs'
import moment from 'moment'

export const dateFormat = 'MM/DD/YYYY h:mm a'

export const getRotationName = (dateTime, rotations) => {
  for (let rotation of rotations) {
    // get this rotation's start/end moment for this spot's day
    const rotStart = moment(`${dateTime.format('MM/DD/YYYY')} ${rotation.start}`, dateFormat)
    const rotEnd = moment(`${dateTime.format('MM/DD/YYYY')} ${rotation.end}`, dateFormat)
    if (dateTime >= rotStart && dateTime <= rotEnd) {
      return rotation.name
    }
  }
}

export const cpvByRotationDay = (spots) => {
  // const spotMap = new Map()
  for (let spot of spots) {
    // get all spots for that day
    const matched = spots.filter(x =>
      spot.dateTime.isSame(x.dateTime, 'day') &&
      spot.rotation === x.rotation &&
      spot !== x
    )
    console.log(`${JSON.stringify(spot)} matched:`, matched) // eslint-disable-line no-console

    // getSpotName(spot, rotations)
    // console.log('mod spot:', getSpotName(spot, rotations)) // eslint-disable-line no-console
  }
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
export const parseSpots = (rotations, file = 'data-files/spots.csv') =>
  new Promise((resolve, reject) => {
    let jsonArr = []
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => {
        const dateTime = moment(`${data.Date} ${data.Time}`, dateFormat)
        jsonArr.push({
          dateTime: dateTime,
          rotation: getRotationName(dateTime, rotations),
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
