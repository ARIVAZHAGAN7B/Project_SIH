import Navbar from '../components/Navbar'
import RoutePage from '../routes/RoutePage'
import Footer from '../components/Footer'
import RangoliPage from '../pages/RangoliPage'
const AppLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <RoutePage/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default AppLayout
