import { LitElement, html, css } from "lit";
import { getProducts } from "./getData.js";

class MyElement extends LitElement {

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
    `;

    static properties = {
        section: { type: String},
        products: {type : Array}
    };

    constructor(){
        super();
        this.section= 'Todos los productos';
        this.products = []
    }

    async connectedCallback(){
        super.connectedCallback();
        await this.obtenerDataProductos();
    }

    async obtenerDataProductos(){
        try {
            this.products = await getProducts();
        } catch(error){
            console.error('Error al obtener los productos:', error)
        }
    }

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
                    <li><a href="#"><i class='bx bx-cart'></i>Carrito <span>3</span></a></li>
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

    changeSection(section) {
        this.section = section;
    }

    chargeContent(){
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
                        <p>${valproduct.precio}</p>
                        <button id="${valproduct.id}">Agregar</button>
                    </div>
                </div>
            </div>
            `)}
        `
    }

}

customElements.define('my-element', MyElement);