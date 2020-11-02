import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Navbar() {
    
    return (
        <header>
            <div className="container-fluid position-relative no-side-padding">
                <span className="logo">
                
                </span>
                <div className="menu-nav-icon" data-nav-menu="#main-menu">
                    <i className="ion-navicon" />
                </div>
                <ul className="main-menu visible-on-click" id="main-menu">
                    <li><Link className={"nav-link disabled"} to={"/"}> Node.js/NestJS + React DXF file inspector </Link></li>
                    <li><Link className={"nav-link"} to={"/"}> My uploads </Link></li>
                    <li><Link className={"nav-link"} to={"/create"}> Upload </Link></li>
                </ul>
            </div>
        </header>
    );
    
}
export default withRouter(Navbar);