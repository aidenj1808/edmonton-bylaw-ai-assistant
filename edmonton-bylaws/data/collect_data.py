import requests
from bs4 import BeautifulSoup
from time import sleep


urls = []
endpoint_letters = ["a", "b", "c", "d", "e", "f", "gh", "ijk", "l", "mn", "o",
                    "p", "qr", "s", "t", "uvw", "xyz"]
endpoints = ["bylaws-" + endpoint_letter for endpoint_letter in endpoint_letters]
url_start = "https://www.edmonton.ca/city_government/bylaws/"

for endpoint in endpoints:
    url = url_start + endpoint
    html = requests.get(url)
    soup = BeautifulSoup(html.text, "html.parser")
    links = soup.find_all("a")

    print(f"Downloading {url} PDF Documents...")
    for link in links:
        if ".pdf" in link.get("href", []):
            filename = link.text.replace("(", "").replace(")", "")
            filename = filename.replace(",", "").replace(".", "").replace("/", "")
            filename = "_".join(filename.replace("-", "").strip("_").split())
            filename += ".pdf"
            
            pdf_url = link.get("href")
            if not pdf_url.startswith("https"):
                pdf_url = "https://www.edmonton.ca" + pdf_url
            response = requests.get(pdf_url)
            with open(filename, "wb") as file:
                file.write(response.content)
    sleep(5)




