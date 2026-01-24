import React from "react";
import { useNavigate } from 'react-router-dom';
import './styles/Resume.css';

const source = '/Resume_Aryan_Maheshwari_FE_AIML.pdf';

export default function Resume() {
    const navigate = useNavigate();

    return (
        <div className="resume-page">
            <div className="resume-container">
                <div className="resume-header">
                    <h1 className="resume-title">Resume</h1>
                    <div className="resume-actions">
                        <a
                            href={source}
                            download
                            className="resume-button secondary"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                            </svg>
                            Download PDF
                        </a>
                        <button
                            className="resume-button primary"
                            onClick={() => navigate("/contact")}
                        >
                            Contact Me
                        </button>
                    </div>
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
        </div>
    );
}
