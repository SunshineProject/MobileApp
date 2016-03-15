package it.sinergis.map4data.rest;

import it.sinergis.map4data.answerObjects.Answer;
import it.sinergis.utils.Authentication;
import it.sinergis.utils.Constant;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/login2")
public class Login2 {
	public Login2() {
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(@FormParam("user") String user, @FormParam("psw") String psw,
			@FormParam("pilot") String pilot, @FormParam("version") String version) {
		System.out.println("log");
		Answer answer = Authentication.getAutentication(Constant.BASE_DIR + "users.json", user, psw, pilot);
		if (!answer.isState()) {
			//return answer;
			return Response.ok(answer).build();
		}
		answer = Authentication.getConf(answer, Constant.BASE_DIR);
		if (!answer.isState()) {
			//return answer;
			return Response.ok(answer).build();
		}
		answer = Authentication.getConfParameter(answer, Constant.BASE_DIR + answer.getConfig() + ".json"); //"confwfst.json");
		return Response.ok(answer).build();
	}
}
