import React from 'react'
import Footer from '../components/Layout/Footer'
import CondimentoCarrusel from '../components/Domain/CondimentoCarrusel'
import RecetaCarrusel from '../components/Domain/RecetaCarrusel'
import ComentariosVer from '../components/Domain/ComentariosVer'
import Imagen from '../components/Layout/Imagen'

function Home() {
  return (
    <div>
      <Imagen />
      <br /><br /><br />
      <CondimentoCarrusel/>
      <br /><br /><br />
      <RecetaCarrusel/>
      <br /><br /><br />
      <ComentariosVer/>
      <br />
    </div>
  )
}

export default Home