import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList
} from '@tremor/react';
import { RiCalendar2Fill, RiArrowUpSFill, RiArrowDownSFill } from "@remixicon/react";
import axios from 'axios';

export const Ingresos = () => {
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    // Realiza la solicitud al endpoint para obtener los ingresos
    axios
      .get('https://backendtw.onrender.com/api/ingresos')
      .then((response) => {
        if (response.data.ok) {
          setIngresos(response.data.data);  // Guarda los ingresos en el estado
        }
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });
  }, []);

  return (
    <>
      <Accordion className="mt-3">
        <AccordionList>
          {/* Un solo AccordionHeader */}
          <div>
            <AccordionHeader>
              <span className="flex items-center gap-2">
                <RiCalendar2Fill className="size-4 text-blue-500" />
                Ingresos
              </span>
            </AccordionHeader>
            <AccordionBody>
              <ol className="flex flex-col gap-2">
                {ingresos.map((item, index) => {
                  let icon = null;

                  // Compara el ingreso actual con el anterior
                  if (index > 0) {
                    const prevIngreso = ingresos[index - 1].ingreso;
                    if (item.ingreso > prevIngreso) {
                      icon = <RiArrowUpSFill className="text-green-500" />;
                    } else if (item.ingreso < prevIngreso) {
                      icon = <RiArrowDownSFill className="text-red-500" />;
                    }
                  }

                  return (
                    <li key={index} className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-50">
                        Fecha: {item.fecha} - Ingreso:
                      </span>{' '}
                      {item.ingreso} {icon}
                    </li>
                  );
                })}
              </ol>
            </AccordionBody>
          </div>
        </AccordionList>
      </Accordion>
    </>
  );
};
