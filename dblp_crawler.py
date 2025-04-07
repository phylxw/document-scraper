'''
@Time:2025/4/7 17:17
@Auth:天才螺旋丸
@File:dblp_crawler.py.py
@IDE:PyCharm
'''
# dblp_scraper.py

import requests
from bs4 import BeautifulSoup

class DBLPScraper:
    def __init__(self):
        self.base_url = "https://dblp.org"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }

    def search_scientist(self, name):
        search_url = f"{self.base_url}/search?q={name.replace(' ', '%20')}"
        response = requests.get(search_url, headers=self.headers)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            link_tag = soup.find('a', {'itemprop': 'url'})
            if link_tag:
                return link_tag['href']
            else:
                print("未找到科学家主页链接。")
        else:
            print(f"搜索请求失败，状态码：{response.status_code}")
        return None

    def get_publications(self, profile_url):
        response = requests.get(profile_url, headers=self.headers)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            titles = soup.find_all('span', {'class': 'title', 'itemprop': 'name'})
            return [title.get_text(strip=True) for title in titles if title.get_text(strip=True)]
        else:
            print(f"请求失败，状态码：{response.status_code}")
            return []
