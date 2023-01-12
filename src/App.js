import React, { useState, useCallback } from 'react'
import Vector from './asset/Vector.png'
import Logos from './asset/Logos.png'
import Item from './Item'

const url = 'https://api.figma.com/v1/files/vRCqsniN1t2PndqlKeYQwI'

const myHeaders = new Headers()
myHeaders.append(
  'X-Figma-Token',
  'figd_dN1neMPKHHmnDFU4AFlSMPwv6ZqLqK_ANxk7hj3l'
)

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
}

const App = () => {
  // STATE CONDITIONS
  const [state, setState] = useState({ loading: true, error: false, data: {} })
  const [view, setView] = useState({ btn: false, div: true })

  // Default rgb value
  const c = 255

  // HANDLE STATE FUNCTION
  const handleState = (x, y, z) => {
    setState({ loading: x, error: y, data: z })
  }

  // FETCH FIGMA JSON FILE
  const fetchData = useCallback(async () => {
    handleState(true, false, {})
    try {
      const response = await fetch(url, requestOptions)
      if (response.status >= 200 && response.status <= 299) {
        const val = await response.json()
        const { document, styles, thumbnailUrl, version } = val
        const doc = document.children.map((item) => {
          return {
            id: item.id,
            children: item.children,
            backgroundColor: item.backgroundColor,
          }
        })
        handleState(false, false, { doc, styles, thumbnailUrl, version })
      } else handleState(false, true, {})
    } catch (error) {
      console.log(error)
      handleState(false, true, {})
    }
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const { loading, error, data } = state
  const { doc } = data

  // IF LOADING IS TRUE, DISPLAY THIS
  if (loading) {
    return (
      <main className='container'>
        <div className='loader'></div>
      </main>
    )
  }

  // IF DATA COULDN'T BE FETCHED, DISPLAY THIS
  if (error) {
    return (
      <main className='container'>
        <img
          src='https://media.istockphoto.com/id/1364478157/photo/404-error-page-concept-of-computer-error-3d-rendering.jpg?s=612x612&w=0&k=20&c=-tlELEiD2ilS0swbjinAvMssrCkQn7DTs8lx7hAQK0s='
          alt='ERROR 404'
        />
      </main>
    )
  }

  // DESTRUCTURING GENERATED DATA
  const { children, backgroundColor: bg } = doc.reduce((item) => {
    return { ...item }
  })

  const {
    children: obj,
    absoluteBoundingBox: size,
    cornerRadius,
    strokeWeight,
    backgroundColor: bcg,
    strokes,
  } = children.reduce((item) => {
    return { ...item }
  })

  const { color, type } = strokes.reduce((item) => {
    return { ...item }
  })

  // handleclick function
  const handleClick = (e) => {
    e.preventDefault()
    if (view.btn) setView({ ...view, btn: false, div: true })
    if (view.div) setView({ ...view, btn: true, div: false })
  }

  // THE BODY
  return (
    <main
      className='container'
      style={{
        backgroundColor: `rgba(${bg.r * c},${bg.g * c},${bg.b * c}, ${bg.a})`,
      }}>
      {view.btn && (
        <button
          onClick={handleClick}
          className='article'
          id='asset--button'
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            borderRadius: `${cornerRadius}px`,
            border: `${strokeWeight}px ${type} rgba(${color.r * c}, ${
              color.g * c
            }, ${color.b * c},${color.a})`,
            background: `rgba(${bcg.r * c},${bcg.g * c},${bcg.b * c},${bcg.a})`,
            position: 'relative',
          }}>
          <Item
            obj={obj}
            c={c}
            strokeWeight={strokeWeight}
            Vector={Vector}
            Logos={Logos}
            setView={setView}
            view={view}
          />
        </button>
      )}
      {view.div && (
        <div
          onClick={handleClick}
          className='article'
          id='asset--button'
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            borderRadius: `${cornerRadius}px`,
            border: `${strokeWeight}px ${type} rgba(${color.r * c}, ${
              color.g * c
            }, ${color.b * c},${color.a})`,
            background: `rgba(${bcg.r * c},${bcg.g * c},${bcg.b * c},${bcg.a})`,
            position: 'relative',
          }}>
          <Item
            obj={obj}
            c={c}
            strokeWeight={strokeWeight}
            Vector={Vector}
            Logos={Logos}
            setView={setView}
            view={view}
          />
        </div>
      )}
    </main>
  )
}

export default App
