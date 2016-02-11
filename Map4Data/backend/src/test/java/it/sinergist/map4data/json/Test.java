package it.sinergist.map4data.json;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import com.google.gson.Gson;

public class Test {
	public static void main(String args[]) {
		Gson gson = new Gson();
		
		try {
			
			BufferedReader br = new BufferedReader(new FileReader("C:\\tmp\\confwfst.json"));
			
			//convert the json string back to object
			WFSTConfig obj = (WFSTConfig) gson.fromJson(br, WFSTConfig.class);
			System.out.println(obj.getConfigList().get(0).getNameShow());
			
			//System.out.println(obj.getUs	ers().get(0).getUser() + "  " + obj.getUsers().get(0).getPsw() + "  "					+ obj.getUsers().get(0).getPilots());
			
		}
		catch (IOException e) {
			e.printStackTrace();
		}
	}
}
