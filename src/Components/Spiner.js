import React from 'react'
import logo from './loading.gif';


export default function Spiner() {
    return (
        <div className='text-center' style={{ height: '80vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} alt="Loading..." />
        </div>
    )
}
