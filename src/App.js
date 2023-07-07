
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
function App() {
  return (
    <>
    <Navbar title = "Aditya Singh" about = "About Me"/>

    <div className='container my-3'>
      <TextForm heading="Enter text to analyse"/>
    </div>
    </>
  );
}

export default App;