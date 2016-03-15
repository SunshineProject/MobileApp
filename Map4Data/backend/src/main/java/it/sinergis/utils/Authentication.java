package it.sinergis.utils;

import it.sinergis.map4data.answerObjects.Answer;
import it.sinergist.map4data.json.LoginAuthentication;
import it.sinergist.map4data.json.Users;
import it.sinergist.map4data.json.WFSTConfig;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import com.google.gson.Gson;

public class Authentication {
	
	public static Answer getAutentication(String url, String usr, String psw, String pilot) {
		Answer answer = new Answer();
		answer.setState(false);
		answer.setMsg("something go wrong");
		System.out.println("pilot:" + pilot);
		Gson gson = new Gson();
		
		try {
			
			BufferedReader br = new BufferedReader(new FileReader(url));
			
			//convert the json string back to object
			Users users = (Users) gson.fromJson(br, Users.class);
			System.out.println(users.getVersion());
			
			for (LoginAuthentication u : users.getUsers()) {
				if (u.getUser().trim().equalsIgnoreCase(usr)) {
					if (!u.getPsw().equals(psw)) {
						answer.setMsg("user name or password is wrong");
						System.out.println("user:" + usr + " sw :" + psw);
						return answer;
					}
					else {
						for (String p : u.getPilots()) {
							if (p.trim().equalsIgnoreCase(pilot)) {
								answer.setState(true);
								answer.setPilot(pilot.trim());
								return answer;
							}
						}
						answer.setMsg("you cannot use the pilot");
						return answer;
					}
				}
				
			}
			answer.setMsg("user name or password is wrong");
			
			//System.out.println(obj.getUs	ers().get(0).getUser() + "  " + obj.getUsers().get(0).getPsw() + "  "					+ obj.getUsers().get(0).getPilots());
			
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("eerorere");
		return answer;
	}
	
	public static Answer getConf(Answer answer, String baseUrl) {
		String pilot = answer.getPilot();
		String url = baseUrl + pilot + "_config.json";
		System.out.println(url + "");
		Gson gson = new Gson();
		try {
			
			BufferedReader br = new BufferedReader(new FileReader(url));
			Answer answer2 = (Answer) gson.fromJson(br, Answer.class);
			answer2.setState(true);
			answer2.setMsg("load");
			return answer2;
			
		}
		catch (IOException e) {
			e.printStackTrace();
			answer.setState(false);
			answer.setMsg("the pilot has not been added");
			return answer;
			
		}
	}
	
	public static Answer getConfParameter(Answer answer, String url) {
		//String pilot = answer.getPilot();
		//String url = baseUrl + pilot + "_config.json";
		Gson gson = new Gson();
		try {
			
			BufferedReader br = new BufferedReader(new FileReader(url));
			WFSTConfig wfst = (WFSTConfig) gson.fromJson(br, WFSTConfig.class);
			if (wfst == null) {
				answer.setState(false);
				answer.setMsg("problems config parameter");
			}
			else {
				answer.setListParameter(wfst.getConfigList());
			}
			return answer;
		}
		catch (IOException e) {
			e.printStackTrace();
			answer.setState(false);
			answer.setMsg("problems to conf");
			return answer;
			
		}
	}
	
}
