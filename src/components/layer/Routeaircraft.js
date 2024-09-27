import { collectionOf } from '@turf/turf'
import React from 'react'
import { Polyline } from 'react-leaflet'

const Routeaircraft = ({aircraft}) => {

  const position = aircraft && aircraft
  .map(item=>[item.latitude,item.longitude])

  // console.log('line ', position)

  return aircraft && <Polyline 
  positions={position} 
  pathOptions={{
    color: 'red',
    weight: '3'
  }}
  />
}

export default Routeaircraft
