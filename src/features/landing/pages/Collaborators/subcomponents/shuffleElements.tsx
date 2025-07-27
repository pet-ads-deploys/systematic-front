interface collabsCardProps {
    name: string;
    photo: string;
    github: string;
    filiacao: string
}

export default function shuffleElements(elemensList: [] | collabsCardProps[]) {
    for (let i = elemensList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [elemensList[i], elemensList[j]] = [elemensList[j], elemensList[i]];
    }
    return elemensList;
}