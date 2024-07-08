import '../css/customerView.css';
import React from 'react'
import {useEffect, useState} from 'react'

function CustomerRegister(){

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
                    <label htmlfor='clientCode'>거래처 코드</label>
                    <input
                        type='text'
                        id='clientCode'
                        name='clientCode'
                        placeholder='거래처 코드'
                        required
                    />
                    <label htmlfor='clientCodeType'>거래처 코드 구분</label>
                    <input
                        type='text'
                        id='clientCodeType'
                        name='clientCodeType'
                        required
                    />
                    <label htmlfor='representativeName'>대표자명</label>
                    <input
                        type='text'
                        id='representtativeName'
                        name='representtativeName'
                        required
                    />
                    <label htmlfor='clientContact'>거래처 담당자</label>
                    <input
                        type='text'
                        id='clientContact'
                        name='clientContact'
                        required
                    />
                    <label htmlfor='clientId'>거래처 ID</label>
                    <input
                        type='text'
                        id='clientId'
                        name='clientId'
                        required
                    />
                    <label htmlfor='clientName'>거래처 이름</label>
                    <input
                        type='text'
                        id='clientName'
                        name='clientName'
                        required
                    />
                    <label htmlfor='contactNumber'>연락처</label>
                    <input
                        type='text'
                        id='clientNumber'
                        name='clientNumber'
                        required
                    />
                    <label htmlfor='address'>주소</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        required
                    />
                    <label htmlfor='email'>이메일</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        readOnly
                        required
                    />
                    <label htmlfor='registrationDate'>등록일</label>
                    <input
                        type='date'
                        id='registrationDate'
                        name='registrationDate'
                        required
                    />
                    <label htmlfor='discountRate'>할인율</label>
                    <input
                        type='number'
                        id='discountRate'
                        name='discountRate'
                        required
                    />
                </form>
                <div className='btnZone'>
                    <button type='button'>취소</button>
                    <button type='button'>등록</button>
                </div>
            </div>
        </>
    )
}
export default CustomerRegister