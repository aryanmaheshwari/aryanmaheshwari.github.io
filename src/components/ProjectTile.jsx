import React from "react";
import './styles/ProjectTile.css';

export default function ProjectTile({ projectTitle, imageSrc, githubLink, description, technologies = [] }) {
    return (
        <div className="project-card">
            <div className="project-image-wrapper">
                <img
                    src={imageSrc}
                    alt={projectTitle}
                    className="project-image"
                />
            </div>
            <div className="project-content">
                <h3 className="project-title">{projectTitle}</h3>
                <p className="project-description">{description}</p>
                {technologies.length > 0 && (
                    <div className="project-tech-tags">
                        {technologies.map((tech, index) => (
                            <span key={index} className="tech-tag">{tech}</span>
                        ))}
                    </div>
                )}
                <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                >
                    View on GitHub
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                </a>
            </div>
        </div>
    );
}
