export async function getProducts(){
    try {
        const response = await fetch("http://localhost:3000/productos");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Productos obtenidos:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}