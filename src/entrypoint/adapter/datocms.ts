export async function datocmsRequest<T>(query: string): Promise<T> {
  const apiToken = process.env.NEXT_DATOCMS_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('NEXT_DATOCMS_API_TOKEN environment variable is required');
  }

  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(responseBody)}`);
  }

  return responseBody.data;
}
