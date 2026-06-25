import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // Mockup validation
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin();
        navigate('/');
      } else {
        setError(true);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: "url('./Video-Llanos-34.jpg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay oscuro para asegurar contraste con la tarjeta de vidrio */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Decorative background elements (optional, to mimic the cloud depth of the reference) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/20 blur-3xl pointer-events-none"></div>


      {/* Glassmorphism Login Card */}
      <div className="relative z-10 w-full max-w-md p-10 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col items-center mb-8">
          <img src="./Logo GEOPARK_200.png" alt="GeoPark Logo" className="h-[60px] w-auto object-contain mb-6 drop-shadow-sm" />
          <h2 className="text-2xl font-bold text-[var(--foreground)] tracking-tight">Iniciar Sesión</h2>
          <p className="text-sm text-gray-800 font-medium mt-2 text-center">
            Gestión inteligente de energía
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-[var(--muted-foreground)]" />
              </div>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--secondary)]/50 border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[#C41230]/30 focus:border-[#C41230] transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-[var(--muted-foreground)]" />
              </div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--secondary)]/50 border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[#C41230]/30 focus:border-[#C41230] transition-all"
                required
              />
            </div>
            {error && (
              <p className="text-[#C41230] text-xs font-medium mt-2 ml-1 animate-pulse">
                Usuario o contraseña incorrectos.
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#C41230] hover:bg-[#a00f27] text-white font-medium rounded-xl shadow-md transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verificando...
                </>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
