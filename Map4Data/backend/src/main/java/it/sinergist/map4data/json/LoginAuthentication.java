package it.sinergist.map4data.json;

import java.util.ArrayList;

public class LoginAuthentication {
	private String user;
	private String psw;
	private ArrayList<String> pilots;
	
	public String getUser() {
		return user;
	}
	
	public void setUser(String user) {
		this.user = user;
	}
	
	public String getPsw() {
		return psw;
	}
	
	public void setPsw(String psw) {
		this.psw = psw;
	}
	
	public ArrayList<String> getPilots() {
		return pilots;
	}
	
	public void setPilots(ArrayList<String> pilots) {
		this.pilots = pilots;
	}
	
}
