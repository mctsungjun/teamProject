import React from "react";
import {useState, useEffect} from "react"

function Sidebar(){
    return(
        <>
            <div className="menu">
                <nav>
                    <button type="button">신규 거래처 등록</button>
                    <button type="button" className="btnImport">import</button>
                    <button type="button" className="btnExport">export</button>
                </nav>
            </div>
        </>
    )
}

export default Sidebar