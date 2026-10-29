import { describe, it, expect } from "vitest";
import { addToCart, removeFromCart, updateQuantity, getCartTotal, getCart, clearCart } from "~/utils/cart";

const libro = { id: 1, titulo: "1984", autor: "George Orwell", precio: 10000, stock: 5 } as any;

describe("Carrito de compras (apoya REQ-FUNC-04)", () => {
  it("agrega un libro y acumula la cantidad si ya existe", () => {
    addToCart(libro, 1);
    addToCart(libro, 2);
    expect(getCart()).toHaveLength(1);
    expect(getCart()[0].cantidad).toBe(3);
  });

  it("calcula el total del carrito", () => {
    addToCart(libro, 2);
    expect(getCartTotal()).toBe(20000);
  });

  it("no permite cantidades menores a 1", () => {
    addToCart(libro, 1);
    updateQuantity(1, -5);
    expect(getCart()[0].cantidad).toBe(1);
  });

  it("elimina un libro y vacía el carrito", () => {
    addToCart(libro, 1);
    removeFromCart(1);
    expect(getCart()).toHaveLength(0);
    addToCart(libro, 1);
    clearCart();
    expect(getCart()).toHaveLength(0);
  });
});
