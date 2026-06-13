import { useRouter } from 'next/router';
import SEOHead from '../components/seo/SEOHead';
import { useAuth } from '../components/useAuth';
import { AuthCard } from '../components/AuthModal';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth();

  const rawRedirect = router.query.redirect || '/';
  const redirect = typeof rawRedirect === 'string' && rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/';

  if (user) {
    router.replace(redirect);
    return null;
  }

  const defaultTab = router.query.tab === 'signin' ? 'signin' : 'signup';

  return (
    <>
      <SEOHead
        title={`${defaultTab === 'signin' ? 'Sign In' : 'Create Account'} — Klick.stream`}
        description="Join Klick.stream free. Track films, save watchlists, and discover where to stream 50,000+ titles."
        url="/login"
      />
      <div className="login-page">
        <div className="login-bg" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="login-bg-orb" style={{ '--i': i }} />
          ))}
        </div>
        <AuthCard defaultTab={defaultTab} redirect={redirect} />
      </div>
    </>
  );
}
