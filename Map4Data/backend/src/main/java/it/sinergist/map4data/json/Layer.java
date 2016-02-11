package it.sinergist.map4data.json;

public class Layer {
	private String name;
	private String wms;
	private String layer;
	private String type;
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getWms() {
		return wms;
	}
	
	public void setWms(String wms) {
		this.wms = wms;
	}
	
	public String getLayer() {
		return layer;
	}
	
	public void setLayer(String layer) {
		this.layer = layer;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
