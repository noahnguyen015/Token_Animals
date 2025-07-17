import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './banner.css'

function Banner(){

    return (
    <>
        <div className="row mt-5">
            <div className="col-2"></div>
            <div className="col-8">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-1">&lt;</div>
                    <div className="col-10 d-flex align-items-center justify-content-center banner">TESTING</div>
                    <div className="col-1">&gt;</div>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    </>
    )
}

export default Banner