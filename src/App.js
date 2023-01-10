import React, { useState, useEffect, useCallback } from 'react'
import Vector from './asset/Vector.png'
import Logos from './asset/Logos.png'

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
  const [view, setView] = useState(false)

  // SET VIEW TO FALSE AFTER 8s IDLE TIME
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (view) setView(false)
    }, 8000)
    return () => clearTimeout(timeout)
  }, [view])

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

  // ASSET ICON/PORTFOLIO
  const icon = obj
    .filter((item) => item.id === '1:11')
    .reduce((item) => {
      return { ...item }
    })

  const iconImage = icon.children.reduce((item) => {
    return { ...item }
  })

  // ASSET FRAME 307
  const frame = obj
    .filter((item) => item.id === '1:14')
    .reduce((item) => {
      return { ...item }
    })

  // DEXLA SIGNATURE
  const dexla = obj
    .filter((item) => item.id === '201:157')
    .reduce((item) => {
      return { ...item }
    })

  const dexlaStrokes = dexla.strokes.reduce((item) => {
    return { ...item }
  })

  // THE BODY
  return (
    <main
      className='container'
      style={{
        backgroundColor: `rgba(${bg.r * c},${bg.g * c},${bg.b * c}, ${bg.a})`,
      }}>
      <button
        onClick={() => setView(true)}
        className={`btn ${!view && 'showbtn'}`}>
        View Content
      </button>
      {view && (
        <article
          onClick={() => setView(false)}
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
          <div
            style={{
              width: `${icon.absoluteBoundingBox.width}px`,
              height: `${icon.absoluteBoundingBox.height}px`,
              background: `rgba(${icon.backgroundColor.r * c}, ${
                icon.backgroundColor.g * c
              }, ${icon.backgroundColor.b * c}, ${icon.backgroundColor.a})`,
              borderRadius: `${icon.cornerRadius}px`,
              position: 'absolute',
              left: '50%',
              top: `${icon.absoluteBoundingBox.y}px`,
              transform: `translateX(${icon.absoluteBoundingBox.x}px)`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <img
              style={{
                width: `${iconImage.absoluteBoundingBox.width}px`,
                height: `${iconImage.absoluteBoundingBox.height}px`,
              }}
              src={Vector}
              alt='vector'
            />
          </div>
          <div
            style={{
              width: `${frame.absoluteBoundingBox.width}px`,
              height: `${frame.absoluteBoundingBox.height}px`,
              position: 'absolute',
              left: '50%',
              top: `${frame.absoluteBoundingBox.y}px`,
              transform: `translateX(${frame.absoluteBoundingBox.x}px)`,
              backgroundColor: `rgba(${frame.backgroundColor.r * c}, ${
                frame.backgroundColor.g * c
              }, ${frame.backgroundColor.b * c},${frame.backgroundColor.a})`,
            }}>
            {frame.children.map((item) => {
              return (
                <p
                  style={{
                    fontFamily: `${item.style.fontFamily}, 'Trebuchet MS'`,
                    fontSize: `${item.style.fontSize}px`,
                    fontWeight: `${item.style.fontWeight}`,
                    letterSpacing: `${item.style.letterSpacing}px`,
                    lineHeight: `${item.style.lineHeightPx}px`,
                    height: `${item.absoluteBoundingBox.height}px`,
                    width: `${item.absoluteBoundingBox.width}px`,
                    textAlign: `${item.style.textAlignHorizontal}`,
                    position: 'absolute',
                    top: `${
                      item.absoluteBoundingBox.y - frame.absoluteBoundingBox.y
                    }px`,
                  }}
                  className='text'
                  key={item.id}>
                  {item.name}
                </p>
              )
            })}
          </div>
          <div
            style={{
              width: `${dexla.absoluteBoundingBox.width}px`,
              height: `${dexla.absoluteBoundingBox.height}px`,
              position: 'absolute',
              top: `${dexla.absoluteBoundingBox.y}px`,
              left: '50%',
              transform: `translateX(${dexla.absoluteBoundingBox.x}px)`,
              background: `rgba(${dexla.backgroundColor.r * c},${
                dexla.backgroundColor.g * c
              },${dexla.backgroundColor.b * c},${dexla.backgroundColor.a})`,
              borderRadius: `${dexla.cornerRadius}px`,
              border: `${strokeWeight}px ${dexlaStrokes.type} rgba(${
                dexlaStrokes.color.r * c
              }, ${dexlaStrokes.color.g * c},${dexlaStrokes.color.b * c},${
                dexlaStrokes.color.a
              })`,
              padding: `${dexla.paddingTop}px ${dexla.paddingRight}px ${dexla.paddingBottom}px ${dexla.paddingLeft}px`,
              display: 'flex',
              justifyContent: `${dexla.primaryAxisAlignItems}`,
              gap: `${dexla.itemSpacing}px`,
            }}>
            {dexla.children
              .filter((dex) => dex.name === 'Logos')
              .map((item) => {
                return (
                  <img
                    key={item.id}
                    style={{
                      width: `${item.absoluteBoundingBox.width}px`,
                      height: `${item.absoluteBoundingBox.height}px`,
                      backgroundColor: `rgba(${item.backgroundColor.r * c}px,${
                        item.backgroundColor.r * c
                      },${item.backgroundColor.g * c},${
                        item.backgroundColor.b * c
                      },${item.backgroundColor.a})`,
                    }}
                    src={Logos}
                    alt={item.name}
                  />
                )
              })}
            {dexla.children
              .filter((dex) => dex.id === '201:159')
              .map((item) => {
                const { color: cl } = item.fills.reduce((col) => {
                  return { ...col }
                })
                return (
                  <p
                    key={item.id}
                    style={{
                      width: `${item.absoluteBoundingBox.width}px`,
                      height: `${item.absoluteBoundingBox.height}px`,
                      fontFamily: `${item.style.fontFamily}`,
                      fontWeight: `${item.style.fontWeight}`,
                      fontSize: `${item.style.fontSize}px`,
                      letterSpacing: `${item.style.letterSpacing}px`,
                      lineHeight: `${item.style.lineHeightPx}px`,
                      textAlign: `${item.style.textAlignHorizontal}`,
                    }}>
                    {item.characters.split(' ').map((text, index) => {
                      let textCol =
                        text === 'Dexla'
                          ? `rgba(${cl.r * c},${cl.g * c},${cl.b * c},${cl.a})`
                          : `rgba(${c},${c},${c}, 1)`

                      return (
                        <span
                          style={{
                            color: `${textCol}`,
                          }}>
                          {text}{' '}
                        </span>
                      )
                    })}
                  </p>
                )
              })}
          </div>
        </article>
      )}
    </main>
  )
}

export default App
