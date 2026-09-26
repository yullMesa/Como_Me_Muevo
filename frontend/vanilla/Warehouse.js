export const Warehouse = {
    productos: [
        // --- CATEGORÍA: PASAJES Y CÍVICA ---
        {
            id: 1,
            nombre: "Carga Cívica Estándar",
            categoria: "pasajes",
            precio: 3200,
            precioFormateado: "$ 3.200",
            descripcion: "Recarga inmediata para tu tarjeta Cívica al sistema integrado de transporte.",
            imagen: "../Style/image/comopago.png", // <--- 📌 AQUÍ PONES LA IMAGEN 1
            fallbackIcon: "💳"
        },
        {
            id: 2,
            nombre: "Paquete x10 Pasajes Integrados",
            categoria: "pasajes",
            precio: 30000,
            precioFormateado: "$ 30.000",
            descripcion: "Ahorra tiempo y dinero con este paquete prepagado de 10 viajes urbanos.",
            imagen: "../Style/image/comoloquiero.png", // <--- 📌 AQUÍ PONES LA IMAGEN 2
            fallbackIcon: "🎟️"
        },
        {
            id: 3,
            nombre: "Carga Cívica + Pasaje Estudiantil",
            categoria: "pasajes",
            precio: 2400,
            precioFormateado: "$ 2.400",
            descripcion: "Tarifa preferencial especial para estudiantes debidamente acreditados.",
            imagen: "../Style/image/ilustracion.png", // <--- 📌 AQUÍ PONES LA IMAGEN 3
            fallbackIcon: "🎓"
        },

        // --- CATEGORÍA: SERVICIOS DE MOVILIDAD ---
        {
            id: 4,
            nombre: "Membresía Mensual EnCicla",
            categoria: "servicios",
            precio: 15000,
            precioFormateado: "$ 15.000",
            descripcion: "Acceso prioritario y extensión de tiempo en el préstamo de bicicletas públicas.",
            imagen: "../Style/image/background.jpg", // <--- 📌 AQUÍ PONES LA IMAGEN 4
            fallbackIcon: "🚲"
        },
        {
            id: 5,
            nombre: "Pase Exprés Metrocable Línea L",
            categoria: "servicios",
            precio: 5000,
            precioFormateado: "$ 5.000",
            descripcion: "Acceso rápido y sin filas para turistas o viajes de conexión hacia Arví.",
            imagen: "../Style/image/comopago.png", // <--- 📌 AQUÍ PONES LA IMAGEN 5
            fallbackIcon: "🚡"
        },
        {
            id: 6,
            nombre: "Seguro Diario de Viajero C.M.M.",
            categoria: "servicios",
            precio: 1000,
            precioFormateado: "$ 1.000",
            descripcion: "Póliza de cobertura contra accidentes durante tus trayectos diarios en la red.",
            imagen: "../Style/image/comoloquiero.png", // <--- 📌 AQUÍ PONES LA IMAGEN 6
            fallbackIcon: "🛡️"
        },

        // --- CATEGORÍA: ACCESORIOS Y MERCHANDISING ---
        {
            id: 7,
            nombre: "Protector de silicona para Cívica",
            categoria: "accesorios",
            precio: 8500,
            precioFormateado: "$ 8.500",
            descripcion: "Funda protectora con llavero para evitar daños en el chip de tu tarjeta.",
            imagen: "../Style/image/ilustracion.png", // <--- 📌 AQUÍ PONES LA IMAGEN 7
            fallbackIcon: "🔑"
        },
        {
            id: 8,
            nombre: "Botilitro Metálico '¿Cómo me muevo?'",
            categoria: "accesorios",
            precio: 22000,
            precioFormateado: "$ 22.000",
            descripcion: "Termo de acero inoxidable edición especial eco-amigable de la ciudad.",
            imagen: "../Style/image/background.jpg", // <--- 📌 AQUÍ PONES LA IMAGEN 8
            fallbackIcon: "🥤"
        },
        {
            id: 9,
            nombre: "Impermeable de Bolsillo C.M.M.",
            categoria: "accesorios",
            precio: 6000,
            precioFormateado: "$ 6.000",
            descripcion: "Ideal para los chaparrones imprevistos en las tardes de Medellín.",
            imagen: "../Style/image/comopago.png", // <--- 📌 AQUÍ PONES LA IMAGEN 9
            fallbackIcon: "🧥"
        },

        // --- CATEGORÍA: BENEFICIOS Y OTROS ---
        {
            id: 10,
            nombre: "Bono Descuento Aliados Comerciales",
            categoria: "beneficios",
            precio: 0,
            precioFormateado: "GRATIS",
            descripcion: "Cupón de 20% en librerías y cafés locales usando puntos de movilidad.",
            imagen: "../Style/image/comoloquiero.png", // <--- 📌 AQUÍ PONES LA IMAGEN 10
            fallbackIcon: "🎁"
        }
    ],

    obtenerProductos(categoria = 'todos') {
        if (categoria === 'todos') {
            return this.productos;
        }
        return this.productos.filter(p => p.categoria === categoria);
    }
};