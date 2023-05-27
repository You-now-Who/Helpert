import requests

url = "https://ipeds.emsicloud.com/institutions/zip/42303"

headers = {'Authorization': 'Bearer <access_token>'}

response = requests.request("GET", url, headers=headers)

print(response.text)