import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import image from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

function App() {

  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  // Utilizaremos useEffect a ejecutarse cuando los valos de moneda y cripto se han añadidos para hacer the api call

  useEffect(() => {

    if (moneda === '') return;

    const consultarAPI = async () => {
      setLoading(true);
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const resultado = await Axios.get(url);

      setLoading(false);
      setResult(resultado.data.DISPLAY[cripto][moneda]);

    }

    consultarAPI();

  }, [moneda, cripto]);


  const componente = loading ? <Spinner></Spinner> : <Cotizacion resultado={result}></Cotizacion>;

  return (
    <Contenedor>
      <div>
        <Imagen src={image} alt='imagenCrypto'></Imagen>
      </div>
      <div>
        <Heading>
          Cotiza criptomonedas al instante
        </Heading>
        <Formulario setCripto={setCripto} setMoneda={setMoneda}></Formulario>   
        {componente}     
      </div>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;

  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: white;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`

export default App;
