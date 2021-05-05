import './css/app.css'
import Navbar from './components/navbar'
import OverallMainContainer from './containers/overallmaincontainer'

function App() {
  return (
    <div className="App">
      <Navbar />
      <OverallMainContainer className='glass'/>
    </div>
  );
}

export default App;
