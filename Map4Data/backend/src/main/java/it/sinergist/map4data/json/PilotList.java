package it.sinergist.map4data.json;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class PilotList {
	private String verion;
	private ArrayList<PilotValue> pilots;
	
	public String getVerion() {
		return verion;
	}
	
	public void setVerion(String verion) {
		this.verion = verion;
	}
	
	public ArrayList<PilotValue> getPilots() {
		return pilots;
	}
	
	public void setPilots(ArrayList<PilotValue> pilots) {
		this.pilots = pilots;
	}
}
