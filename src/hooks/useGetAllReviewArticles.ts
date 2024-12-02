import { useEffect, useState } from 'react';
import ArticleInterface from '../../public/interfaces/ArticleInterface';
import axios from '../interceptor/interceptor';
import { StudyInterface } from '../../public/interfaces/IStudy';
import getRequestOptions from '../utils/getRequestOptions';

const useGetAllReviewArticles = (reload: boolean) => {
    const id = localStorage.getItem('systematicReviewId');
    const path = `http://localhost:8080/api/v1/systematic-study/${id}/study-review`;
    const options = getRequestOptions();
    const [articles, setArticles] = useState<ArticleInterface[] | StudyInterface[]>([]);
  
    useEffect(() => {
      console.log("useGetAllReviewArticles carregando artigos, reload:", reload);
      
      axios.get(path, options)
        .then(res => {
          console.log("Dados recebidos:", res.data.studyReviews);
          setArticles(res.data.studyReviews || []);
        })
        .catch(error => {
          console.error('Falha ao buscar estudos:', error);
          setArticles([]); // Limpar artigos em caso de erro
        });
    }, [reload, path]);
  
    return articles;
}

export default useGetAllReviewArticles;