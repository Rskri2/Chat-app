import Header from './Header';
import Footer from './Footer';
import PropTypes from 'prop-types'
export default function HomePage({children}) {
  return (
    <>
    <Header/>
      <div>{children}</div>
    <Footer />
    </>
  )
}
HomePage.propTypes = {
  children:PropTypes.node,
  element:PropTypes.string
}

