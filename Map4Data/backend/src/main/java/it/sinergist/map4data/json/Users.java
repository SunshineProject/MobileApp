package it.sinergist.map4data.json;

import java.util.ArrayList;

public class Users {
	private ArrayList<LoginAuthentication> users;
	private int version;
	
	public ArrayList<LoginAuthentication> getUsers() {
		return users;
	}
	
	public void setUsers(ArrayList<LoginAuthentication> users) {
		this.users = users;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
	
}
