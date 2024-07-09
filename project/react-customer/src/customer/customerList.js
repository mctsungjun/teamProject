import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useEffect, useState, useRef} from 'react'
import axios from 'axios'

function Contents({customerClick}){
    let [vo,setVo] = useState('');
    let [findStr, setFindStr] = useState('')
    let [list,setList] = useState([])
    let [businessNumber, setBusinessNumber] = useState(0)

    // 사업자번호가지고 뭘하려했더라? view페이지로가져가려했었나?
    useEffect(function(){
        fetch("/customerView?businessNumber="+businessNumber)
        .then(resp => resp.text())
        .then(msg=>{
            if(msg != null && msg !=''){
                let data = JSON.parse(msg)
                setVo(data);
            }
            console.log(vo)
        })
    },[businessNumber])
    
    // 더미데이터였던것?
    const customers = [
        { id: 1, name: 'Customer A' },
        { id: 2, name: 'Customer B' },
        { id: 3, name: 'Customer C' }
    ]

    // 
    const navigate = useNavigate();
    const handlecustomerClick = (clientId) =>{
        navigate("/customerView/${clientId}")
    }

    // 검색이였던것?
    let find = () => {
        let findStr = document.querySelector(".findStr").value;
        setFindStr(findStr)
        console.log("findStr",findStr)
        axios({
            method : "get",
            url:"/customerList",
            responseType : "json",
            params : {"findStr":findStr}
        }).then((resp)=>{
            if(resp != null&& resp!=""){
                list = resp.data.map(m=>
                    <div onClick={e=>setBusinessNumber(m.businessNumber)}>
                        <span>{m.sno}</span>
                        <span>{m.clientId}</span>
                        <span>{m.clientCodeType}</span>
                        <span>{m.representativeName}</span>
                        <span>{m.clientContact}</span>
                        <span>{m.contactNumber}</span>
                        <span>{m.address}</span>
                        <span>{m.email}</span>
                        <span>{m.businessNumber}</span>
                    </div>
                )
                setList(list);
            }
        })
    }

    // 지워야할거같음 dropdown이지만 안할거같음
    // const [menu, setMenu] = useState(false)
    // const dropdownRef = useRef(null);
    
    // const toglemenu = () => {
    //     setMenu(!menu)
    // }
    // const handler =(e)=>{
    //     if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
    //         setMenu(false)
    //     }
    // }
    // useEffect(()=>{
    //     document.addEventListener("down",handler)
    //     return () =>{
    //         document.addEventListener("down",handler)
    //     }
    // },[])

    // register핸들러였던것?
    const handleRegisterClick = () =>{
        navigate("/customerRegister")
    }
    
    return(
        <>
            <div className="contentsList">
                <div className="contentHeader">
                    <span className='sno'>No</span>
                    <span className='id'>거래처명</span>
                    <span className='name'>대표자명</span>
                    <span className='name2'>담당자</span>
                    <span className='phone'>연락처</span>
                    <span className='address'>주소</span>
                    <span className='email'>이메일</span>
                    <span className='businessNumber'>사업자번호</span>
                </div>
                <div className="customerList">
                    <p onClick={handlecustomerClick}>test</p>
                    {list}
                </div>
                {/* 드롭다운 지워여할것 */}
                {/* <div className='dropmenu' ref={dropdownRef}>
                    dropdown menu
                    <butotn onClick={toglemenu} className="toglemenu">Menu</butotn>
                    {menu &&(
                        <ul className='dropdownMenu'>
                            <li className='dropItems'>test1</li>
                            <li className='dropItems'>test2</li>
                            <li className='dropItems'>test3</li>
                            <li className='dropItems'>test4</li>
                        </ul>
                    )}
                </div> */}

                <div className="searchZone">
                    <input type='text' className="inputSearch"defaultValue={findStr} placeholder='검색어를 입력해주세요'/>
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