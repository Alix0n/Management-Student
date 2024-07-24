package co.edu.uptc.management.persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.StringTokenizer;

import co.edu.uptc.management.ceramic.dto.CeramicDTO;
import co.edu.uptc.management.constants.CommonConstants;

public class ManagementPersistenceCeramic extends FilePlain{
		
	private List<CeramicDTO> listCeramics;
	
	
	public ManagementPersistenceCeramic() {
		this.listCeramics = new ArrayList<>();
	}

	public void addCeramic(CeramicDTO ceramic) {
		// TODO Auto-generated method stub
		this.listCeramics.add(ceramic);
	}
	
	public void deleteCeramicByCode(String code) {
		if(!Objects.isNull(findCeramicByCode(code))) {
			this.listCeramics.remove(findCeramicByCode(code));
		}
	}
	
	public CeramicDTO findCeramicByCode(String code) {
		for(CeramicDTO ceramic: this.listCeramics) {
			if(ceramic.getcode().equals(code)) {
				return ceramic;
			}
		}
		return null;
	}
	
	public boolean findCeramicByCodeBoolean(String code) {
		boolean found = false;
		for(CeramicDTO ceramic: this.listCeramics) {
			if(ceramic.getcode().equals(code)) {
				found=true;
				return found;
			}
		}
		
		return found;
	}
	
	public List<CeramicDTO> getListCeramics() {
		return listCeramics;
	}

	public void setListCeramics(List<CeramicDTO> listCeramics) {
		this.listCeramics = listCeramics;
	}
	
	

	
	
	

	

	public void dumpFilePlain(String rutaArchivo) {
				
				List<String> records = new ArrayList<>();
				
				 for(CeramicDTO ceramic : listCeramics){
					 StringBuilder contentCeramic= new StringBuilder();
					 contentCeramic.append(ceramic.getcode()).append(CommonConstants.SEMI_COLON);
					 contentCeramic.append(ceramic.getMaterial()).append(CommonConstants.SEMI_COLON);
					 contentCeramic.append(ceramic.getColor()).append(CommonConstants.SEMI_COLON);
					 contentCeramic.append(ceramic.getForm()).append(CommonConstants.SEMI_COLON);
					 contentCeramic.append(ceramic.getAcabado()).append(CommonConstants.SEMI_COLON);
					 contentCeramic.append(ceramic.getPrice()).append(CommonConstants.SEMI_COLON);
					 contentCeramic.append(ceramic.getStock());
					 records.add(contentCeramic.toString());
				 }
				 this.writer(rutaArchivo, records);
		
	}
	
		public void loadFilePlain(String rutaNombreArchivo) { 
			List<String> contentInLine = this.reader(rutaNombreArchivo);
			for(String row: contentInLine) {
				StringTokenizer tokens = new StringTokenizer(row, CommonConstants.SEMI_COLON);
					while(tokens.hasMoreElements()){
						String code = tokens.nextToken();
						String material = tokens.nextToken();
						String color = tokens.nextToken();
						String form = tokens.nextToken();
						String acabado = tokens.nextToken();
						Double price = Double.parseDouble(tokens.nextToken());
						int stock = Integer.parseInt(tokens.nextToken());
						listCeramics.add(new CeramicDTO(code, material, color, form, acabado, price, stock));
					}
				}
			}
			
		@Override
		public String toString() {
			return "ManagementCeramic [listCeramics=" + listCeramics + "]";
		}
		
	
		
		
		

		

}
