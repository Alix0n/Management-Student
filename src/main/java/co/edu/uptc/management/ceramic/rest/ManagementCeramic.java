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

import co.edu.uptc.management.ceramic.dto.CeramicDTO;
import co.edu.uptc.management.persistence.ManagementPersistenceCeramic;


@Path("/ManagementCeramic")
public class ManagementCeramic {
	
	public static ManagementPersistenceCeramic managementCeramics = new ManagementPersistenceCeramic();;
	
	static {
		managementCeramics.loadFilePlain("/data/ceramics.txt");
	}
	
	@GET
	@Path("/getCeramics")
	@Produces( { MediaType.APPLICATION_JSON } )
	public List<CeramicDTO> getCeramics(){
		return managementCeramics.getListCeramics();
	}
	
	@GET
	@Path("/getCeramicsByCode")
	@Produces( { MediaType.APPLICATION_JSON } )
	public CeramicDTO getCeramicsByCode(@QueryParam("code") String code){
		for(CeramicDTO ceramicDTO: managementCeramics.getListCeramics()) {
			if(ceramicDTO.getcode().equals(code)) {
				return ceramicDTO;
			}
		}
		return null;
	}
	
	
	@POST
	@Path("/createCeramic")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public CeramicDTO createCeramic(CeramicDTO ceramicDTO) {
		if(managementCeramics.getListCeramics().add(ceramicDTO)) {
			managementCeramics.dumpFilePlain("ceramics.txt");
			return ceramicDTO;
		}
		return null;
	}
	
	@PUT
	@Path("/updateCeramic")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public CeramicDTO updateCeramic(CeramicDTO ceramicDTO) {
		for(CeramicDTO ceramic: managementCeramics.getListCeramics()) {
			if(ceramic.getcode().equals(ceramicDTO.getcode())) {
				ceramic.setcode(ceramicDTO.getcode());
				ceramic.setMaterial(ceramicDTO.getMaterial());
				ceramic.setColor(ceramicDTO.getColor());
				ceramic.setForm(ceramicDTO.getForm());
				ceramic.setAcabado(ceramicDTO.getAcabado());
				ceramic.setPrice(ceramicDTO.getPrice());
				ceramic.setStock(ceramicDTO.getStock());
				managementCeramics.dumpFilePlain("ceramics.txt");
				return ceramicDTO;
			}
		}
		return null;
	}
	
	@PUT
	@Path("/updateCeramicAttribute")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public CeramicDTO updateCeramicAttribute(CeramicDTO ceramicDTO) {
		for(CeramicDTO ceramic: managementCeramics.getListCeramics()) {
			if(ceramic.getcode().equals(ceramicDTO.getcode())) {
				if(!Objects.isNull(ceramicDTO.getMaterial())) {
					ceramic.setMaterial(ceramicDTO.getMaterial());
				}
				
				if(!Objects.isNull(ceramicDTO.getColor())) {
					ceramic.setColor(ceramicDTO.getColor());
				}
				
				if(!Objects.isNull(ceramicDTO.getForm())) {
					ceramic.setForm(ceramicDTO.getForm());
				}
				
				if(!Objects.isNull(ceramicDTO.getAcabado())) {
					ceramic.setAcabado(ceramicDTO.getAcabado());
				}
				
				if(!Objects.isNull(ceramicDTO.getPrice())) {
					ceramic.setPrice(ceramicDTO.getPrice());
				}
				
				if(!Objects.isNull(ceramicDTO.getStock())) {
					ceramic.setStock(ceramicDTO.getStock());
				}
				managementCeramics.dumpFilePlain("ceramics.txt");
				return ceramicDTO;
			}
		}
		return null;
	}
	
	@DELETE
	@Path("/deleteCeramic")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public CeramicDTO deleteCeramic(@QueryParam("code") String code) {
		CeramicDTO ceramicDTO = this.getCeramicsByCode(code);
		if(ceramicDTO != null) {
			managementCeramics.getListCeramics().remove(ceramicDTO);
			managementCeramics.dumpFilePlain("ceramics.txt");
		}
		return ceramicDTO;
	}
	
	
}

