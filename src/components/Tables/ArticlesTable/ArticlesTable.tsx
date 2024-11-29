
import ArticlesInterface from '../../../../public/interfaces/ArticleInterface';
import AppContext from "../../Context/AppContext";
import { useContext } from "react";
import Collapsed from "./Collapsed";
import Expanded from "./Expanded";

interface Props {
    articles: ArticlesInterface[]
}

function ArticlesTable({articles}: Props) {
    const context = useContext(AppContext);
    if(!context) {
        throw new Error('Failed to get the context on articles table');
    }
    const { sidebarState } = context

    return sidebarState == 'open' ?
    
    <Collapsed articles={articles} />

    :

    <Expanded articles={articles} />
}

export default ArticlesTable;