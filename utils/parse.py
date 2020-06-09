from bs4 import BeautifulSoup
import datetime as DT
import json
import os
import sys 
import pandas as pd 

def get_yangs():
	full_data = []
	for name in os.listdir('js/data'):
		f = open("js/data/"+name, "r")
		soup = BeautifulSoup(f.read(), 'html.parser')
	
		list_header = ["drone","flight"] 
		for item in soup.find_all("thead")[0].find('tr').find_all('th'):
			list_header.append(item.get_text())
			print(list_header)

		
		for row in soup.find('tbody').find_all('tr'):
			try:
				sub_data = [name.split('-')[0],name.split('-')[1].split('.')[0]] 
				for data in row:
					print(data.get_text())
					sub_data.append(data.get_text())
				full_data.append(sub_data) 

			except:
				print('Error')

		full_data.append(sub_data) 
	
	dataFrame = pd.DataFrame(data = full_data, columns = list_header) 
	dataFrame.to_csv('all.csv') 



get_yangs()

