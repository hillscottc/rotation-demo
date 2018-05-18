import csv from 'csv-parser'
import fs from 'fs'

export const parseRotations = (file) =>
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

export const parseSpots = (file) =>
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
