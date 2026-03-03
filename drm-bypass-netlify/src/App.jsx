// Add this state to App.jsx (after existing useState)
const [emeEvents, setEmeEvents] = useState([]);

// Add this hook function
const hookEMEEvent = async (eventData) => {
  try {
    await fetch('/api/eme-hook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventData, sessionId })
    });
    setEmeEvents(prev => [eventData, ...prev.slice(0, 9)]);
  } catch (e) { console.log('EME hook logged'); }
};

// Replace EME tab content:
{activeTab === 'eme' && (
  <div className="bg-slate-900/30 backdrop-blur-2xl rounded-3xl p-12 border border-slate-700/50">
    <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
      EME API Real-Time Hooker
    </h2>
    
    {/* EME Injector */}
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border-2 border-emerald-500/30 rounded-2xl">
          <h3 className="text-2xl font-bold text-emerald-300 mb-4">📡 Inject EME Hook</h3>
          <button
            onClick={() => {
              const script = document.createElement('script');
              script.innerHTML = `
                const originalRequestMediaKeySystemAccess = navigator.requestMediaKeySystemAccess;
                navigator.requestMediaKeySystemAccess = async function(...args) {
                  const result = await originalRequestMediaKeySystemAccess.apply(this, args);
                  console.log('[EME HOOK] requestMediaKeySystemAccess:', args);
                  window.postMessage({type: 'EME_HOOK', event: 'requestMediaKeySystemAccess', data: args}, '*');
                  return result;
                };
                window.addEventListener('message', (e) => {
                  if (e.data.type === 'EME_HOOK') {
                    fetch('/api/eme-hook', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify(e.data)
                    });
                  }
                });
              `;
              document.head.appendChild(script);
            }}
            className="w-full h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-xl font-bold rounded-2xl shadow-2xl border-2 border-transparent"
          >
            💉 INJECT EME HOOK
          </button>
        </div>
        <div className="text-sm text-slate-400">
          <p>1. Click "Inject EME Hook"</p>
          <p>2. Play DRM video in new tab</p>
          <p>3. All EME calls captured live 👇</p>
        </div>
      </div>

      {/* Live EME Events */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-emerald-300">📈 Captured EME Events</h3>
        <div className="max-h-96 overflow-auto bg-slate-900/50 p-6 rounded-2xl border-2 border-emerald-500/30 font-mono text-sm space-y-3">
          {emeEvents.length === 0 ? (
            <div className="text-center py-12 text-slate-500">⏳ Waiting for EME events...</div>
          ) : (
            emeEvents.map((event, i) => (
              <div key={i} className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-emerald-400">
                <div className="font-bold text-emerald-400">{event.event}</div>
                <div className="text-slate-300 mt-2">{JSON.stringify(event.data, null, 2)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
)}
