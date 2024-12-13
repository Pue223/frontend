import React from 'react'
import {  Card} from '@tremor/react';
import {  Meta} from "./Meta.jsx";
import {  Ingresos} from "./Ingresos.jsx";
export const App = () => {
  return (
    <> 
     <img
            src="https://portal.muniplibre.gob.pe/wp-content/uploads/2019/03/logo-mdpl-1.png"
            alt="Logo Municipalidad"
            className="mx-auto mb-4 w-90"
          />
    <div className="flex items-start">
      <Card className="w-full flex items-start">
        <div className="w-1/3"> {/* Contenedor de Ingresos */}       
          <Ingresos />
        </div>
        <div className="ml-1 flex flex-col justify-between w-2/3"> {/* Contenedor de Meta con menos margen */}
          
          <Meta />
        </div>
      </Card>
    </div>
    </>
  );
  
  
  
}
