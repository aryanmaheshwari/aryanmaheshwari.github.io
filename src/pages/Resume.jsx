import React from "react";
import { useNavigate } from 'react-router-dom';
import './styles/Resume.css';
import Button from "../components/Button";

const source = '/Resume_Aryan_Maheshwari_FE.pdf';

export default function Resume() {
    const navigate = useNavigate();

    return (
        <div className="resume-container">
            <h2 className="resume-title">Resume</h2>
            <div className="contact-button-container">
            <Button 
                className="contact-button"
                text="Contact Me!"
                onClick={() => navigate("/contact")}
            >
            </Button>
            </div>
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
