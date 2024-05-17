import { LitElement, html, css } from "lit";
import { getProducts } from "./getData.js";

class MyList extends LitElement {

    static properties = {
        section: { type: String}
    };

    constructor(){
        super();
        this.section= 'todos';
        this.products = {}
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
            <li><a href="#" @click=${
                () => this.changeSection('todos')
            }><i class='bx bx-closet'></i>Todos los productos</a></li>
            <li><a href="#" @click=${
                () => this.changeSection('abrigos')
            }><i class='bx bx-closet'></i>Abrigos</a></li>
            <li><a href="#" @click=${
                () => this.changeSection('camisetas')
            }><i class='bx bx-closet'></i>Camisetas</a></li>
            <li><a href="#" @click=${
                () => this.changeSection('pantalones')
            }><i class='bx bx-closet'></i>Pantalones</a></li>
            <li><a href="#"><i class='bx bx-cart'></i>Carrito <span>3</span></a></li>
            
        `
    }

    changeSection(section) {
        this.section = section;
    }

    chargeContent(){
        const listaProductos = this.products.filter(val => 
            this.section === 'todos' || val.categoria.id === this.section
            );
            
        return html`
            ${listaProductos.map(valproduct => html`
            <div class="product__cont">
                <div class="cont_img">
                    <img src="${valproduct.imagen}" alt="">
                </div>
                <div class="cont__inf">
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