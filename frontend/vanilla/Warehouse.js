// --- CLASE BASE (Superclase) ---
export class Producto {
    constructor(id, nombre, descripcion, precio, stock, imagen, fallbackIcon, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.precioFormateado = `$ ${precio.toLocaleString()}`;
        this.stock = stock;
        this.imagen = imagen;
        this.fallbackIcon = fallbackIcon;
        this.categoria = categoria;
    }

    mostrarInfo() {
        return `${this.nombre} - ${this.precioFormateado}`;
    }
}

// --- CLASES HEREDADAS (Polimorfismo) ---
export class Laptop extends Producto {
    constructor(id, nombre, descripcion, precio, stock, imagen, fallbackIcon, categoria, procesador, ram, almacenamiento) {
        super(id, nombre, descripcion, precio, stock, imagen, fallbackIcon, categoria);
        this.procesador = procesador;
        this.ram = ram;
        this.almacenamiento = almacenamiento;
    }

    mostrarInfo() {
        return `[Laptop] ${super.mostrarInfo()} | CPU: ${this.procesador}, RAM: ${this.ram}`;
    }
}

export class Smartphone extends Producto {
    constructor(id, nombre, descripcion, precio, stock, imagen, fallbackIcon, categoria, sistemaOperativo, tamanoPantalla, camara) {
        super(id, nombre, descripcion, precio, stock, imagen, fallbackIcon, categoria);
        this.sistemaOperativo = sistemaOperativo;
        this.tamanoPantalla = tamanoPantalla;
        this.camara = camara;
    }

    mostrarInfo() {
        return `[Smartphone] ${super.mostrarInfo()} | OS: ${this.sistemaOperativo}, Pantalla: ${this.tamanoPantalla}`;
    }
}

export class Accesorio extends Producto {
    constructor(id, nombre, descripcion, precio, stock, imagen, fallbackIcon, categoria, tipoAccesorio) {
        super(id, nombre, descripcion, precio, stock, imagen, fallbackIcon, categoria);
        this.tipoAccesorio = tipoAccesorio;
    }

    mostrarInfo() {
        return `[Accesorio] ${super.mostrarInfo()} | Tipo: ${this.tipoAccesorio}`;
    }
}

// --- CLASE GESTOR DEL CARRITO DE COMPRAS ---
export class CarritoCompra {
    constructor(correoUsuario) {
        this.correoUsuario = correoUsuario;
        // Carga el carrito específico de este usuario desde localStorage
        const guardado = localStorage.getItem(`carrito_${correoUsuario}`);
        this.items = guardado ? JSON.parse(guardado) : [];
    }

    sincronizarStorage() {
        localStorage.setItem(`carrito_${this.correoUsuario}`, JSON.stringify(this.items));
    }

    agregarProducto(producto, cantidad = 1) {
        const cantInt = parseInt(cantidad);
        const index = this.items.findIndex(item => item.producto.id === producto.id);
        if (index > -1) {
            this.items[index].cantidad += cantInt;
        } else {
            this.items.push({ producto, cantidad: cantInt });
        }
        this.sincronizarStorage();
    }

    actualizarCantidad(idProducto, cantidad) {
        const index = this.items.findIndex(item => item.producto.id === idProducto);
        if (index > -1) {
            const nuevaCantidad = parseInt(cantidad);
            if (nuevaCantidad <= 0) {
                this.eliminarProducto(idProducto);
            } else {
                this.items[index].cantidad = nuevaCantidad;
                this.sincronizarStorage();
            }
        }
    }

    eliminarProducto(idProducto) {
        this.items = this.items.filter(item => item.producto.id !== idProducto);
        this.sincronizarStorage();
    }

    calcularTotal() {
        return this.items.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    }

    vaciar() {
        this.items = [];
        this.sincronizarStorage();
    }
}

// --- WAREHOUSE / CATÁLOGO ---
export const Warehouse = {
    productos: [
        new Laptop(1, "Laptop Lenovo IdeaPad", "Ideal برای desarrollo y software, 8GB RAM, SSD 256GB.", 2400000, 10, "../Style/image/comopago.png", "💻", "servicios", "Intel Core i5", "8GB", "256GB SSD"),
        new Smartphone(2, "Smartphone Xiaomi Redmi", "Pantalla de 6.5 pulgadas y cámara de alta resolución.", 850000, 15, "../Style/image/comoloquiero.png", "📱", "servicios", "Android 13", "6.5''", "48 MP"),
        new Accesorio(3, "Carga Cívica Estándar", "Recarga inmediata para tu tarjeta Cívica de transporte.", 3200, 100, "../Style/image/ilustracion.png", "💳", "pasajes", "Tarjeta de Transporte"),
        new Accesorio(4, "Protector de silicona Cívica", "Funda protectora con llavero para evitar daños en el chip.", 8500, 40, "../Style/image/background.jpg", "🔑", "accesorios", "Protector")
    ],

    obtenerProductos(categoria = 'todos') {
        if (categoria === 'todos') return this.productos;
        return this.productos.filter(p => p.categoria === categoria);
    }
};