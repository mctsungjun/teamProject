import '../css/customerView.css';
import React from 'react'
import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function CustomerView(){
    const { businessNumber } = useParams();
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/customerView?businessNumber=${businessNumber}`)
            .then(resp => {
                setCustomer(resp.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setError(err);
                setLoading(false);
            })
    },[businessNumber])

    const handleCancelMClick = () => {
        navigate(-1);
    }

    const handleModifyClick = () =>{
        navigate(`/customerModify/${businessNumber}`);
    }
    const handelDeleteClick = () => {
        axios.delete('/customerDelete', {data : {businessNumber}})
        .then(resp=>{
            if(resp.data ==""){
                console.log("success");
                navigate('/bjmCustomerList');
            }else{
                alert("failed");
            }
        })
    }

    if (!customer) {
        return <div>데이터 가져오는 중</div>;
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
                        defaultValue={customer.businessNumber}
                        readOnly
                    />
                    
                    <label htmlFor='clientCode'>거래처 코드</label>
                    <input
                        type='text'
                        id='clientCode'
                        name='clientCode'
                        value={customer.clientCode}
                        readOnly
                    />
                    <label htmlFor='clientCodeType'>거래처 코드 구분</label>
                    <input
                        type='text'
                        id='clientCodeType'
                        name='clientCodeType'
                        value={customer.clientCodeType}
                        readOnly
                    />
                    <label htmlFor='representativeName'>대표자명</label>
                    <input
                        type='text'
                        id='representativeName'
                        name='representativeName'
                        value={customer.representativeName}
                        readOnly
                    />
                    <label htmlFor='clientContact'>거래처 담당자</label>
                    <input
                        type='text'
                        id='clientContact'
                        name='clientContact'
                        value={customer.clientContact}
                        readOnly
                    />
                    <label htmlFor='clientId'>거래처 ID</label>
                    <input
                        type='text'
                        id='clientId'
                        name='clientId'
                        value={customer.clientId}
                        readOnly
                    />
                    <label htmlFor='clientName'>거래처 이름</label>
                    <input
                        type='text'
                        id='clientName'
                        name='clientName'
                        value={customer.clientName}
                        readOnly
                    />
                    <label htmlFor='contactNumber'>연락처</label>
                    <input
                        type='text'
                        id='contactNumber'
                        name='contactNumber'
                        value={customer.contactNumber}
                        readOnly
                    />
                    <label htmlFor='address'>주소</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        value={customer.address}
                        readOnly
                    />
                    <label htmlFor='email'>이메일</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={customer.email}
                        readOnly
                    />
                    <label htmlFor='registrationDate'>등록일</label>
                    <input
                        type='date'
                        id='registrationDate'
                        name='registrationDate'
                        value={customer.registrationDate}
                        readOnly
                    />
                    <label htmlFor='discountRate'>할인율</label>
                    <input
                        type='number'
                        id='discountRate'
                        name='discountRate'
                        value={customer.discountRate}
                        readOnly
                    />
                </form>
                <div className='btnZone'>
                    <button type='button' onClick={handleCancelMClick}>취소</button>
                    <button type='button' onClick={handleModifyClick}>수정</button>
                    <button type='button' onClick={handelDeleteClick}>삭제</button>
                </div>
            </div>
        </>
    )
}
export default CustomerView