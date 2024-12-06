import React from 'react'
import {  Card} from '@tremor/react';
import {  Meta} from "./Meta.jsx";
export const App = () => {
  return (
    <div>
          <Card>
             <img
          src="https://portal.muniplibre.gob.pe/wp-content/uploads/2019/03/logo-mdpl-1.png"
          alt="Logo Municipalidad"
          className="mx-auto mb-4 w-90" // Agrega clases de estilo
        />
        <Meta/>
      </Card>
    </div>
  )
}
