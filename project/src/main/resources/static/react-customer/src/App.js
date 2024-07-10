import './App.css';
import Sidebar from './customer/customer';
import Contents from './customer/customerList';
import Header from './customer/header';
import CustomerView from './customer/customerView';
import CustomerRegister from './customer/customerRegister';
import { Routes, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {NaviItem} from './customer/naviItem';

function App() {
  return (
    <div className="container">
      <TransitionGroup>
      <CSSTransition timeout={300} classNames="fade">
      <Routes>
        <Route path="/" element={
            <>
              <Sidebar/>
              <div className="mainContent">
                <Header/>
                <Contents/>
                <NaviItem/>
              </div>
            </>
          }
        />
        <Route path="/customerView/:businessNumber" element={<CustomerView/>}/>
        <Route path="/customerRegister" element={<CustomerRegister/>}/>
      </Routes>
      </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
