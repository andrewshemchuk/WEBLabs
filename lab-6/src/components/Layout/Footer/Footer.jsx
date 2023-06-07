import React from 'react';
import Navbar from "../Navigation/Navbar.jsx";

import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__body">
                <div className="footer__info">
                    <div className="footer__text">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus aperiam, laboriosam eligendi, voluptatibus voluptates veritatis, consequuntur quos eum excepturi esse aliquid tempore possimus recusandae inventore? Quidem, aut nesciunt corrupti necessitatibus unde excepturi reprehenderit corporis dolorum minima labore minus libero itaque aspernatur, ex, repellendus pariatur facilis possimus et. Magni, maiores sapiente.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam corporis nostrum minus aspernatur, dolores nesciunt.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus magni sed officia repellendus nihil. Omnis.</p>
                    </div>
                </div>
               <Navbar/>
            </div>
        </footer>
    );
};

export default Footer;
