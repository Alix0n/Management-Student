package co.edu.uptc.management.ceramic.dto;

import java.io.Serializable;

public class SaleDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String codSale;
	private String codCeramic;
	private String payment; //describe el metodo de pago
	private double priceSale;
	private int quantitySold;
	
	public SaleDTO() {
		
	}

	public SaleDTO(String codSale, String codCeramic, String payment, double priceSale, int quantitySold) {
		this.codSale = codSale;
		this.codCeramic = codCeramic;
		this.payment = payment;
		this.priceSale = priceSale;
		this.quantitySold = quantitySold;
	}

	public String getCodSale() {
		return codSale;
	}

	public void setCodSale(String codSale) {
		this.codSale = codSale;
	}

	public String getCodCeramic() {
		return codCeramic;
	}

	public void setCodCeramic(String codCeramic) {
		this.codCeramic = codCeramic;
	}

	public String getPayment() {
		return payment;
	}

	public void setPayment(String payment) {
		this.payment = payment;
	}

	public double getPriceSale() {
		return priceSale;
	}

	public void setPriceSale(double priceSale) {
		this.priceSale = priceSale;
	}

	public int getQuantitySold() {
		return quantitySold;
	}

	public void setQuantitySold(int quantitySold) {
		this.quantitySold = quantitySold;
	}

	@Override
	public String toString() {
		return "Sale [codSale=" + codSale + ", codCeramic=" + codCeramic + ", payment=" + payment + ", priceSale="
				+ priceSale + ", quantitySold=" + quantitySold + "]";
	}

}
