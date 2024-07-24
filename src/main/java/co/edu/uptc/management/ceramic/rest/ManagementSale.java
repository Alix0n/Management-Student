package co.edu.uptc.management.ceramic.rest;

import java.util.List;
import java.util.Objects;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import co.edu.uptc.management.ceramic.dto.SaleDTO;
import co.edu.uptc.management.persistence.ManagementPersistenceSale;


@Path("/ManagementSale")
public class ManagementSale {
	
	public static ManagementPersistenceSale managementSales = new ManagementPersistenceSale();;
	
	static {
		managementSales.loadFilePlain("/data/sale.txt");
	}
	
	@GET
	@Path("/getSales")
	@Produces( { MediaType.APPLICATION_JSON } )
	public List<SaleDTO> getSales(){
		return managementSales.getListSales();
	}
	
	@GET
	@Path("/getSalesByCode")
	@Produces( { MediaType.APPLICATION_JSON } )
	public SaleDTO getSalesByCode(@QueryParam("codSale") String codSale){
		for(SaleDTO saleDTO: managementSales.getListSales()) {
			if(saleDTO.getCodSale().equals(codSale)) {
				return saleDTO;
			}
		}
		return null;
	}
	
	
	@POST
	@Path("/createSale")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public SaleDTO createSale(SaleDTO saleDTO) {
		if(managementSales.getListSales().add(saleDTO)) {
			managementSales.dumpFilePlain("sale.txt");
			return saleDTO;
		}
		return null;
	}
	
	@PUT
	@Path("/updateSale")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public SaleDTO updateSale(SaleDTO saleDTO) {
		for(SaleDTO sale: managementSales.getListSales()) {
			if(sale.getCodSale().equals(saleDTO.getCodSale())) {
				sale.setCodSale(saleDTO.getCodSale());
				sale.setCodCeramic(saleDTO.getCodCeramic());
				sale.setPayment(saleDTO.getPayment());
				sale.setPriceSale(saleDTO.getPriceSale());
				sale.setQuantitySold(saleDTO.getQuantitySold());
				managementSales.dumpFilePlain("sale.txt");
				return saleDTO;
			}
		}
		return null;
	}
	
	@PUT
	@Path("/updateSaleAttribute")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public SaleDTO updateSaleAttribute(SaleDTO saleDTO) {
		for(SaleDTO sale: managementSales.getListSales()) {
			if(sale.getCodSale().equals(saleDTO.getCodSale())) {
				if(!Objects.isNull(saleDTO.getCodCeramic())) {
					sale.setCodCeramic(saleDTO.getCodCeramic());
				}
				
				if(!Objects.isNull(saleDTO.getPayment())) {
					sale.setPayment(saleDTO.getPayment());
				}
				
				if(!Objects.isNull(saleDTO.getPriceSale())) {
					sale.setPriceSale(saleDTO.getPriceSale());
				}
				
				if(!Objects.isNull(saleDTO.getQuantitySold())) {
					sale.setQuantitySold(saleDTO.getQuantitySold());
				}
				
			    managementSales.dumpFilePlain("sale.txt");
				return saleDTO;
			}
		}
		return null;
	}
	
	@DELETE
	@Path("/deleteSale")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public SaleDTO deleteSale(@QueryParam("codSale") String codSale) {
		SaleDTO saleDTO = this.getSalesByCode(codSale);
		if(saleDTO != null) {
			managementSales.getListSales().remove(saleDTO);
			managementSales.dumpFilePlain("sale.txt");
		}
		return saleDTO;
	}
	
	
}


