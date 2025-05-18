from flask import Flask, request, jsonify
from newspaper import Article
from konlpy.tag import Kkma, Okt
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.preprocessing import normalize
import numpy as np

# Step 1. 문장 분리 및 명사 추출
class SentenceTokenizer(object):
    def __init__(self):
        self.kkma = Kkma()
        self.okt = Okt()
        self.stopwords = [
            '중인', '만큼', '마찬가지', '꼬집었', "연합뉴스", "데일리", "동아일보", "중앙일보", "조선일보", "기자",
            "아", "휴", "아이구", "아이쿠", "아이고", "어", "나", "우리", "저희", "따라", "의해", "을", "를", "에", "의", "가"
        ]

    def url2sentences(self, url):
        article = Article(url, language='ko')
        article.download()
        article.parse()
        sentences = self.kkma.sentences(article.text)
        return self._clean_short_sentences(sentences)

    def text2sentences(self, text):
        sentences = self.kkma.sentences(text)
        return self._clean_short_sentences(sentences)

    def _clean_short_sentences(self, sentences):
        for idx in range(1, len(sentences)):
            if len(sentences[idx]) <= 10:
                sentences[idx - 1] += ' ' + sentences[idx]
                sentences[idx] = ''
        return [s for s in sentences if s]

    def get_nouns(self, sentences):
        nouns = []
        for sentence in sentences:
            noun_list = self.okt.nouns(sentence)
            filtered = [noun for noun in noun_list if noun not in self.stopwords and len(noun) > 1]
            nouns.append(' '.join(filtered))
        return nouns

# Step 2. TF-IDF와 그래프 생성
class GraphMatrix(object):
    def __init__(self):
        self.tfidf = TfidfVectorizer()
        self.count_vectorizer = CountVectorizer()
        self.graph_sentence = []

    def build_sent_graph(self, sentences):
        tfidf_matrix = self.tfidf.fit_transform(sentences).toarray()
        self.graph_sentence = np.dot(tfidf_matrix, tfidf_matrix.T)
        return self.graph_sentence

    def build_words_graph(self, sentences):
        cnt_matrix = normalize(self.count_vectorizer.fit_transform(sentences).toarray().astype(float), axis=0)
        vocab = self.count_vectorizer.vocabulary_
        return np.dot(cnt_matrix.T, cnt_matrix), {vocab[word]: word for word in vocab}

# Step 3. TextRank 알고리즘
class Rank(object):
    def get_ranks(self, graph, d=0.85):
        A = graph.copy()
        matrix_size = A.shape[0]
        for i in range(matrix_size):
            A[i, i] = 0
            col_sum = np.sum(A[:, i])
            if col_sum != 0:
                A[:, i] /= col_sum
            A[:, i] *= -d
            A[i, i] = 1

        B = (1 - d) * np.ones((matrix_size, 1))
        ranks = np.linalg.solve(A, B)
        return {idx: rank[0] for idx, rank in enumerate(ranks)}

# Step 4. TextRank 클래스 조합
class TextRank(object):
    def __init__(self, text=None, url=None):
        self.sent_tokenizer = SentenceTokenizer()
        if url:
            self.sentences = self.sent_tokenizer.url2sentences(url)
        elif text:
            self.sentences = self.sent_tokenizer.text2sentences(text)
        else:
            raise ValueError("text 또는 url 중 하나를 입력해야 합니다.")

        self.nouns = self.sent_tokenizer.get_nouns(self.sentences)
        self.graph_matrix = GraphMatrix()
        self.sent_graph = self.graph_matrix.build_sent_graph(self.nouns)
        self.word_graph, self.idx2word = self.graph_matrix.build_words_graph(self.nouns)
        self.rank = Rank()
        self.sent_rank = self.rank.get_ranks(self.sent_graph)
        self.word_rank = self.rank.get_ranks(self.word_graph)

    def summarize(self, sent_num=3):
        top_sentences = sorted(self.sent_rank, key=lambda x: self.sent_rank[x], reverse=True)[:sent_num]
        top_sentences = sorted(top_sentences)  # 문서 순서 유지
        return [self.sentences[idx] for idx in top_sentences]

    def keywords(self, word_num=10):
        sorted_words = sorted(self.word_rank, key=lambda x: self.word_rank[x], reverse=True)[:word_num]
        return [self.idx2word[idx] for idx in sorted_words]

# Flask 서버 부분
app = Flask(__name__)

@app.route('/')
def home():
    return "TextRank Summarization API is running."

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', None)
    url = data.get('url', None)

    if not text and not url:
        return jsonify({'error': 'text 또는 url을 입력해주세요.'}), 400

    try:
        tr = TextRank(text=text, url=url)
        summary = tr.summarize(sent_num=3)
        keywords = tr.keywords(word_num=10)
        return jsonify({'summary': summary, 'keywords': keywords})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
