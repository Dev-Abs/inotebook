import React from "react";
import { Link} from "react-router-dom";
import "./styles.css";

const About = () => {
  return (
    <div>
      <div class="container mt-5">
        <div class="jumbotron">
          <h1 class="display-4">Elevate Your Note-Taking Experience</h1>
          <p class="lead">
            Introducing our state-of-the-art iNotebook app-meticulously crafted
            to optimize your note-taking process and revolutionize your
            organization and productivity.
          </p>
          <hr class="my-4" />
          <p>
            With an array of advanced features at your disposal, effortlessly
            capture your thoughts, ideas, and tasks with unparalleled ease.
            Seamlessly sync your notes across all devices, ensuring your
            information is always within reach, regardless of your location.
          </p>
          <p>
            Simplify your life by creating, editing, and decluttering notes in
            an intuitive interface designed for exceptional usability.
          </p>
          <p>
            Experience the convenience of cloud-based storage, where data
            security is paramount. Allow us to manage the technology while you
            focus on what truly matters.
          </p>
          <p class="lead">
            <Link class="btn btn-primary btn-lg" to="/signup" role="button">
              Start Your Transformation
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
