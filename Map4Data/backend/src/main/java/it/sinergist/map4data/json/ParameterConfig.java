package it.sinergist.map4data.json;

import it.sinergis.map4data.answerObjects.KeyValue;

import java.util.ArrayList;

public class ParameterConfig {
	private String dbName;
	private String nameShow;
	private String kind;
	private String info;
	private ArrayList<KeyValue> values;
	private int style;
	
	public String getDbName() {
		return dbName;
	}
	
	public void setDbName(String dbName) {
		this.dbName = dbName;
	}
	
	public String getNameShow() {
		return nameShow;
	}
	
	public void setNameShow(String nameShow) {
		this.nameShow = nameShow;
	}
	
	public String getKind() {
		return kind;
	}
	
	public void setKind(String kind) {
		this.kind = kind;
	}
	
	public ArrayList<KeyValue> getValues() {
		return values;
	}
	
	public void setValues(ArrayList<KeyValue> values) {
		this.values = values;
	}
	
	public int getStyle() {
		return style;
	}
	
	public void setStyle(int style) {
		this.style = style;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}
	
	//private 
}
