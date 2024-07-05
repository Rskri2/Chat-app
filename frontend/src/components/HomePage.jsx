import React from 'react'
import Header from './ui/Header';
import Footer from './ui/Footer';
import PropTypes from 'prop-types'
export default function HomePage({children, element}) {
  return (
    <>
    <Header/>
      <div>{children}</div>
    <Footer element={element}/>
    </>
  )
}
HomePage.propTypes = {
  children:React.ReactNode,
  element:PropTypes.string
}

