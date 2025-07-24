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
                    githubLink='https://github.com/aryanmaheshwari/ai-chatbot'
                />
                <ProjectTitle
                    projectTitle='Typescript Weather App'
                    imageSrc='/TypescriptWeatherApp.png'
                    description='I used Typescript with React to build a simple weather app that retrieves the current temperature of a city.'
                    githubLink='https://github.com/aryanmaheshwari/weatherapp/'
                />
                <ProjectTitle
                    projectTitle='Comment Section'
                    imageSrc='/CommentSection.png'
                    description='A project that simulates adding comments like we do in Reddit. There is more work to be done, but this is my initial take on it.'
                    githubLink='https://github.com/aryanmaheshwari/comment-section'
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
