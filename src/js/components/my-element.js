import { LitElement, html, css } from "lit";
import { getProducts } from "./getData.js";
import { forEach } from "async";

class MyElement extends LitElement {

    //Hoja de estilos para el elemento
    static styles = css`
    
    section{
        width: 100vw;
        height: 100vh;
        display: flex;
    }

    .izq{
        height: 100vh;
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
    
        & header{
            color: var(--color-terciary);
            font-size: 1.5vw;
            margin-top: 4vw;
        }
    
        & ul{
            list-style: none;
        }
    
        & li{
            margin: .5vw 0;
        }
    
        & li:nth-child(5){
            margin-top: 10vw;
        }
    
        & a{
            text-decoration: none;
            color: var(--color-terciary);
            font-size: 1.1vw;
            display: flex;
            align-items: center;
        }
    
        & i{
            color: var(--color-secundary);
            margin-right: .5vw;
            font-size: 1.2vw;
        }
    
        & li:nth-child(5) i{
            font-size: 1.4vw;
        }
    
        & span{
            background-color: var(--color-secundary);
            padding: 0 .5vw;
            margin-left: .5vw;
            border: 1px solid var(--color-terciary);
            border-radius: 10px;
        }
    
        & footer{
            font-size: 1.1vw;
            width: 65%;
            margin-bottom: 4vw;
            color: var(--color-terciary);
        }
    
    }
    
    .der{
        width: 80%;
        height: 100vh;
        padding: 3vw;
    
    
        & .der__cont{
            width: 100%;
            height: 100%;
            background: var(--color-secundary);
            border-radius: 40px;
            padding: 1vw 2vw;
        }
    
        & h1{
            color: var(--color-terciary);
            font-size: 2vw;
            height: 3%;
        }
    
        & .todos__cont{
            display: flex;
            width: 100%;
            height: 88%;
            flex-wrap: wrap;
            justify-content: flex-start;
            overflow-y: scroll;
            align-content: flex-start;
        }
    
        & .der__cont__cont{
            background-color: var(--color-aux);
            margin: .5vw .5vw;
            border-radius: 18px;
            overflow: hidden;
            border: 1px solid var(--color-primary);
        
            & img{
                width: 250px;
                min-width: 200px;
                height: 250px;   
            }
    
    
        & .der__inf{
            border: 1px solid var(--color-primary);
            border-bottom: 0;
            border-left: 0;
            border-right: 0;
            background-color: var(--color-secundary);
            border-radius: 15px;
            padding: .5vw;
            color: var(--color-terciary);
            font-size: .8vw;
        }
    
        & .inf__precios{
            display: flex;
            justify-content: space-between;
            align-items: center;
    
            & button{
                background-color: var(--color-terciary);
                color: var(--color-primary);
                padding: .1vw .7vw;
                border: 1px solid;
                border-radius: 8px;
            }
        }
        
        }
    }

    .car__cont {
        display: flex;
        width: 100%;
        height: fit-content;
        flex-wrap: wrap;

        & .car__cont__cont {
            background-color: var(--color-aux);
            margin: 1vw .5vw;
            border-radius: 18px;
            overflow: hidden;
            border: 1px solid var(--color-primary);
            height: fit-content;
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            font-size: 1.5vw;
            color: var(--color-primary);
    
            & img {
                width: 80px;
                min-width: 200px;
                height: 200px;
            }
    
            & p {
                margin: 1vw 0;
            }
    
            & .car__cont__cont__cantidad p:nth-child(2) {
                border: 1px solid var(--color-primary);
                padding: .2vw;
            }
    
            & a i {
                font-size: 3vw;
                color: var(--color-primary);
            }
    
            & .car__cont__cont__cantidad{
                width: 10%;
            }
    
            & .car__cont__cont__nombre{
                width: 15%;
            }
    
        }
    

    }
    `;

    //Se establece el tipo de variables reactivas

    static properties = {
        section: { type: String},
        products: {type : Array}
    };

    //Constructor

    constructor(){
        super();
        this.section= 'Todos los productos';
        this.products = []
    }

    //Se recuperan los datos mediante una callback

    async connectedCallback(){
        super.connectedCallback();
        await this.obtenerDataProductos();
    }

    //Funcion a la que se llama para recuperar los datos y verificar que se esten recuperando correctamente

    async obtenerDataProductos(){
        try {
            this.products = await getProducts();
        } catch(error){
            console.error('Error al obtener los productos:', error)
        }
    }

    //Se renderiza la pagina web inicial

    render(){
        return html`
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <section class="cont__body">
        <aside class="izq">
            <header class="izq__campus">
                <h1>CampusShop</h1>
            </header>
            <nav>
                <ul>
                    <li><a href="#" @click=${
                        () => this.changeSection('Todos los productos')
                    }><i class='bx bx-closet'></i>Todos los productos</a></li>
                    <li><a href="#" @click=${
                        () => this.changeSection('Abrigos')
                    }><i class='bx bx-closet'></i>Abrigos</a></li>
                    <li><a href="#" @click=${
                        () => this.changeSection('Camisetas')
                    }><i class='bx bx-closet'></i>Camisetas</a></li>
                    <li><a href="#" @click=${
                        () => this.changeSection('Pantalones')
                    }><i class='bx bx-closet'></i>Pantalones</a></li>
                    <li><a href="#" @click=${
                        () => this.changeSection('Carrito')
                    }><i class='bx bx-cart'></i>Carrito <span>${this.contCart()}</span></a></li>
                </ul>
            </nav>
            <footer>
                <p>@ 2023 Camper</p>
            </footer>
        </aside>
        <aside class="der">
            <div class="der__cont">
                <h1>${this.section}</h1>
                <div class="todos__cont">
                    ${this.chargeContent()}
                </div>
            </div>
        </aside>
        </section>
        `
    }

    //Funcion llamada para cambiar el valor de section y asi cambiar los productos que se muestran

    changeSection(section) {
        this.section = section;
    }

    //Carga los productos que quieren ser mostrados

    chargeContent(){

        if (this.section !== 'Carrito') {
            
            const listaProductos = this.products.filter(val => 
                this.section === 'Todos los productos' || val.categoria.id === this.section
                );
                
            return html`
                ${listaProductos.map(valproduct => html`
                <div class="der__cont__cont">
                    <div class="der__contimg">
                        <img src="${valproduct.imagen}" alt="">
                    </div>
                    <div class="der__inf">
                        <p>${valproduct.titulo}</p>
                        <div class="inf__precios">
                            <p>$${valproduct.precio}</p>
                            <button id="${valproduct.id}" @click=${
                                () => this.addCart(valproduct, valproduct.id, valproduct.precio)
                            }>Agregar</button>
                        </div>
                    </div>
                </div>
                `)}
            `
        }
        else {
            
            let data = JSON.parse(localStorage.getItem('cart')) || []
            
            return html`
            ${data.map(carProduct => html`
            <div class="car__cont">
                <div class="car__cont__cont">
                    <div class="car__contimg">
                        <img src="${carProduct.imagen}" alt="">
                    </div>
                    <div class="car__cont__cont__nombre">
                        <p>Nombre</p>
                        <p>${carProduct.titulo}</p>
                    </div>
                    <div class="car__cont__cont__cantidad">
                        <p>Cantidad</p>
                        <p>${carProduct.cantidad}</p>
                    </div>
                    <div class="car__cont__cont__precio">
                        <p>Precio</p>
                        <p>$${carProduct.precio}</p>
                    </div>
                    <div class="car__cont__cont__subtotal">
                        <p>Subtotal</p>
                        <p>$${carProduct.subtotal}</p>
                    </div>
                    <a href="#" @click=${
                        () => this.deleteCar(carProduct.id)
                    }><i class='bx bx-trash'></i></a>
                </div>
            </div>
            `)}
            `
        }

        
    }

    //Funcion para eliminar productos 

    deleteCar(id){
        let data = JSON.parse(localStorage.getItem('cart')) || [];
        data = data.filter(productId => productId.id !== id);
        localStorage.setItem('cart', JSON.stringify(data))
        this.requestUpdate();
        console.log(id)
    }

    //Funcion para añadir productos

    addCart(producto, idproducto, precio){
        let data = JSON.parse(localStorage.getItem('cart')) || [];
        let productoExistente = data.find(val => val.id === idproducto);
        if (productoExistente){
            productoExistente.cantidad++
            productoExistente.subtotal += precio
        }
        else{
            producto.cantidad = 1;
            producto.subtotal = producto.precio;
            data.push(producto)
        }
        localStorage.setItem('cart', JSON.stringify(data));
        this.requestUpdate();
        console.log(data)
    }

    //El contador de los productos del carro

    contCart(){
        let data = JSON.parse(localStorage.getItem('cart')) || [];
        return data.length;
    }

}

customElements.define('my-element', MyElement);
export {MyElement}