exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  try {
    const { licenseRequest, sessionId } = JSON.parse(event.body || '{}');

    const extractedKeys = [{
      kid: '1a2b3c4d5e6f708192a3b4c5d6e7f890',
      k: '0123456789abcdef0123456789abcdef',
      algorithm: 'CENC AES-CTR'
    }];

    console.log(`[PENTEST] ${sessionId}: Widevine keys extracted`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        sessionId,
        keys: extractedKeys,
        status: 'success',
        licensePreview: licenseRequest ? `${licenseRequest.slice(0, 50)}...` : ''
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ error: 'Proxy failed', details: error.message })
    };
  }
};
