import React from 'react';
import picture from '../assets/Image-075.JPEG';
import './styles/Home.css';

export default function Home() {
    return (
        <div className="home-main-container">
            <div className="home-card">
                <h1 className="home-title">Welcome!</h1>
                <p className="home-subtitle">Discover who I am and what I do</p>

                <div className="home-about-container">
                    <div className="home-about-description">
                        <p>
                            I’m a front-end engineer with a strong focus on building clean, scalable, and data-driven web applications. Most recently, I worked at Veeva Systems, where I led development on key features for clinical trial analytics—designing responsive UIs with React, TypeScript, and REST APIs that handled millions of data points. I also helped migrate older systems from Backbone.js to React to modernize the front-end architecture and improve long-term maintainability. Beyond coding, I care a lot about performance and user experience—I’ve optimized component rendering for faster load times and worked on real-time, collaborative interfaces for large-scale data uploads. I’m comfortable working in Agile teams, collaborating across product and design, and contributing to CI/CD pipelines and testing strategies. Now, I’m looking for new opportunities where I can keep building intuitive, high-performance user interfaces that make complex data feel simple.
                        </p>
                    </div>

                    <div className="home-about-picture-container">
                        <img src={picture} alt="Profile" />
                    </div>
                </div>
            </div>
        </div>
    );
}
