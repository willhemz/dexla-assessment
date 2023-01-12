import React, { useEffect, useState } from 'react'

const Item = ({ obj, c, strokeWeight, Logos, Vector, setView, view }) => {
  const [itemShow, setItemShow] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (itemShow) {
        setItemShow(false)
      }
    }, 5000)
    return () => clearTimeout(timeout)
  }, [itemShow])
  return (
    <>
      {itemShow && (
        <p
          style={{
            color: 'white',
            background: 'red',
            padding: '5px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
            Oops!!! DOM Object is now a button
          </span>
          <span style={{ fontSize: '18px', fontStyle: 'italic' }}>
            One of the destructured item is not an object
          </span>
        </p>
      )}
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
          if (Array.isArray(item) === true) {
            setView({ ...view, btn: true, div: false })
            setItemShow(true)
            return <div></div>
          }
          return (
            <div
              key={item.id}
              style={{
                width: `${frame.absoluteBoundingBox.width}px`,
                height: `${frame.absoluteBoundingBox.height}px`,
                background: `rgba(${frame.backgroundColor.r * c}, ${
                  frame.backgroundColor.g * c
                }, ${frame.backgroundColor.b * c}, ${frame.backgroundColor.a})`,
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
    </>
  )
}

export default Item
