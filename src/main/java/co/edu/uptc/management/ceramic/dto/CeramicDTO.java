package co.edu.uptc.management.ceramic.dto;

import java.io.Serializable;

public class CeramicDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String code;
	private String material;
	private String color;
	private String form;
	private String acabado;
	private double price;
	private int stock;
	
	public CeramicDTO() {
		
	}
	
	public CeramicDTO(String code, String material, String color, String form, String acabado, double price, int stock) {
		this.code=code;
		this.material = material;
		this.color = color;
		this.form = form;
		this.acabado = acabado;
		this.price = price;
		this.stock = stock;
	}


	public String getMaterial() {
		return material;
	}
	
	public void setMaterial(String material) {
		this.material = material;
	}
	
	public String getColor() {
		return color;
	}
	
	public void setColor(String color) {
		this.color = color;
	}
	
	public String getForm() {
		return form;
	}
	
	public void setForm(String form) {
		this.form = form;
	}
	
	public String getAcabado() {
		return acabado;
	}
	
	public void setAcabado(String acabado) {
		this.acabado = acabado;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public int getStock() {
		return stock;
	}
	
	public void setStock(int stock) {
		this.stock = stock;
	}

	
	public String getcode() {
		return code;
	}

	public void setcode(String code) {
		this.code = code;
	}

	@Override
	public String toString() {
		return "Ceramic [code=" + code + ", material=" + material + ", color=" + color + ", form=" + form + ", acabado="
				+ acabado + ", price=" + price + ", stock=" + stock + "]";
	}

}
