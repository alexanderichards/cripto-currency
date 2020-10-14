import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled';

const useCriptomoneda = (label, stateInicial, opciones) => {

    //State de nuestro custom hooh
    const [state, actualizarState] = useState(stateInicial);

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select onChange={e => actualizarState(e.target.value)} value={state}>
                <option value='' disabled>--Seleccione</option>
                {opciones.map(opcion => {
                    return (
                        <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                    )
                })}
            </Select>
        </Fragment>
    );

    //  Retornar state, interfaz y fn que modifica el state
    return [state, SelectCripto, actualizarState]
}

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4 rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`


export default useCriptomoneda;
