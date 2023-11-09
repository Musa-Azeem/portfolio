import React from 'react'

const About = React.forwardRef((props, ref) => {
  return (
    <div className="aboutPage" ref={ ref }>
      <div className="header">
        <h1>About</h1>
      </div>
      <p>
        I am a junior at the University of South Carolina studying computer engineering. I have a strong interest in technology and how it can be used to solve real-world problems, especially in fields of medicine. As an undergraduate research assistant in the Valafar Group, I am working with a team on Android Wear OS development and the applications of machine learning in human activity recognition. After graduation, I plan to complete an accelerated master’s degree in computer science before transitioning to the data science or application development industry.
      </p>
    </div>
  )
})

export default About