exports.handler = async (event) => {
  const data = JSON.parse(event.body);
  console.log(`[EME PENTEST] ${data.sessionId}:`, data.event, data.data);
  
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
    body: JSON.stringify({ hooked: true, event: data.event })
  };
};
