import json

f1=open("Las Vegas.json")
tmp=json.loads(f1.read())
dic={}
for item in tmp:
	dic[item['business_id']]=[0,0,0,0,0,0]


f=open("Las Vegas_reviews.json")
bus=json.loads(f.read())
for item in bus:
	if item['business_id'] in dic:
		#file=open("data/"+item['business_id']+".csv")
		dic[item['business_id']][item['stars']]=dic[item['business_id']][item['stars']]+1
for item in dic:
	file=open("data/"+item+".csv","w")
	file.write("star,count")
	for i in range(5):
		file.write("\nstar-"+str(i+1)+","+str(dic[item][i+1]))
	
