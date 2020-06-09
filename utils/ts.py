import csv
from csv import reader
from dateutil import parser
import time 
import datetime 
rows=[] 
with open('all.csv', 'r') as read_obj:
	csv_reader = reader(read_obj)
	header = next(csv_reader)
	# Check file as empty
	if header != None:
		# Iterate over each row after the header in the csv
		for row in csv_reader:
			try:
				timestamp = datetime.datetime.timestamp(parser.parse(row[4])) 
				row.append(str(timestamp).split('.')[0])
				row.append(row[4].split(' ')[0])
				rows.append(row)
			except:
				print("error")

with open('ts_new.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    for r in rows:
    	writer.writerow(r)
