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

import co.edu.uptc.management.ceramic.dto.UserDTO;
import co.edu.uptc.management.ceramic.utils.ManagementListUtils;
import co.edu.uptc.management.persistence.ManagementPersistenceUser;


@Path("/ManagementUser")
public class ManagementUser {
	/* Atributo que determina la instancia para manejar la persistencia de usuarios */
	public static ManagementPersistenceUser managementPersistenceUser = new ManagementPersistenceUser();
	
	/* Atributo que determina la clase utilitaria para operaciones a listas */
	public static ManagementListUtils<UserDTO> managementListUtils;
	
	static {
		/* Hacemos el cargue de la información */
		managementPersistenceUser.loadFilePlain("/data/user.txt");
		
		/* Enviamos la información cargada de los archivos a la clase utilitaria */
		managementListUtils = new ManagementListUtils<UserDTO>(
				managementPersistenceUser.getListUserDTO());
		try {
			/* Asignamos el nombre del atributo por los atributos que deseamos ordenar */
			managementListUtils.sortList("nameUser", "password");
		} catch (NoSuchFieldException | SecurityException | IllegalArgumentException | IllegalAccessException e) {
			System.out.println("No se encontró el nombre del atributo en la clase");
			e.printStackTrace();
		}
	}
	
	@GET
	@Path("/validateUser")
	@Consumes({MediaType.TEXT_PLAIN})
	public Boolean validateUser(@QueryParam("nameUser") String nameUser,
			@QueryParam("password") String password) {
		UserDTO userDTO = new UserDTO(nameUser, password);
		UserDTO usuarioEncontrado = null;
		try {
			usuarioEncontrado = managementListUtils.findObjectBinary(userDTO, "nameUser", "password");
		} catch (NoSuchFieldException | IllegalAccessException e) {
			e.printStackTrace();
		}
		return !Objects.isNull(usuarioEncontrado);
	}
	
	@GET
	@Path("/getUsers")
	@Produces( { MediaType.APPLICATION_JSON } )
	public List<UserDTO> getUsers(){
		return managementPersistenceUser.getListUserDTO();
	}
	
	@GET
	@Path("/getUsersByUser")
	@Produces( { MediaType.APPLICATION_JSON } )
	public UserDTO getUsersByUser(@QueryParam("user") String user){
		for(UserDTO userDTO: managementPersistenceUser.getListUserDTO()) {
			if(userDTO.getNameUser().equals(user)) {
				return userDTO;
			}
		}
		return null;
	}
	
	
	@POST
	@Path("/createUser")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public UserDTO createUser(UserDTO userDTO) {
		if(managementPersistenceUser.getListUserDTO().add(userDTO)) {
			managementPersistenceUser.dumpFilePlain("user.txt");
			return userDTO;
		}
		return null;
	}
	
	
	@PUT
	@Path("/updateUser")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public UserDTO updateUser(UserDTO userDTO) {
		for(UserDTO user: managementPersistenceUser.getListUserDTO()) {
			if(user.getNameUser().equals(userDTO.getNameUser())) {
				user.setNameUser(userDTO.getNameUser());
				user.setPassword(userDTO.getPassword());
				managementPersistenceUser.dumpFilePlain("user.txt");
				return userDTO;
			}
		}
		return null;
	}
	
	
	
	@PUT
	@Path("/updateUserAttribute")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public UserDTO updateUserAttribute(UserDTO userDTO) {
		for(UserDTO user: managementPersistenceUser.getListUserDTO()) {
			if(user.getNameUser().equals(userDTO.getNameUser())) {
				
				
				if(!Objects.isNull(userDTO.getPassword())) {
					user.setPassword(userDTO.getPassword());
				}
				
				
				managementPersistenceUser.dumpFilePlain("user.txt");
				return userDTO;
			}
		}
		return null;
	}
	
	@DELETE
	@Path("/deleteUser")
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes({ MediaType.APPLICATION_JSON })
	public UserDTO deleteUser(@QueryParam("user") String user) {
		UserDTO userDTO = this.getUsersByUser(user);
		if(userDTO != null) {
			managementPersistenceUser.getListUserDTO().remove(userDTO);
			managementPersistenceUser.dumpFilePlain("user.txt");
		}
		return userDTO;
	}
	
	
}

