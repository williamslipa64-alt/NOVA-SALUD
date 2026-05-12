const pool = require('../config/db');

class Producto {
  static async findAll() {
    const query = 'SELECT * FROM productos ORDER BY id DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async create(data) {
    try {
      const { 
        nombre, 
        codigo_barra = null, 
        precio_compra = 0, 
        precio_venta, 
        stock_actual = 0, 
        stock_minimo = 10, 
        categoria = null, 
        fecha_vencimiento = null 
      } = data;

      if (!nombre) {
        throw new Error("El nombre del producto es obligatorio");
      }

      // Convertir fecha vacía a null
      const fechaFinal = fecha_vencimiento === '' || fecha_vencimiento == null ? null : fecha_vencimiento;

      const query = `
        INSERT INTO productos (
          nombre, codigo_barra, precio_compra, precio_venta, 
          stock_actual, stock_minimo, categoria, fecha_vencimiento
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;

      const result = await pool.query(query, [
        nombre, 
        codigo_barra, 
        precio_compra, 
        precio_venta, 
        stock_actual, 
        stock_minimo, 
        categoria, 
        fechaFinal
      ]);

      return result.rows[0];
    } catch (error) {
      console.error("Error en Producto.create:", error);
      throw error;
    }
  }
}

module.exports = Producto;