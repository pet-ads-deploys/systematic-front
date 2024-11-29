const getRequestOptions = () => {
    const token = localStorage.getItem('accessToken');
    const options = {
        headers: { Authorization: `Bearer ${ token }` }
    };

    return options;
}

export default getRequestOptions;