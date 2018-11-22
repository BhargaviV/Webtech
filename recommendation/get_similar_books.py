import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json

df = pd.read_excel("E:/Engineering/7th_sem/WT2/Project/Webtech/db/books_data.xlsx")

def item(id):
    return df.loc[df['book_id'] == id]['book_name'].tolist()[0]

def get_cos_similarity(df):
    tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
    tfidf_matrix = tf.fit_transform(df['book_name'].values.astype('U'))
    cosine_similarities = cosine_similarity(tfidf_matrix,tfidf_matrix)
    return cosine_similarities

def get_similar_items(df):
    cosine_similarities = get_cos_similarity(df)
    results = {} 
    for idx, row in df.iterrows(): 
        similar_indices = cosine_similarities[idx].argsort()[:-5:-1] 
        similar_items = [(cosine_similarities[idx][i], df['book_id'][i]) for i in similar_indices]
        results[row['book_id']] = similar_items[1:]
    return results


def recommend(id, num):
    results =  get_similar_items(df)
    recs = results[id][:num]
    recommendations = []
    for rec in recs:
        #recommendations += str(item(rec[1]))
        recommendations.append(item(rec[1]))
    print(recommendations)
    sys.stdout.flush()

recommend(int(sys.argv[1]),int(sys.argv[2]))