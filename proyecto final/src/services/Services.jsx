//Obtener datos 
async function getDatos(endpoint) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const datos = await response.json()
        return datos

    } catch (error) {
        console.error('Hay un error al obtener los datos:', error);
        throw error;
    }
}

//Mostrar datos
async function postDatos(endpoint, datos) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })

        if (!response.ok) throw new Error("Error al mostrar y guardar datos (POST): " + response.status);

        return await response.json();

    } catch (error) {
        console.error("Hay un error al crear en " + endpoint, error);
        throw error
    }
}

//Actualizar
async function putDatos(endpoint, id, datos) {
    try {
        // 1) Obtener el registro actual
        const getRes = await fetch(`http://localhost:3001/${endpoint}/${id}`);
        if (!getRes.ok) throw new Error("Error al leer el recurso actual");
        const actual = await getRes.json();
        // 2) Combinar los datos nuevos con los existentes
        const cuerpo = { ...actual, ...datos };
        // 3) Enviar PUT con el objeto completo
        const response = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cuerpo),
        });

        if (!response.ok) throw new Error("Error al actualizar los datos");
        return await response.json();

    } catch (error) {
        console.error("Hay un error al actualizar en putComputadoras:", error);
        throw error;
    }
}

//Borrar datos
async function eliminateDatos(id) {
    try {
        const respuesta = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (respuesta.ok) {
            datos();
            alert("Solicitud eliminada correctamente");
        } else {
            alert("Error al eliminar la solicitud");
        }
    } catch (error) {
        console.error("Error al eliminar datos:", error);
    }
}

export default { getDatos, postDatos, putDatos, eliminateDatos }