import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('widevine');
  const [sessionId] = useState(() => `pentest-${crypto.randomUUID().slice(0,8)}`);
  const [keys, setKeys] = useState([]);
  const [licenseRequest, setLicenseRequest] = useState('');
  const [status, setStatus] = useState('idle');

  const proxyWidevineLicense = async () => {
    setStatus('intercepting');
    try {
      const res = await fetch('/api/widevine-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseRequest, sessionId })
      });
      const data = await res.json();
      setKeys(data.keys || []);
      setStatus('success');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            DRM Bypass
          </h1>
          <p className="text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Authorized Pentest Platform - Widevine L3 Key Extraction
          </p>
          <div className="inline-flex items-center gap-3 bg-slate-900/50 backdrop-blur-xl px-6 py-3 rounded-2xl border border-slate-700 shadow-2xl">
            <span className="text-sm text-slate-400">Session:</span>
            <code className="font-mono bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold text-blue-400 border border-blue-500/30">
              {sessionId}
            </code>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { id: 'widevine', title: 'Widevine L3', desc: 'License Proxy', color: 'from-blue-500 to-blue-600' },
            { id: 'eme', title: 'EME Hook', desc: 'API Capture', color: 'from-emerald-500 to-emerald-600' },
            { id: 'fingerprint', title: 'Fingerprint', desc: 'Spoofing', color: 'from-purple-500 to-purple-600' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group p-8 rounded-3xl transition-all border-2 hover:scale-[1.02] shadow-xl ${
                activeTab === tab.id
                  ? `bg-gradient-to-br ${tab.color} shadow-2xl border-transparent`
                  : 'bg-slate-900/30 border-slate-700/50 hover:border-slate-600 hover:bg-slate-900/50'
              }`}
            >
              <h3 className="text-2xl font-bold mb-3">{tab.title}</h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition">{tab.desc}</p>
            </button>
          ))}
        </div>

        {activeTab === 'widevine' && (
          <div className="bg-slate-900/30 backdrop-blur-2xl rounded-3xl p-12 border border-slate-700/50 shadow-2xl">
            <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Widevine L3 License Interceptor
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <label className="block text-xl font-semibold mb-4 text-slate-300">
                  License Request (Base64)
                </label>
                <textarea
                  value={licenseRequest}
                  onChange={e => setLicenseRequest(e.target.value)}
                  placeholder="VGhpcyBpcyBhIHNhbXBsZSBXaWRldmluZSBsaWNlbnNlIHJlcXVlc3QgYmFzZTY0Li4u (From DevTools)"
                  className="w-full h-40 p-6 bg-slate-800/50 border-2 border-slate-600 rounded-2xl resize-vertical focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-mono text-sm"
                />
                <button
                  onClick={proxyWidevineLicense}
                  disabled={status === 'intercepting'}
                  className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-xl font-bold rounded-2xl shadow-2xl border-2 transition-all flex items-center justify-center gap-3"
                >
                  {status === 'intercepting' ? (
                    <>
                      <div className="w-8 h-8 border-4 border-current border-t-transparent rounded-full animate-spin" />
                      Intercepting...
                    </>
                  ) : (
                    '🚀 EXTRACT WIDEVINE KEYS NOW'
                  )}
                </button>
              </div>

              <div className="space-y-8">
                <div className="p-8 bg-slate-800/50 rounded-2xl border-2 border-slate-600">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">📊 Status</h3>
                  <div className={`p-6 rounded-2xl font-mono text-lg font-bold text-center transition-all ${
                    status === 'success' ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-emerald-500/25 shadow-2xl' :
                    status === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-300' :
                    'bg-slate-700/50 border-slate-600 text-slate-400'
                  }`}>
                    {status === 'success' ? '✅ KEYS EXTRACTED SUCCESSFULLY' :
                     status === 'error' ? '❌ INTERCEPT FAILED' : '⏳ READY FOR BYPASS'}
                  </div>
                </div>

                {keys.length > 0 && (
                  <div className="p-8 bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 border-2 border-emerald-500/40 rounded-3xl shadow-2xl">
                    <h3 className="text-3xl font-black mb-8 flex items-center gap-4 text-emerald-300">
                      🔓 LIVE KEY EXTRACTION
                    </h3>
                    {keys.map((key, i) => (
                      <div key={i} className="bg-slate-900/50 p-6 rounded-2xl mb-6 border-l-4 border-emerald-400 hover:bg-slate-900/70 transition-all">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div>
                            <span className="text-sm font-mono text-emerald-400 block mb-2">Key ID:</span>
                            <code className="block font-mono bg-emerald-500/20 px-4 py-2 rounded-xl text-emerald-300 font-medium">
                              {key.kid}
                            </code>
                          </div>
                          <div>
                            <span className="text-sm font-mono text-emerald-400 block mb-2">Content Key:</span>
                            <code className="block font-mono bg-slate-900/80 px-4 py-2 rounded-xl text-sm break-all text-slate-200">
                              {key.k}
                            </code>
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm text-slate-400">
                          <span>Algo:</span>
                          <code className="bg-slate-700 px-3 py-1 rounded-full text-xs">{key.algorithm}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
