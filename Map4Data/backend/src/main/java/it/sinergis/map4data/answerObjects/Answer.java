package it.sinergis.map4data.answerObjects;

import it.sinergist.map4data.json.Layer;
import it.sinergist.map4data.json.ParameterConfig;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement
public class Answer {
	private boolean state;
	private String msg;
	private String wms;
	private String wfs;
	private String layer;
	private String srs;
	private String centerx;
	private String centery;
	private String zoom;
	private String pilot;
	private String geouser;
	private String geopsw;
	
	private String namespace;
	
	private String config;
	private String workspace;
	
	private String info;
	
	private ArrayList<ParameterConfig> listParameter;
	private ArrayList<Layer> layers;
	private ArrayList<Layer> layers_more;
	private ArrayList<KeyValue> styles;
	
	public boolean isState() {
		return state;
	}
	
	public void setState(boolean state) {
		this.state = state;
	}
	
	public String getMsg() {
		return msg;
	}
	
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public String getWms() {
		return wms;
	}
	
	public void setWms(String wms) {
		this.wms = wms;
	}
	
	public String getWfs() {
		return wfs;
	}
	
	public void setWfs(String wfs) {
		this.wfs = wfs;
	}
	
	public String getLayer() {
		return layer;
	}
	
	public void setLayer(String layer) {
		this.layer = layer;
	}
	
	public String getSrs() {
		return srs;
	}
	
	public void setSrs(String srs) {
		this.srs = srs;
	}
	
	public String getCenterx() {
		return centerx;
	}
	
	public void setCenterx(String centerx) {
		this.centerx = centerx;
	}
	
	public String getCentery() {
		return centery;
	}
	
	public void setCentery(String centery) {
		this.centery = centery;
	}
	
	public String getZoom() {
		return zoom;
	}
	
	public void setZoom(String zoom) {
		this.zoom = zoom;
	}
	
	public ArrayList<ParameterConfig> getListParameter() {
		return listParameter;
	}
	
	public void setListParameter(ArrayList<ParameterConfig> listParameter) {
		this.listParameter = listParameter;
	}
	
	public String getPilot() {
		return pilot;
	}
	
	public void setPilot(String pilot) {
		this.pilot = pilot;
	}
	
	public ArrayList<Layer> getLayers() {
		return layers;
	}
	
	public void setLayers(ArrayList<Layer> layers) {
		this.layers = layers;
	}
	
	public String getGeouser() {
		return geouser;
	}
	
	public void setGeouser(String geouser) {
		this.geouser = geouser;
	}
	
	public String getGeopsw() {
		return geopsw;
	}
	
	public void setGeopsw(String geopsw) {
		this.geopsw = geopsw;
	}
	
	@XmlTransient
	public String getConfig() {
		return config;
	}
	
	public void setConfig(String config) {
		this.config = config;
	}
	
	public String getWorkspace() {
		return workspace;
	}
	
	public void setWorkspace(String workspace) {
		this.workspace = workspace;
	}
	
	public String getNamespace() {
		return namespace;
	}
	
	public void setNamespace(String namespace) {
		this.namespace = namespace;
	}
	
	public ArrayList<Layer> getLayers_more() {
		return layers_more;
	}
	
	public void setLayers_more(ArrayList<Layer> layers_more) {
		this.layers_more = layers_more;
	}
	
	public String getInfo() {
		return info;
	}
	
	public void setInfo(String info) {
		this.info = info;
	}

	public ArrayList<KeyValue> getStyles() {
		return styles;
	}

	public void setStyles(ArrayList<KeyValue> styles) {
		this.styles = styles;
	}
	
}
