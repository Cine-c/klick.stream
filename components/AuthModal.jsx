import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/router';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AuthCard({ onClose, defaultTab, redirect }) {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState(defaultTab || 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function parseError(err) {
    const code = err?.code || '';
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) {
      return 'Invalid email or password.';
    }
    if (code.includes('email-already-in-use')) return 'That email is already registered. Try signing in.';
    if (code.includes('weak-password')) return 'Password must be at least 6 characters.';
    if (code.includes('invalid-email')) return 'Please enter a valid email address.';
    if (code.includes('too-many-requests')) return 'Too many attempts. Please try again later.';
    if (code.includes('network-request-failed')) return 'Connection error. Check your internet and try again.';
    return err?.message || 'Something went wrong. Please try again.';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (tab === 'signin') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onClose?.();
      router.push(redirect || '/');
    } catch (err) {
      setError(parseError(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError('');
    try {
      await signInWithGoogle();
      onClose?.();
      router.push(redirect || '/');
    } catch (err) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setError(parseError(err));
      }
    }
  }

  function switchTab(t) {
    setTab(t);
    setError('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className="amc">
      {onClose && (
        <button className="amc-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="amc-brand">
        <span className="amc-brand-k">K</span>lick<span className="amc-brand-dot">.</span>stream
      </div>

      <h2 className="amc-heading">
        {tab === 'signin' ? 'Welcome back' : 'Join free today'}
      </h2>
      <p className="amc-sub">
        {tab === 'signin'
          ? 'Sign in to your Klick.stream account'
          : 'Track films, save watchlists, go ad-free'}
      </p>

      <button className="amc-google" onClick={handleGoogle} type="button">
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="amc-divider"><span>or</span></div>

      {error && <div className="amc-error" role="alert">{error}</div>}

      <form onSubmit={handleSubmit} className="amc-form" noValidate>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="amc-input"
        />
        <input
          type="password"
          placeholder={tab === 'signin' ? 'Password' : 'Password (min 6 characters)'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
          className="amc-input"
        />
        <button type="submit" className="amc-submit" disabled={submitting}>
          {submitting
            ? <span className="amc-spinner" />
            : tab === 'signin' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <p className="amc-switch">
        {tab === 'signin' ? (
          <>No account?{' '}
            <button type="button" onClick={() => switchTab('signup')}>Create one free</button>
          </>
        ) : (
          <>Have an account?{' '}
            <button type="button" onClick={() => switchTab('signin')}>Sign in</button>
          </>
        )}
      </p>
    </div>
  );
}

export default function AuthModal({ onClose, defaultTab, redirect }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="am-overlay" onClick={onClose}>
      <div className="am-wrap" onClick={(e) => e.stopPropagation()}>
        <AuthCard onClose={onClose} defaultTab={defaultTab} redirect={redirect} />
      </div>
    </div>
  );
}

export { AuthCard };
