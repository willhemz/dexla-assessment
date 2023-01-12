import React, { useState, useCallback } from 'react'
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

  // THE BODY
  return (
    <main
      className='container'
      style={{
        backgroundColor: `rgba(${bg.r * c},${bg.g * c},${bg.b * c}, ${bg.a})`,
      }}>
      <button
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
        {obj.map((item) => {
          let frame = null
          switch (item.id) {
            case '1:11':
              frame = obj
                .filter((item) => item.id === '1:11')
                .reduce((item) => {
                  return { ...item }
                })
              break

            case '1:14':
              frame = obj
                .filter((item) => item.id === '1:14')
                .reduce((item) => {
                  return { ...item }
                })
              break

            case '201:157':
              frame = obj
                .filter((item) => item.id === '201:157')
                .reduce((item) => {
                  return { ...item }
                })
              break

            case undefined || null || '':
              frame = null
              break

            default:
              frame = item
              break
          }

          if (item === undefined || item === null || !item) {
            return <div></div>
          }
          if (item.id === '1:11') {
            const iconImage = frame.children.reduce((item) => {
              return { ...item }
            })
            return (
              <div
                key={item.id}
                style={{
                  width: `${frame.absoluteBoundingBox.width}px`,
                  height: `${frame.absoluteBoundingBox.height}px`,
                  background: `rgba(${frame.backgroundColor.r * c}, ${
                    frame.backgroundColor.g * c
                  }, ${frame.backgroundColor.b * c}, ${
                    frame.backgroundColor.a
                  })`,
                  borderRadius: `${frame.cornerRadius}px`,
                  position: 'absolute',
                  left: '50%',
                  top: `${frame.absoluteBoundingBox.y}px`,
                  transform: `translateX(${frame.absoluteBoundingBox.x}px)`,
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
            )
          }
          if (item.id === '1:14') {
            return (
              <div
                key={item.id}
                style={{
                  width: `${frame.absoluteBoundingBox.width}px`,
                  height: `${frame.absoluteBoundingBox.height}px`,
                  position: 'absolute',
                  left: '50%',
                  top: `${frame.absoluteBoundingBox.y}px`,
                  transform: `translateX(${frame.absoluteBoundingBox.x}px)`,
                  backgroundColor: `rgba(${frame.backgroundColor.r * c}, ${
                    frame.backgroundColor.g * c
                  }, ${frame.backgroundColor.b * c},${
                    frame.backgroundColor.a
                  })`,
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
                          item.absoluteBoundingBox.y -
                          frame.absoluteBoundingBox.y
                        }px`,
                      }}
                      className='text'
                      key={item.id}>
                      {item.name}
                    </p>
                  )
                })}
              </div>
            )
          }

          if (item.id === '201:157') {
            const dexlaStrokes = frame.strokes.reduce((item) => {
              return { ...item }
            })
            return (
              <div
                key={item.id}
                style={{
                  width: `${frame.absoluteBoundingBox.width}px`,
                  height: `${frame.absoluteBoundingBox.height}px`,
                  position: 'absolute',
                  top: `${frame.absoluteBoundingBox.y}px`,
                  left: '50%',
                  transform: `translateX(${frame.absoluteBoundingBox.x}px)`,
                  background: `rgba(${frame.backgroundColor.r * c},${
                    frame.backgroundColor.g * c
                  },${frame.backgroundColor.b * c},${frame.backgroundColor.a})`,
                  borderRadius: `${frame.cornerRadius}px`,
                  border: `${strokeWeight}px ${dexlaStrokes.type} rgba(${
                    dexlaStrokes.color.r * c
                  }, ${dexlaStrokes.color.g * c},${dexlaStrokes.color.b * c},${
                    dexlaStrokes.color.a
                  })`,
                  padding: `${frame.paddingTop}px ${frame.paddingRight}px ${frame.paddingBottom}px ${frame.paddingLeft}px`,
                  display: 'flex',
                  justifyContent: `${frame.primaryAxisAlignItems}`,
                  gap: `${frame.itemSpacing}px`,
                }}>
                {frame.children
                  .filter((dex) => dex.name === 'Logos')
                  .map((item) => {
                    return (
                      <img
                        key={item.id}
                        style={{
                          width: `${item.absoluteBoundingBox.width}px`,
                          height: `${item.absoluteBoundingBox.height}px`,
                          backgroundColor: `rgba(${
                            item.backgroundColor.r * c
                          }px,${item.backgroundColor.r * c},${
                            item.backgroundColor.g * c
                          },${item.backgroundColor.b * c},${
                            item.backgroundColor.a
                          })`,
                        }}
                        src={Logos}
                        alt={item.name}
                      />
                    )
                  })}
                {frame.children
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
                              ? `rgba(${cl.r * c},${cl.g * c},${cl.b * c},${
                                  cl.a
                                })`
                              : `rgba(${c},${c},${c}, 1)`

                          return (
                            <span
                              key={index}
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
            )
          }
          return (
            <div
              key={item.id}
              style={{
                width: `${frame.absoluteBoundingBox.width}px`,
                height: `${frame.absoluteBoundingBox.height}px`,
                position: 'absolute',
                top: `${frame.absoluteBoundingBox.y}px`,
                left: '50%',
                transform: `translateX(${frame.absoluteBoundingBox.x}px)`,
                background: `rgba(${frame.backgroundColor.r * c},${
                  frame.backgroundColor.g * c
                },${frame.backgroundColor.b * c},${frame.backgroundColor.a})`,
              }}>
              {frame.children.map((item) => {
                if (item.type === 'FRAME') {
                  return (
                    <img
                      key={item.id}
                      style={{
                        width: `${item.absoluteBoundingBox.width}px`,
                        height: `${item.absoluteBoundingBox.height}px`,
                        backgroundColor: `rgba(${
                          item.backgroundColor.r * c
                        }px,${item.backgroundColor.r * c},${
                          item.backgroundColor.g * c
                        },${item.backgroundColor.b * c},${
                          item.backgroundColor.a
                        })`,
                      }}
                      src={Logos}
                      alt={item.name}
                    />
                  )
                }
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
                    {item.name}
                  </p>
                )
              })}
            </div>
          )
        })}
      </button>
    </main>
  )
}

export default App
