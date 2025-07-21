import React from "react";
import ProjectTitle from "../components/ProjectTile";
import "./styles/Projects.css";

export default function Projects() {
    return (
        <div className="projects-page">
            <div className="projects-grid">
                <ProjectTitle
                    projectTitle='Employee Contact React-CRUD'
                    imageSrc='/CRUD-Preview.png'
                    githubLink='https://github.com/aryanmaheshwari/react-crud'
                    description='I built an application in React (using Bootstrap) to create Employee contact log.'
                />
                <ProjectTitle
                    projectTitle='AI Chatbot'
                    imageSrc='/AI-Chatbot.png'
                    description='I built an AI chatbot similar to chatgpt that gets responses from LLMs based on user prompts.'
                    githubLink='https://github.com/yourusername/project-two'
                />
                <ProjectTitle
                    projectTitle='More projects are being added!'
                    imageSrc='/react.svg'
                    description='I am adding more projects to this portfolio, please see my main github account.'
                    githubLink='https://github.com/aryanmaheshwari'
                />
                {/* <ProjectTitle
                    projectTitle='Project Four'
                    imageSrc='src/assets/react.svg'
                    githubLink='https://github.com/yourusername/project-four'
                /> */}
            </div>
        </div>
    );
}
