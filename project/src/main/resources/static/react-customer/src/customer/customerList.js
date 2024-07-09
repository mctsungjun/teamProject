import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { CSSTransition } from 'react-transition-group'; 

function Contents(){
    let [findStr, setFindStr] = useState('')
    let [list,setList] = useState([])
    const navigate = useNavigate();

    // 사업자번호가지고 뭘하려했더라? view페이지로가져가려했었나?
    // useEffect(function(){
    //     fetch("/customerView?businessNumber="+businessNumber)
    //     .then(resp => resp.text())
    //     .then(msg=>{
    //         if(msg != null && msg !=''){
    //             let data = JSON.parse(msg)
    //             setVo(data);
    //         }
    //         console.log(vo)
    //     })
    // },[businessNumber])
    
    const handlecustomerClick = (businessNumber) =>{
        navigate(`/customerView/${businessNumber}`)
    }

    // register핸들러였던것?
    const handleRegisterClick = () =>{
        navigate("/customerRegister");
    }

    useEffect(()=>{
        axios({
            method : "get",
            url : "/bjmCustomerList",
            responseType : "json",
            params : {"findStr" : ''}
        }).then(resp=>{
            setList(resp.data);
        })
    },[])
    
    const find = () => {
        axios.get('/bjmCustomerList',{params : {findStr : findStr}})
        .then(resp=>{
            setList(resp.data);
        })
    }
    
    // 검색이였던것?
    // let find = () => {
    //     let findStr = document.querySelector(".inputSearch").value;
    //     setFindStr(findStr)
    //     // console.log("findStr",findStr)
    //     axios({
    //         method : "get",
    //         url:"/bjmCustomerList",
    //         responseType : "json",
    //         params : {"findStr":findStr}
    //     }).then((resp)=>{
    //         if(resp != null&& resp!=""){
    //             // console.log('test',resp.data)
    //             list = resp.data.map(m=>
    //                 <CSSTransition key={m.businessNumber} timeout={300} classNames="fade">
    //                 <div onClick={e=>setBusinessNumber(m.businessNumber)}>
    //                     <span>{m.sno}</span>
    //                     <span>{m.clientId}</span>
    //                     <span>{m.clientCodeType}</span>
    //                     <span>{m.representativeName}</span>
    //                     <span>{m.clientContact}</span>
    //                     <span>{m.contactNumber}</span>
    //                     <span>{m.address}</span>
    //                     <span>{m.email}</span>
    //                     <span>{m.businessNumber}</span>
    //                 </div>
    //                 </CSSTransition>
    //             )
    //             setList(list);
    //         }
    //     })
    // }
    
    
    return(
        <>
            <div className="contentsList">
                <div className="contentHeader">
                    <span className='id'>거래처명</span>
                    <span className='name'>대표자명</span>
                    <span className='name2'>담당자</span>
                    <span className='phone'>연락처</span>
                    <span className='address'>주소</span>
                    <span className='email'>이메일</span>
                    <span className='businessNumber'>사업자번호</span>
                </div>
                <div className="customerList">
                    {list.map((customer) => (
                        <CSSTransition key={customer.businessNumber} timeout={300} classNames="fade">
                            <div onClick={() => handlecustomerClick(customer.businessNumber)}>
                                <span>{customer.clientName}</span>
                                <span>{customer.representativeName}</span>
                                <span>{customer.clientContact}</span>
                                <span>{customer.contactNumber}</span>
                                <span>{customer.address}</span>
                                <span>{customer.email}</span>
                                <span>{customer.businessNumber}</span>
                            </div>
                        </CSSTransition>
                    ))}
                </div>
                <div className="searchZone">
                
                    <input type='text' className="inputSearch"defaultValue={findStr} onChange={e=>setFindStr(e.target.value)}placeholder='검색어를 입력해주세요'/>
                    <button type='button' className='btnSearch' onClick={find}>검색</button>
                </div>
                {/* 나중에 페이지네이션 처리해야함 */}
                <div className='pagination'>
                    <ul>
                        <li><a href='#'>&#171;</a></li>
                        <li><a href='#'>1</a></li>
                        <li><a href='#'>2</a></li>
                        <li><a href='#'>3</a></li>
                        <li><a href='#'>4</a></li>
                        <li><a href='#'>5</a></li>
                        <li><a href='#'>6</a></li>
                        <li><a href='#'>7</a></li>
                        <li><a href='#'>8</a></li>
                        <li><a href='#'>9</a></li>
                        <li><a href='#'>&#187;</a></li>
                    </ul>
                    <button type='button' className='btnRegister' onClick={handleRegisterClick}>등록</button>
                </div>
            </div>

        </>
    )
}
export default Contents
// git에서 node-module file을 ignore시켜야하는데 그 명령어를 찾아서 어떤 라이브러리?
// node-module ignore