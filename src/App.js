import React, { useState, useEffect, useCallback } from 'react'
import Vector from './asset/Vector.png'

const url =
  'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5f4ffc66-324b-4560-9ef9-34f12c06a4c0/Figma-Candidate-Test.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230108%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230108T112947Z&X-Amz-Expires=86400&X-Amz-Signature=c91d7aa8754e5b8dfc7b52c432ffe8c691df7c0bfb2f0345adedd6ab97a01571&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Figma-Candidate-Test.json%22&x-id=GetObject'

const App = () => {
  // STATE CONDITIONS
  const [state, setState] = useState({ loading: true, error: false, data: {} })
  const [view, setView] = useState(false)

  // SET VIEW TO FALSE AFTER 8s IDLE TIME
  useEffect(() => {
    setTimeout(() => {
      if (view) setView(false)
    }, 8000)
  }, [view])

  // HANDLE STATE FUNCTION
  const handleState = (x, y, z) => {
    setState({ loading: x, error: y, data: z })
  }

  // FETCH FIGMA JSON FILE
  const fetchData = useCallback(async () => {
    handleState(true, false, {})
    try {
      const response = await fetch(url)
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
  } = children.reduce((item) => {
    return { ...item }
  })

  const icon = obj
    .filter((item) => item.id === '1:11')
    .reduce((item) => {
      return { ...item }
    })

  const frame = obj
    .filter((item) => item.id === '1:14')
    .reduce((item) => {
      return { ...item }
    })

  // THE BODY
  return (
    <main
      className='container'
      style={{
        backgroundColor: `rgba(${bg.r * 255},${bg.g * 255},${bg.b * 255}, ${
          bg.a
        })`,
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
            border: `${strokeWeight}px solid rgba(${0.800000011920929 * 255}, ${
              0.800000011920929 * 255
            }, ${0.800000011920929 * 255},1)`,
            background: 'rgba(255,255,255,1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
          }}>
          <div
            style={{
              width: `${icon.absoluteBoundingBox.width}px`,
              aspectRatio: 1,
              background: `rgba(${0.95686274766922 * 255}, ${
                0.9803921580314636 * 255
              }, ${0.9803921580314636 * 255},1)`,
              borderRadius: `${icon.cornerRadius}px`,
              border: `${icon.strokeWeight}px solid rgba(${
                0.95686274766922 * 255
              }, ${0.9803921580314636 * 255}, ${0.9803921580314636 * 255},1)`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <img
              style={{ width: '24px', height: '24px' }}
              src={Vector}
              alt='vector'
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              width: '232px',
              height: '50px',
            }}>
            {frame.children.map((item) => {
              return (
                <p
                  style={
                    item.id === '1:15'
                      ? {
                          color: `rgba(${0.07058823853731155 * 255}, ${
                            0.07058823853731155 * 255
                          }, ${0.07058823853731155 * 255}, 1)`,
                        }
                      : {
                          color: `rgba(${0.4627451002597809 * 255}, ${
                            0.4588235318660736 * 255
                          }, ${0.48235294222831726 * 255}, 1)`,
                        }
                  }
                  className='text'
                  key={item.id}>
                  {item.name}
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
