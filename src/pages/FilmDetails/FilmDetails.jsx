import { useEffect, useState } from "react";
import { getMoviesBy } from '../../services/films';
import { Carousel } from 'flowbite-react';
import { Link, useLoaderData } from "react-router";


export async function loader({ params }) {
    const id = params.id;
    return { id };
}

function FilmDetails() {

    const { id } = useLoaderData();

    return (
        <>
            <h1>Detalles de la película</h1>

            <p>El id es : {id}</p>

        </>
    )
}

export default FilmDetails
