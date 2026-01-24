import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';

const skills = [
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Python',
    'PyTorch',
    'OpenAI APIs',
    'RAG',
    'REST APIs',
    'Accessibility (WCAG)',
    'i18n/l10n',
    'Performance Optimization'
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-main-container">
            <div className="home-hero">
                <div className="home-intro">
                    <div className="home-text-content">
                        <p className="home-greeting">Hello, I'm</p>
                        <h1 className="home-title">Aryan Maheshwari</h1>
                        <p className="home-role">Senior Frontend & Applied AI Engineer</p>
                        <p className="home-description">
                            I build scalable, accessible, and AI-powered web applications. Currently at Spare CS,
                            where I architect production-grade front-end platforms and integrate AI tools that drive
                            measurable business growth. Passionate about performance, accessibility, and leveraging
                            AI to create exceptional user experiences.
                        </p>
                        <div className="home-cta-buttons">
                            <button
                                className="home-cta-primary"
                                onClick={() => navigate('/projects')}
                            >
                                View My Work
                            </button>
                            <button
                                className="home-cta-secondary"
                                onClick={() => navigate('/contact')}
                            >
                                Get in Touch
                            </button>
                        </div>
                    </div>
                    <div className="home-image-container">
                        <img src='/Image-075.JPEG' alt="Aryan Maheshwari" />
                    </div>
                </div>

                <div className="home-featured-project">
                    <h2 className="home-skills-title">Featured Project</h2>
                    <a
                        href="http://mylavna.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="featured-project-card"
                    >
                        <div className="featured-project-content">
                            <div className="featured-project-badge">Live Project</div>
                            <h3 className="featured-project-title">Mylavna</h3>
                            <p className="featured-project-description">
                                A full-stack web application showcasing modern development practices.
                                Built with passion and attention to detail.
                            </p>
                            <span className="featured-project-link">
                                Visit mylavna.com
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                                </svg>
                            </span>
                        </div>
                    </a>
                </div>

                <div className="home-skills-section">
                    <h2 className="home-skills-title">Technologies I Work With</h2>
                    <div className="home-skills-grid">
                        {skills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="home-experience-section">
                    <h2 className="home-skills-title">Experience</h2>

                    <div className="home-experience current">
                        <div className="experience-header">
                            <div className="experience-title-row">
                                <span className="experience-company">Spare CS INC</span>
                                <span className="experience-badge">Current</span>
                            </div>
                            <span className="experience-role">Senior Frontend & Applied AI Engineer</span>
                            <span className="experience-date">Aug 2025 - Present</span>
                        </div>
                        <ul className="experience-highlights">
                            <li>Architected a production-grade front-end platform as founding Frontend Engineer, building a shared React component library with accessibility-first design (WCAG 2.1 AA) and i18n/l10n framework for global users.</li>
                            <li>Reduced user friction by 75% through UX optimization and AI-assisted development workflows leveraging ChatGPT and Claude.</li>
                            <li>Designed and deployed a 24/7 multilingual RAG chatbot using OpenAI APIs for localized, context-aware customer support.</li>
                            <li>Productionized a PyTorch-based ML model delivering predictive insights that improved client retention and drove measurable growth.</li>
                        </ul>
                    </div>

                    <div className="home-experience">
                        <div className="experience-header">
                            <span className="experience-company">Veeva Systems</span>
                            <span className="experience-role">Fullstack (Frontend leaning) Engineer</span>
                        </div>
                        <p className="experience-description">
                            Led development on key features for clinical trial analytics, designing responsive
                            UIs with React and TypeScript that handled millions of data points. Migrated legacy
                            Backbone.js systems to React, optimized component rendering for faster load times,
                            and built real-time collaborative interfaces for large-scale data operations.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
