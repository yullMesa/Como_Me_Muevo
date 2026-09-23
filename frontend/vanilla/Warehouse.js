// Warehouse.js - Almacén de datos y lógica de pago para la Tienda

export const Warehouse = {
    productos: [
        {
            id: 1,
            nombre: "Tarjeta de movilidad",
            descripcion: "Tarjeta recargable para el sistema Metro y transporte integrado.",
            precio: 25000,
            precioFormateado: "$ 25.000",
            categoria: "recargas",
            imagen: "../Style/image/tarjeta_icon.png",
            fallbackIcon: "💳"
        },
        {
            id: 2,
            nombre: "Botella de agua",
            descripcion: "Mantén tu hidratación en cada trayecto, 600 ml.",
            precio: 35000,
            precioFormateado: "$ 35.000",
            categoria: "accesorios",
            imagen: "../Style/image/botella_icon.png",
            fallbackIcon: "💧"
        },
        {
            id: 3,
            nombre: "Gorra corporativa",
            descripcion: "Estilo y comodidad para tus recorridos por la ciudad.",
            precio: 45000,
            precioFormateado: "$ 45.000",
            categoria: "ropa",
            imagen: "../Style/image/gorra_icon.png",
            fallbackIcon: "🧢"
        },
        {
            id: 4,
            nombre: "Bolsa ecológica",
            descripcion: "Lleva lo que necesitas con la identidad de la app.",
            precio: 28000,
            precioFormateado: "$ 28.000",
            categoria: "souvenirs",
            imagen: "../Style/image/bolsa_icon.png",
            fallbackIcon: "👜"
        }
    ],

    metodosPago: [
        { id: "credito", nombre: "Tarjeta de Crédito", icono: "💳", descripcion: "Pago diferido o a una cuota" },
        { id: "debito", nombre: "Tarjeta Débito", icono: "🏦", descripcion: "Débito directo de tus fondos" },
        { id: "corriente", nombre: "Cuenta Corriente", icono: "📄", descripcion: "Cargo autorizado a cuenta bancaria" }
    ],

    obtenerProductos(categoria = "todos") {
        if (categoria === "todos") return this.productos;
        return this.productos.filter(p => p.categoria === categoria);
    }
};