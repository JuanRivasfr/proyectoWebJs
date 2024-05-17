export async function getProducts(){
    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();

    return data
}