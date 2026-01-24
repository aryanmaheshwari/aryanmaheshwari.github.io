import React from "react";
import ProjectTile from "../components/ProjectTile";
import "./styles/Projects.css";

const projects = [
    {
        title: 'Employee Contact CRUD',
        image: '/CRUD-Preview.png',
        github: 'https://github.com/aryanmaheshwari/react-crud',
        description: 'A full-featured React application for managing employee contacts with create, read, update, and delete functionality.',
        technologies: ['React', 'Bootstrap', 'REST API']
    },
    {
        title: 'AI Chatbot',
        image: '/AI-Chatbot.png',
        github: 'https://github.com/aryanmaheshwari/ai-chatbot',
        description: 'An intelligent chatbot interface that connects to LLM APIs to generate contextual responses based on user prompts.',
        technologies: ['React', 'LLM API', 'Node.js']
    },
    {
        title: 'Weather App',
        image: '/TypescriptWeatherApp.png',
        github: 'https://github.com/aryanmaheshwari/weatherapp/',
        description: 'A type-safe weather application built with TypeScript that fetches real-time weather data for any city.',
        technologies: ['TypeScript', 'React', 'Weather API']
    },
    {
        title: 'Comment Section',
        image: '/CommentSection.png',
        github: 'https://github.com/aryanmaheshwari/comment-section',
        description: 'A Reddit-style nested comment system with upvoting, replying, and threaded discussions.',
        technologies: ['React', 'CSS', 'State Management']
    }
];

export default function Projects() {
    return (
        <div className="projects-page">
            <div className="projects-container">
                <div className="projects-header">
                    <h1 className="projects-title">Featured Projects</h1>
                    <p className="projects-subtitle">
                        A selection of projects showcasing my front-end development skills
                    </p>
                </div>

                {/* Featured Project - Mylavna */}
                <a
                    href="http://mylavna.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-highlight"
                >
                    <div className="featured-highlight-badge">Featured</div>
                    <div className="featured-highlight-content">
                        <h2 className="featured-highlight-title">Mylavna</h2>
                        <p className="featured-highlight-description">
                            My favorite personal project - a full-stack web application built with modern
                            development practices and attention to detail.
                        </p>
                        <span className="featured-highlight-link">
                            Visit mylavna.com
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </span>
                    </div>
                </a>

                <h2 className="projects-section-title">Other Projects</h2>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectTile
                            key={index}
                            projectTitle={project.title}
                            imageSrc={project.image}
                            githubLink={project.github}
                            description={project.description}
                            technologies={project.technologies}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
