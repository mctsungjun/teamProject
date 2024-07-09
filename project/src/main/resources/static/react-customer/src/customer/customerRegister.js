import '../css/customerView.css';
import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function CustomerRegister(){
    const navigate = useNavigate()

    const handleCancelRClick = () =>{
        navigate(-1);
    }
    const handleRegisterRClick = () =>{
        const temp = document.getElementById('clientForm');
        const frmRegister = new FormData(temp)
        const data = {};
        frmRegister.forEach((value,key) => {
            data[key] = value;
        })
        axios({
            method : "POST",
            url : "/customerRegister",
            data : frmRegister,
            responseType : "text"
        }).then(resp=>{
            if(resp.data == "") {
                console.log("Success");
                navigate('/bjmCustomerList');
            }else{
                alert(resp.data)

            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
    }
    return(
        <>
            <div className='contentsView'>
                <h1>신규 거래처 등록</h1>
                <form id='clientForm'>
                    <label htmlFor='businessNumber'>사업자 번호</label>
                    <input
                        type='text'
                        id='businessNumber'
                        name='businessNumber'
                        placeholder='사업자번호'
                        required
                    />
                    <label htmlFor='clientCode'>거래처 코드</label>
                    <input
                        type='text'
                        id='clientCode'
                        name='clientCode'
                        placeholder='거래처 코드'
                        required
                    />
                    <label htmlFor='clientCodeType'>거래처 코드 구분</label>
                    <input
                        type='text'
                        id='clientCodeType'
                        name='clientCodeType'
                        required
                    />
                    <label htmlFor='representativeName'>대표자명</label>
                    <input
                        type='text'
                        id='representativeName'
                        name='representativeName'
                        required
                    />
                    <label htmlFor='clientContact'>거래처 담당자</label>
                    <input
                        type='text'
                        id='clientContact'
                        name='clientContact'
                        required
                    />
                    <label htmlFor='clientId'>거래처 ID</label>
                    <input
                        type='text'
                        id='clientId'
                        name='clientId'
                        required
                    />
                    <label htmlFor='clientName'>거래처 이름</label>
                    <input
                        type='text'
                        id='clientName'
                        name='clientName'
                        required
                    />
                    <label htmlFor='contactNumber'>연락처</label>
                    <input
                        type='text'
                        id='contactNumber'
                        name='contactNumber'
                        required
                    />
                    <label htmlFor='address'>주소</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        required
                    />
                    <label htmlFor='email'>이메일</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        required
                    />
                    {/* <label htmlfor='registrationDate'>등록일</label>
                    <input
                        type='date'
                        id='registrationDate'
                        name='registrationDate'
                        required
                    /> */}
                    <label htmlFor='discountRate'>할인율</label>
                    <input
                        type='number'
                        id='discountRate'
                        name='discountRate'
                        required
                    />
                </form>
                <div className='btnZone'>
                    <button type='button' className='btnCancelR' onClick={handleCancelRClick}>취소</button>
                    <button type='button' className='btnRegisterR' onClick={handleRegisterRClick}>등록</button>
                </div>
            </div>
        </>
    )
}
export default CustomerRegister