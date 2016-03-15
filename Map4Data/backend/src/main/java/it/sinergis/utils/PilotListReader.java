package it.sinergis.utils;

import it.sinergist.map4data.json.PilotList;
import it.sinergist.map4data.json.PilotValue;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;

import com.google.gson.Gson;

public class PilotListReader {
	public static PilotList getPilots(String url) {
		BufferedReader br;
		try {
			br = new BufferedReader(new FileReader(url));
		}
		catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		Gson gson = new Gson();
		//convert the json string back to object
		PilotList lista = (PilotList) gson.fromJson(br, PilotList.class);
		return lista;
	}
	
	public static void main(String args[]) {
		String base = "C:\\tmpmap4data\\";
		PilotList p = getPilots(base + "pilots.json");
		
		for (PilotValue pv : p.getPilots()) {
			System.out.println(pv.getName());
			System.out.println(pv.getShow());
		}
	}
	
}
