import React, { useEffect} from 'react'
import Papa from 'papaparse'

const Firmnasa = ({setFirm}) => {

  useEffect(()=> {
    loadFirm()
  }, [])

  const loadFirm = async() => {

    const uri = 'https://firms.modaps.eosdis.nasa.gov/api/country/csv/0ecc2433c456aefd23dc65ab59133948/VIIRS_NOAA21_NRT/THA/3'

    const response = await fetch(uri)
    const text = await response.text()
    const jsonData = await Papa.parse(text, { header: true}).data
    setFirm(jsonData)

  }

  return null
}

export default Firmnasa
