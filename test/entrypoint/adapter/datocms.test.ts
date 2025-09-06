import { datocmsRequest } from '@entrypoint/adapter/datocms';

const originalFetch = global.fetch;
const originalEnv = process.env;

describe('datocmsRequest', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    global.fetch = originalFetch;
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  describe('Given a valid API token', () => {
    const mockApiToken = 'test-api-token';
    const mockQuery = 'query { test { id } }';
    const mockResponseData = { test: { id: '123' } };

    beforeEach(() => {
      process.env.NEXT_DATOCMS_API_TOKEN = mockApiToken;
    });

    describe('When making a successful request', () => {
      beforeEach(() => {
        (global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          status: 200,
          statusText: 'OK',
          json: jest.fn().mockResolvedValue({ data: mockResponseData })
        });
      });

      it('Then should return the response data', async () => {
        const result = await datocmsRequest(mockQuery);
        
        expect(result).toEqual(mockResponseData);
      });

      it('Then should call fetch with correct parameters', async () => {
        await datocmsRequest(mockQuery);
        
        expect(global.fetch).toHaveBeenCalledWith('https://graphql.datocms.com/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${mockApiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: mockQuery }),
        });
      });

      it('Then should make only one fetch call', async () => {
        await datocmsRequest(mockQuery);
        
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });
    });

    describe('When the API returns an error', () => {
      const mockErrorResponse = { errors: [{ message: 'Invalid query' }] };

      beforeEach(() => {
        (global.fetch as jest.Mock).mockResolvedValue({
          ok: false,
          status: 400,
          statusText: 'Bad Request',
          json: jest.fn().mockResolvedValue(mockErrorResponse)
        });
      });

      it('Then should throw an error with status and response', async () => {
        await expect(datocmsRequest(mockQuery)).rejects.toThrow(
          '400 Bad Request: {"errors":[{"message":"Invalid query"}]}'
        );
      });

      it('Then should include the response body in error message', async () => {
        try {
          await datocmsRequest(mockQuery);
        } catch (error) {
          expect((error as Error).message).toContain(JSON.stringify(mockErrorResponse));
        }
      });
    });

    describe('When the fetch request fails', () => {
      const mockError = new Error('Network error');

      beforeEach(() => {
        (global.fetch as jest.Mock).mockRejectedValue(mockError);
      });

      it('Then should propagate the fetch error', async () => {
        await expect(datocmsRequest(mockQuery)).rejects.toThrow('Network error');
      });
    });
  });

  describe('Given no API token', () => {
    beforeEach(() => {
      delete process.env.NEXT_DATOCMS_API_TOKEN;
    });

    describe('When making a request', () => {
      it('Then should throw an error about missing token', async () => {
        await expect(datocmsRequest('query { test }')).rejects.toThrow(
          'NEXT_DATOCMS_API_TOKEN environment variable is required'
        );
      });

      it('Then should not make any fetch calls', async () => {
        try {
          await datocmsRequest('query { test }');
        } catch (error) {
          expect(global.fetch).not.toHaveBeenCalled();
        }
      });
    });
  });

  describe('Given an empty API token', () => {
    beforeEach(() => {
      process.env.NEXT_DATOCMS_API_TOKEN = '';
    });

    describe('When making a request', () => {
      it('Then should throw an error about missing token', async () => {
        await expect(datocmsRequest('query { test }')).rejects.toThrow(
          'NEXT_DATOCMS_API_TOKEN environment variable is required'
        );
      });
    });
  });

  describe('Given different query types', () => {
    const mockApiToken = 'test-api-token';

    beforeEach(() => {
      process.env.NEXT_DATOCMS_API_TOKEN = mockApiToken;
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue({ data: {} })
      });
    });

    describe('When making requests with different queries', () => {
      it('Then should handle simple queries', async () => {
        const simpleQuery = 'query { profile { id } }';
        
        await datocmsRequest(simpleQuery);
        
        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            body: JSON.stringify({ query: simpleQuery })
          })
        );
      });

      it('Then should handle complex queries with variables', async () => {
        const complexQuery = `
          query GetProject($id: String!) {
            project(filter: {id: {eq: $id}}) {
              id
              name
            }
          }
        `;
        
        await datocmsRequest(complexQuery);
        
        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            body: JSON.stringify({ query: complexQuery })
          })
        );
      });

      it('Then should handle queries with fragments', async () => {
        const queryWithFragment = `
          fragment ProjectInfo on Project {
            id
            name
          }
          query {
            allProjects {
              ...ProjectInfo
            }
          }
        `;
        
        await datocmsRequest(queryWithFragment);
        
        expect(global.fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            body: JSON.stringify({ query: queryWithFragment })
          })
        );
      });
    });
  });
});
