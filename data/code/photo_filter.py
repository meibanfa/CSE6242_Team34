import json
import glob, os
from sets import Set;
from shutil import copyfile

f=open("Las Vegas.json")
bus=json.loads(f.read())
s=Set()
for item in bus:
	s.add(item['business_id'])
f.close()

pic=Set()
for item in s: 
	f=open("photo/"+item, "r")
	f.readline()
	cnt=0
	photos=f.readlines()
	for p in photos:
		if len(p)>10:
			pic.add(p.replace("\n", "")+".jpg")
			cnt=cnt+1
		if cnt==2:
			break
print len(pic)
os.chdir("./yelp_photos/yelp_academic_dataset_photos")
for file in glob.glob("*.jpg"):
	if file in pic:
		f="../../real_photo/"+file
		copyfile(file, f)
		#print file
