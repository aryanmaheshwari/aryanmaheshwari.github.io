import React from "react";
import { useNavigate } from 'react-router-dom';
import './styles/Resume.css';

const source = '/Resume_Aryan_Maheshwari_FE.pdf';

export default function Resume() {
    // const navigate = useNavigate();

    return (
        <div className="resume-container">
            <h2 className="resume-title">Resume</h2>

            {/* 
            TODO: This link is not public yet
            <button 
                onClick={() => navigate("/contact")}
                className="contact-button"
            >
                Contact Me!
            </button> */}

            <div className="resume-pdf-container">
                <embed
                    src={source}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
}
