import React from 'react'
import styled from "@emotion/styled";

const Error = ({mensaje}) => {
    return (
        <MensajeError>{mensaje}</MensajeError>
    )
}

const MensajeError = styled.p`
    background-color: #b7322c;
    padding: 1rem;
    color: white;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
`

export default Error
