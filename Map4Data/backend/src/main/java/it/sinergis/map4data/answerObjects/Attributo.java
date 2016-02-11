package it.sinergis.map4data.answerObjects;

import java.util.ArrayList;

public class Attributo {
	private String db_name;
	private String nome_visualizzato;
	private String tipologia;
	private ArrayList<KeyValue> valori;
	
	public Attributo() {
		super();
	}
	
	public Attributo(String db_name, String nome_visualizzato, String tipologia, ArrayList<KeyValue> valori) {
		super();
		this.db_name = db_name;
		this.nome_visualizzato = nome_visualizzato;
		this.tipologia = tipologia;
		this.valori = valori;
	}
	
	public String getDb_name() {
		return db_name;
	}
	
	public void setDb_name(String db_name) {
		this.db_name = db_name;
	}
	
	public String getNome_visualizzato() {
		return nome_visualizzato;
	}
	
	public void setNome_visualizzato(String nome_visualizzato) {
		this.nome_visualizzato = nome_visualizzato;
	}
	
	public String getTipologia() {
		return tipologia;
	}
	
	public void setTipologia(String tipologia) {
		this.tipologia = tipologia;
	}
	
	public ArrayList<KeyValue> getValori() {
		return valori;
	}
	
	public void setValori(ArrayList<KeyValue> valori) {
		this.valori = valori;
	}
}
