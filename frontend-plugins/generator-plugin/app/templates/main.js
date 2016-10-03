import React from 'react'
import { exportPlugin } from './common/RegardsPlugin'

// Ajout des styles spécifiques au plugin
require('./css/plugin.css')

// Définition du composant React renvoyé par le plugin
class HelloWorldPlugin extends React.Component {

  // Rendu graphique du plugin
  render(){
    return (
      <div className="plugin-bg">
        <h1 className="hello-style">HelloWorld Plugin from frontend-plugins</h1>
      </div>
    )
  }
}

// Indique au système que le plugin est disponible
exportPlugin("HelloWorldPlugin",HelloWorldPlugin)
