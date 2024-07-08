import './App.css';
import Sidebar from './customer/customer';
import Contents from './customer/customerList';
import Header from './customer/header';
import CustomerView from './customer/customerView';
import CustomerRegister from './customer/customerRegister';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
            <>
              <Sidebar/>
              <div className="mainContent">
                <Header/>
                <Contents/>
              </div>
            </>
          }
        />
        <Route path="/customerView/:customerId" element={<CustomerView/>}/>
        <Route path="/customerRegister" element={<CustomerRegister/>}/>
      </Routes>
    </div>
  );
}

export default App;
