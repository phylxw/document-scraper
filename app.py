'''
@Time:2025/4/7 18:09
@Auth:天才螺旋丸
@File:app.py
@IDE:PyCharm
'''
from flask import Flask, render_template, request, jsonify
from dblp_crawler import DBLPScraper

app = Flask(__name__)
scraper = DBLPScraper()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/search', methods=['POST'])
def search():
    name = request.json.get('name')
    url = scraper.search_scientist(name)
    if not url:
        return jsonify({'success': False, 'message': '科学家主页未找到'})

    publications,webs = scraper.get_publications(url)
    return jsonify({'success': True, 'publications': publications,'websites': webs})


if __name__ == '__main__':
    app.run(debug=True)
