export const cmsRequest = async <Response>(query: string): Promise<Response> => {
    const response = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
        },
        body: JSON.stringify({
            query,
        }),
    });

    const responseBody = await response.json();
    
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(responseBody)}`);
    }

    return responseBody.data;
};
