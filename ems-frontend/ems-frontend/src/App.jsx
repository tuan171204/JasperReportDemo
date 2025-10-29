import './App.css'
import Employee from './components/Employee'
import ExportList from './components/ExportList'
import Footer from './components/Footer'
import Header from './components/Header'
import ListEmployee from './components/ListEmployee'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ListEmployee />}></Route>

          <Route path='/employees' element={<ListEmployee />}></Route>

          <Route path='/add-employee' element={<Employee />}></Route>

          <Route path='/edit-employee/:id' element={<Employee />}></Route>

          <Route path='/export-list' element={<ExportList />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
