import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    BarChart,
    TableHead,
    TableHeaderCell,
    TableRow,
    Card,
    Badge
} from '@tremor/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import confetti from 'canvas-confetti'; 
import axios from "axios";
import { RiArrowUpDoubleFill } from "@remixicon/react";
const dataFormatter = (number) =>
    new Intl.NumberFormat("us").format(number).toString();

export const Meta = () => {
    const [data, setData] = useState([]);
    const [dataId1, setDataId1] = useState([]);
    const [dataId2, setDataId2] = useState([]);
    const [showImage, setShowImage] = useState(false);

    const handleTabClick = () => {
        setShowImage(true); // Muestra la imagen
        // Después de 3 segundos (3000ms), ocultamos la imagen
        setTimeout(() => {
            setShowImage(false); // Oculta la imagen después del tiempo definido
        }, 3000);
    };
    useEffect(() => {
        axios
            .get('https://backendtw.onrender.com/api/totalmeta')
            .then((response) => {
                if (response.data.ok) {
                    const fetchedData = response.data.meta;
                    setData(fetchedData); // Set the data in state

                    // Filtrar los datos según el id y transformarlos
                    const dataId1 = fetchedData.filter(item => item.id === 1);
                    const dataId2 = fetchedData.filter(item => item.id === 2);
                    // Transformar los datos para cambiar las claves a nombres amigables
                    const transformedData1 = dataId1.map((item) => ({
                        id: item.id,
                        "Ingresos Corrientes": item.totalImporte,
                        "Umbral mínimo": item.um,
                        "Avance": item.avance,
                        "Diferencia": item.dif,
                    }));

                    const transformedData2 = dataId2.map((item) => ({
                        id: item.id,
                        "Ingresos Corrientes": item.totalImporte,
                        "Umbral máximo": item.um,
                        "Avance": item.avance,
                        "Diferencia": item.dif,
                    }));

                    setDataId1(transformedData1);
                    setDataId2(transformedData2);
                }
            })
            .catch((error) => {
                console.error("There was an error fetching the data:", error);
            });
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };
    const handleConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
    };

    return (
        <>

            <Tabs defaultValue="tab1">
                <TabsList className="space-y-6 flex flex-col">
                    {/* Tab para el id 1 */}
                    <TabsTrigger
                        value="tab1"
                        onClick={() => {
                            if (dataId1.length > 0) {
                                handleConfetti(); // Llama a la función de confetti
                            }
                        }}
                    >
                        {dataId1.length > 0 && (
                            <Card className="mx-auto max-w-4xl mb-6">
                                <p>Cuadro 1:</p>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderCell>INGRESOS CORRIENTES</TableHeaderCell>
                                            <TableHeaderCell>UMBRAL MINIMO</TableHeaderCell>
                                            <TableHeaderCell>AVANCE</TableHeaderCell>
                                            <TableHeaderCell>DIFERENCIA</TableHeaderCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataId1.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="text-center">
                                                    {formatCurrency(item["Ingresos Corrientes"])}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {formatCurrency(item["Umbral mínimo"])}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {item["Avance"].toFixed(2)}%
                                                </TableCell>
                                                <TableCell className="text-center flex items-center justify-center gap-1">
                                                    <RiArrowUpDoubleFill color="green" />
                                                    {formatCurrency(item["Diferencia"])}
                                                </TableCell>
                                                {/* Badge condicional */}
                                                <TableCell className="text-center">
                                                    {item["Avance"].toFixed(2) > "100.00" ? (
                                                        <Badge className="bg-emerald-50 text-emerald-900 ring-emerald-600/30">
                                                            META CUMPLIDA
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-red-50 text-red-900 ring-red-600/20">
                                                            EN PROGRESO...
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        )}
                    </TabsTrigger>

                    {/* Tab para el id 2 */}
                    <TabsTrigger value="tab2" onClick={handleTabClick}>
                        {dataId2.length > 0 && (
                            <Card className="mx-auto max-w-4xl mb-6">
                                <p>
                                    Cuadro 2:
                                </p>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderCell>INGRESOS CORRIENTES</TableHeaderCell>
                                            <TableHeaderCell>UMBRAL MÁXIMO</TableHeaderCell>
                                            <TableHeaderCell>AVANCE</TableHeaderCell>
                                            <TableHeaderCell>DIFERENCIA</TableHeaderCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataId2.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="text-center">{formatCurrency(item["Ingresos Corrientes"])}</TableCell>
                                                <TableCell className="text-center">{formatCurrency(item["Umbral máximo"])}</TableCell>
                                                <TableCell className="text-center">{item["Avance"].toFixed(2)}%</TableCell>
                                                <TableCell className="text-center">{formatCurrency(item["Diferencia"])}</TableCell>
                                                   <TableCell className="text-center">
                                                    {item["Avance"].toFixed(2) === "101.99" ? (
                                                        <Badge className="bg-emerald-50 text-emerald-900 ring-emerald-600/30">
                                                            META CUMPLIDA
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-red-50 text-red-900 ring-red-600/20">
                                                            EN PROGRESO...
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        )}
                    </TabsTrigger>
                </TabsList>

                <div className="ml-2 mt-4">
                    {/* Content for tab1 */}
                    <TabsContent value="tab1">
                        <div className="mx-auto max-w-4xl">
                            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                UMBRAL MINIMO
                            </p>
                            <BarChart
                                data={dataId1}
                                index="id"
                                categories={["Umbral mínimo", "Ingresos Corrientes"]} // Nombres amigables en las categorías
                                valueFormatter={dataFormatter}
                                yAxisWidth={88}
                                colors={["blue", "amber"]}
                                className="h-2xl" // Controla la altura del gráfico
                            />
                        </div>
                    </TabsContent>

                    {/* Content for tab2 */}
                    <TabsContent value="tab2">
                        <div className="mx-auto max-w-4xl">
                            {/* Mostrar el emoji animado */}
                            {showImage && (
                                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                 <img
                                     src="/preocupado.gif" // Ruta en "public"
                                     alt="Preocupado"
                                     className="w-52 h-52 object-contain rounded-full" // Uso de object-contain y border-radius
                                 />
                             </div>
                            )}

                            {/* Gráfico de BarChart */}
                            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                UMBRAL MAXIMO
                            </p>
                            <BarChart
                                data={dataId2}
                                index="id"
                                categories={["Umbral máximo", "Ingresos Corrientes"]}
                                valueFormatter={dataFormatter}
                                yAxisWidth={88}
                                colors={["blue", "amber"]} // Cambia los colores aquí
                                className="h-2xl"
                            />
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </>
    );
};
