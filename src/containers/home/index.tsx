import React from "react"
import { Container } from 'reactstrap';

import Task from "../task/index"

const Home = () => {
    return (
        <Container className="home-container">
            <Task />
        </Container >
    )
}

export default Home