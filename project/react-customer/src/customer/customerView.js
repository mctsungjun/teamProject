import '../css/customerView.css';
import React from 'react'
import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function CustomerView(){
    const {clientId} = useParams();
    const [customer, setCustomer] = useState();
    useEffect(()=>{
        axios.get('/api/customers/${clientId')
        .then(response=>{
            setCustomer(response.data)
        })
        .catch(error=>{
            console.error("Error fetching customer data:",error)
        })
    },[clientId])
    if (!customer){
        return<div>Loading</div>
    }
    return(
        <>
            <h1>거래처 상세보기</h1>
            <div className='contentsView'>
                <form id='clientForm'>
                    <label htmlFor='businessNumber'>사업자 번호</label>
                    <input
                        type='text'
                        id='businessNumber'
                        name='businessNumber'
                        placeholder='사업자번호'
                        value={customer.businessNumer}
                        readOnly
                    />
                    <label htmlfor='clientCode'>거래처 코드</label>
                    <input
                        type='text'
                        id='clientCode'
                        name='clientCode'
                        placeholder='거래처 코드'
                        readOnly
                    />
                    <label htmlfor='clientCodeType'>거래처 코드 구분</label>
                    <input
                        type='text'
                        id='clientCodeType'
                        name='clientCodeType'
                        readOnly
                    />
                    <label htmlfor='representativeName'>대표자명</label>
                    <input
                        type='text'
                        id='representtativeName'
                        name='representtativeName'
                        readOnly
                    />
                    <label htmlfor='clientContact'>거래처 담당자</label>
                    <input
                        type='text'
                        id='clientContact'
                        name='clientContact'
                        readOnly
                    />
                    <label htmlfor='clientId'>거래처 ID</label>
                    <input
                        type='text'
                        id='clientId'
                        name='clientId'
                        readOnly
                    />
                    <label htmlfor='clientName'>거래처 이름</label>
                    <input
                        type='text'
                        id='clientName'
                        name='clientName'
                        readOnly
                    />
                    <label htmlfor='contactNumber'>연락처</label>
                    <input
                        type='text'
                        id='clientNumber'
                        name='clientNumber'
                        readOnly
                    />
                    <label htmlfor='address'>주소</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        readOnly
                    />
                    <label htmlfor='email'>이메일</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        readOnly
                    />
                    <label htmlfor='registrationDate'>등록일</label>
                    <input
                        type='date'
                        id='registrationDate'
                        name='registrationDate'
                        readOnly
                    />
                    <label htmlfor='discountRate'>할인율</label>
                    <input
                        type='number'
                        id='discountRate'
                        name='discountRate'
                        readOnly
                    />
                </form>
                <div className='btnZone'>
                    <button type='button'>취소</button>
                    <button type='button'>수정</button>
                    <button type='button'>삭제</button>
                </div>
            </div>
        </>
    )
}
export default CustomerView