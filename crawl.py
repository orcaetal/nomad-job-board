
# import get to call a get request on the site
from requests import get
from bs4 import BeautifulSoup
from datetime import date
import json
import re

urlList = ['https://santafe.craigslist.org/search/ggg?is_paid=all&postedToday=1&bundleDuplicates=1',
            'https://lasvegas.craigslist.org/search/ggg?is_paid=all&postedToday=1&bundleDuplicates=1',
            'https://seattle.craigslist.org/search/ggg?is_paid=all&postedToday=1&bundleDuplicates=1',
            'https://eugene.craigslist.org/search/ggg?is_paid=all&postedToday=1&bundleDuplicates=1',
            'https://montgomery.craigslist.org/search/ggg?is_paid=all&postedToday=1&bundleDuplicates=1',
            'https://tampa.craigslist.org/search/ggg?is_paid=all&postedToday=1&bundleDuplicates=1',
            'https://newyork.craigslist.org/search/ggg?is_paid=all&postedToday=1&bundleDuplicates=1',
            'https://vermont.craigslist.org/search/ggg?is_paid=all&postedToday=1&bundleDuplicates=1'
            ]
allJobs = []
masterJobDict = {}
masterJobList = []
jobCounter = 0
for cities in urlList:
    if re.search('.*santafe.*',cities):
        city = 'Santa Fe, NM'
        region = 'SW'
    if re.search('.*lasvegas.*',cities):
        city = 'Las Vegas, NV'
        region = 'SW'
    if re.search('.*seattle.*',cities):
        city = 'Seattle, WA'
        region = 'NW'
    if re.search('.*eugene.*',cities):
        city = 'Eugene, OR'
        region = 'NW'
    if re.search('.*montgomery.*',cities):
        city = 'Montgomery, AL'
        region = 'SE'
    if re.search('.*tampa.*',cities):
        city = 'Tampa, FL'
        region = 'SE'
    if re.search('.*newyork.*',cities):
        city = 'New York City, NY'
        region = 'NE'
    if re.search('.*vermont.*',cities):
        city = 'Burlington, VT'
        region = 'NE'

    #get the first page of jobs
    response = get(cities) 

    html_soup = BeautifulSoup(response.text, 'html.parser')

    #get the conatiner for job posts
    posts = html_soup.find_all('li', class_= 'result-row')

    maxJobs = 10
    counter = 0
    for post in posts:
        if counter < maxJobs:
            #grab title and link from craigslist
            post_title = post.find('a', class_='result-title hdrlnk')
            post_link = post_title['href']
            post_title_text = post_title.text

            post_date = post.find('time', class_='result-date')
            post_date_frmt = str(post_date['datetime'])[:-5]
            
            subResponse = get(post_link)

            #navigate to posting to fetch description
            sub_soup = BeautifulSoup(subResponse.text, 'html.parser')
            post_desc = sub_soup.find('section', {'id':'postingbody'})
            #print(cities,post_title)
            #print('desc',post_desc)
            post_body = post_desc.text
            thisJob = {
                        "datePosted":post_date_frmt,
                        "region":region,
                        "city":city,
                        "jobTitle": post_title_text,
                        "jobDesc": post_body,
                        "link": post_link
                }
            allJobs.append(thisJob)
            masterJobDict['job'+str(jobCounter)] = thisJob
            masterJobList.append(thisJob)
            counter=counter+1
            jobCounter = jobCounter + 1

# with open('jobs.txt','w+') as outFile:
#     for job in allJobs:
#         json.dump(job,outFile)

# with open('jobs.json','w+') as outFile2:
#     json.dump(masterJobDict,outFile2)

with open('jobsList.txt','w+', encoding="utf-8") as outFile3:
    json.dump(masterJobList,outFile3)