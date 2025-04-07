'''
@Time:2025/4/7 17:18
@Auth:天才螺旋丸
@File:main.py
@IDE:PyCharm
'''
import requests
from bs4 import BeautifulSoup

# main.py

from dblp_crawler import DBLPScraper

def main():
    name = "Ya-Qin Zhang"
    scraper = DBLPScraper()

    print(f"正在搜索科学家：{name}")
    profile_url = scraper.search_scientist(name)

    if profile_url:
        print(f"找到个人主页：{profile_url}")
        publications = scraper.get_publications(profile_url)
        print("\n文献标题列表：")
        for idx, title in enumerate(publications, 1):
            print(f"{idx}. {title}")
    else:
        print("未能找到科学家的主页或文献。")

if __name__ == "__main__":
    main()
