import json

f=open("Las Vegas.json")
bus=json.loads(f.read())
res="["
for item in bus:
	#print(item['business_id'])
	try:
		if "Restaurant" in item['categories'] or "Food" in item['categories']:
			cur="{\"name\": \""+item['name']+"\", \"business_id\": \""+item['business_id']+"\", \"longitude\": "+str(item['longitude'])+", \"latitude\": "+str(item['latitude'])+", \"address\": \""+item['address']+"\", \"stars\": "+str(item['stars'])+"},\n"
			print(cur)
			res=res+cur
	except:
		continue
		#print(item)
w=open("res.json", "w")
w.write(res)
