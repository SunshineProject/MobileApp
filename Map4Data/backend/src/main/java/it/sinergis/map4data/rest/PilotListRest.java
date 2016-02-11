package it.sinergis.map4data.rest;

import it.sinergis.utils.Constant;
import it.sinergis.utils.PilotListReader;
import it.sinergist.map4data.json.PilotList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/pilots")
public class PilotListRest {
	public PilotListRest() {
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response pliots() {
		System.out.println("log");
		PilotList pilots = PilotListReader.getPilots(Constant.BASE_DIR + "pilots.json");
		if (pilots == null) {
			return Response.serverError().build();
		}
		return Response.ok(pilots).build();
		
	}
}
