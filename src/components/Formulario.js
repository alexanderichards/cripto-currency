import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled';
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Axios from 'axios';
import Error from './Error';


const Formulario = ({setCripto, setMoneda}) => {

    const [listacripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicanos'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ];
    // Utilizar moneda 
    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS)


    const [criptomoneda, SelectCriptomoneda] = useCriptomoneda('Elige tu criptomoneda', '', listacripto)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await Axios.get(url);

            setListaCripto(resultado.data.Data);
        }

        consultarAPI();

    }, []);

    const cotizarMoneda = e => { 
        e.preventDefault();

        if(moneda === '' ||  criptomoneda === ''){
            setError(true);
            return;
        }

        setError(false);

        setMoneda(moneda);
        setCripto(criptomoneda);
    }

    return (
        <form onSubmit={cotizarMoneda}>
            { error ? <Error mensaje='Todos los campos son obligatorios'></Error> : null}
            <SelectMonedas></SelectMonedas>
            <SelectCriptomoneda></SelectCriptomoneda>
            <Boton type='submit' value='Calcular'/>
        </form>
    )
}

const Boton = styled.input`
    font-weight: bold;
    margin-top: 20px;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: white;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`

export default Formulario
