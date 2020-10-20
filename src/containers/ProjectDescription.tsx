import * as React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import { projectData } from '../utils';

const ProjectDescription = styled.article`
  position: relative;
  max-width: 60em;
  header {
    h1 {
      color: ${(props) =>
        props.theme.primaryColor === '#FEFEFE'
          ? 'black'
          : props.theme.primaryColor};
      line-height: 1.1em;
      font-weight: 900;
      text-align: start;
      margin-left: -0.1em;
    }

    h4 {
      font-weight: 500;
      margin-top: 0.5em;
    }

    .tools {
      width: 100%;
      display: flex;
      gap: 1em;
      margin-top: 1em;
    }
  }

  p {
    line-height: 1.8em;
    margin: 1em 0;
    padding-bottom: 1em;
    font-size: 1.2em;
    text-align: justify;
    letter-spacing: -0.04em;
  }
`;

const ProjectImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 25vh;
  transition: ease all .5s;

  @media (min-width: 768px) {
    height: 35vh;
  }

  @media (min-width: 1200px) {
    height: 55vh;
  }
`;

const ProjectImageStyles = styled.div`
  background-image: url(${props => props.image});
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
`;

const ToolTag = styled.span`
  background: ${(props) => props.theme.selectColor};
  padding: 0.3em 1em;
  color: ${(props) => props.theme.textColor};
  font-weight: 900;
`;

interface ProjectDescriptionProps extends RouteComponentProps {
  projectId?: string;
}

export default (props: ProjectDescriptionProps) => {
  const data = projectData.filter((d) => d.path === props.projectId);
  const { title, subtitle, url, description, images, tags } = data[0];
  return (
    <React.Fragment>
      <ProjectDescription>
        <header>
          <h1>{title}</h1>
          <i><h4>{subtitle}</h4></i>
          <div className='tools'>
            {tags.map((tag, idx) => <ToolTag key={idx}>{tag}</ToolTag>)}
          </div>
        </header>

        {description.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}

        {url !== '' && (
          <a href={url}>
            <button>Visit</button>
          </a>
        )}
      </ProjectDescription>
      <ProjectImageContainer>
        {images.length ? images.map((image, idx) => <ProjectImageStyles key={idx} image={image} />) : null}
        {/* map around images... */}
      </ProjectImageContainer>
    </React.Fragment>
  );
};