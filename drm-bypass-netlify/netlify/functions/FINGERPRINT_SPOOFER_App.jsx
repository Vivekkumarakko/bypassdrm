// Add to fingerprint tab:
{activeTab === 'fingerprint' && (
  <div className="bg-slate-900/30 backdrop-blur-2xl rounded-3xl p-12 border border-slate-700/50">
    <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
      Browser Fingerprint Spoofer
    </h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { name: 'Canvas', action: 'spoofCanvas()' },
        { name: 'WebGL', action: 'spoofWebGL()' },
        { name: 'Audio', action: 'spoofAudioContext()' },
        { name: 'Hardware', action: 'spoofHardware()' },
        { name: 'Fonts', action: 'randomizeFonts()' },
        { name: 'User-Agent', action: 'rotateUA()' }
      ].map((item, i) => (
        <button
          key={i}
          onClick={() => eval(item.action)} // DANGER: Pentest only
          className="h-32 p-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 hover:from-purple-500/40 border-2 border-purple-500/30 rounded-2xl font-bold hover:scale-105 transition-all group"
        >
          <div className="text-2xl mb-3 opacity-75 group-hover:opacity-100">{item.name}</div>
          <div className="text-purple-300 text-sm">Spoof →</div>
        </button>
      ))}
    </div>
    
    {/* LIVE Fingerprint */}
    <div className="mt-12 p-8 bg-gradient-to-r from-purple-900/50 to-slate-900/50 border-2 border-purple-500/30 rounded-3xl">
      <h3 className="text-2xl font-bold mb-6 text-purple-300">🕵️ Live Fingerprint Hash</h3>
      <code id="fingerprint-hash" className="block w-full p-6 bg-slate-900 rounded-xl font-mono text-lg break-all">
        Click any spoof button...
      </code>
    </div>
  </div>
)}
