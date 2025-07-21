import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import './styles/Title.css';

function Page({ name, useNav }) {
    return (
        <Button className="nav-button" onClick={() => useNav(`/${name.toLowerCase()}`)} text={name} />
    );
}

export default function Title() {
    const navigate = useNavigate();

    return (
        <header className="navbar">
            <div className="navbar-title" onClick={() => navigate("/")}>
                Aryan's Portfolio
            </div>

            <nav className="page-navigation">
                {/* <Page name="Contact" useNav={navigate} />  TODO: fix the email sending*/}
                <Page name="Resume" useNav={navigate} />
                <Page name="Projects" useNav={navigate} />
            </nav>
        </header>
    );
}
