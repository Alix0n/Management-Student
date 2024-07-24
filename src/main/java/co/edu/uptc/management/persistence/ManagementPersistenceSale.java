package co.edu.uptc.management.persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.StringTokenizer;

import co.edu.uptc.management.ceramic.dto.SaleDTO;
import co.edu.uptc.management.constants.CommonConstants;

public class ManagementPersistenceSale extends FilePlain {
	
	private List<SaleDTO> listSales;
	
	public ManagementPersistenceSale() {
		this.listSales = new ArrayList<>();
	}

	public void addSale(SaleDTO sale) {
		// TODO Auto-generated method stub
		this.listSales.add(sale);
	}
	
	public void deleteSaleByCode(String code) {
		if(!Objects.isNull(findSaleByCode(code))) {
			this.listSales.remove(findSaleByCode(code));
		}
	}
	
	public SaleDTO findSaleByCode(String code) {
		for(SaleDTO sale: this.listSales) {
			if(sale.getCodSale().equals(code)) {
				return sale;
			}
		}
		return null;
	}
	
	public boolean findCeramicSaleByCodeBoolean(String code) {
		boolean found = false;
		for(SaleDTO sale: this.listSales) {
			if(sale.getCodCeramic().equals(code)) {
				found=true;
				return found;
			}
		}	
		return found;	
	}
	
	public boolean findSaleByCodeBoolean(String code) {
		boolean found = false;
		for(SaleDTO sale: this.listSales) {
			if(sale.getCodSale().equals(code)) {
				found=true;
				return found;
			}
		}	
		return found;	
	}
	
	public List<SaleDTO> getListSales() {
		return listSales;
	}

	public void setListSales(List<SaleDTO> listSales) {
		this.listSales = listSales;
	}

	
	

	public void dumpFilePlain(String rutaArchivo) {
				
				List<String> records = new ArrayList<>();
				
				 for(SaleDTO sale : listSales){
					 StringBuilder contentSale= new StringBuilder();
					 contentSale.append(sale.getCodSale()).append(CommonConstants.SEMI_COLON);
					 contentSale.append(sale.getCodCeramic()).append(CommonConstants.SEMI_COLON);
					 contentSale.append(sale.getPayment()).append(CommonConstants.SEMI_COLON);
					 contentSale.append(sale.getPriceSale()).append(CommonConstants.SEMI_COLON);
					 contentSale.append(sale.getQuantitySold());
					 records.add(contentSale.toString());
				 }
				 this.writer(rutaArchivo, records);
		
	}
	
		public void loadFilePlain(String rutaNombreArchivo) { 
			List<String> contentInLine = this.reader(rutaNombreArchivo);
			for(String row: contentInLine) {
				StringTokenizer tokens = new StringTokenizer(row, CommonConstants.SEMI_COLON);
					while(tokens.hasMoreElements()){
						String codSale = tokens.nextToken();
						String codCeramic = tokens.nextToken();
						String payment = tokens.nextToken();
						Double priceSale = Double.parseDouble(tokens.nextToken());
						int quantitySold = Integer.parseInt(tokens.nextToken());
						listSales.add(new SaleDTO(codSale, codCeramic, payment, priceSale, quantitySold));
					}
				}
			}

}
