import csv from 'csv-parser'
import fs from 'fs'

export const cpvByCreative = (creative, spotsJson) => {
  const spots = spotsJson.filter(x => x.creative === creative)
  return spots.reduce((a, b) => ({spend: a.spend + b.spend}))
}

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

export const parseSpots = (file = 'data-files/spots.csv') =>
  new Promise((resolve, reject) => {
    let jsonArr = []
    fs.createReadStream(file)
      .pipe(csv())
      .on('data', (data) => {
        jsonArr.push({
          date: data.Date,
          time: data.Time,
          creative: data.Creative,
          spend: data.Spend,
          views: data.Views
        })
      })
      .on('end', () => {
        resolve(jsonArr)
      })
      .on('error', (err) => {
        reject(err)
      })
  })
