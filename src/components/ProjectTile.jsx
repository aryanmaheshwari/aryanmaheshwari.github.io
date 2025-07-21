import React from "react";
import Button from "./Button";
import './styles/ProjectTile.css';

export default function ProjectTile({ projectTitle, imageSrc, githubLink, description }) {

    function redirectToWebsite() {
        window.location.href = githubLink;
    }

    return (
        <div className="project-card">
            <p>{projectTitle}</p>
            <img
                src={imageSrc}
                alt="Project Preview"
                className="project-image"
            />
            <div className="project-content">
                <p className="project-description">{description}</p>
                <Button className="github-button" text="View Code on GitHub" onClick={() => redirectToWebsite()}></Button>
            </div>
        </div>
    );
}
