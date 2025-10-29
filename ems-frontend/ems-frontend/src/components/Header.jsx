import React from 'react'
import spring_logo from '../assets/spring_logo.jpg'

const Header = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand d-flex" href="#">
                            <img src={spring_logo} alt='logo' />
                            <p className="navbar-brand" href="#">Employee Management System</p>
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header