import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SEOHead from '../components/seo/SEOHead';
import Link from 'next/link';
import { useAuth } from '../components/useAuth';
import { useWatchLater } from '../components/WatchLaterContext';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = useAuth();
  const { items } = useWatchLater();
  const [sub, setSub] = useState(null);
  const [subLoading, setSubLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?redirect=/account');
    }
  }, [authLoading, user, router]);

  // Fetch subscription data
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    async function fetchSub() {
      try {
        const { getFirestore, doc, getDoc } = await import('firebase/firestore');
        const { getApps } = await import('firebase/app');
        const app = getApps()[0];
        const db = getFirestore(app);

        const snap = await getDoc(doc(db, 'users', user.uid));
        if (cancelled) return;
        if (snap.exists()) {
          setSub(snap.data());
        }
      } catch (err) {
        console.error('Failed to fetch subscription:', err);
      } finally {
        if (!cancelled) setSubLoading(false);
      }
    }

    fetchSub();
    return () => { cancelled = true; };
  }, [user]);

  async function handleManageSubscription() {
    if (!user) return;
    setPortalLoading(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch('/api/lemonsqueezy/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch {
      alert('Failed to open billing portal.');
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  if (authLoading || !user) {
    return null;
  }

  const isActive = sub?.subscriptionStatus === 'active'
    && sub?.currentPeriodEnd > Math.floor(Date.now() / 1000);

  const nextBillingDate = sub?.currentPeriodEnd
    ? new Date(sub.currentPeriodEnd * 1000).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  const joinDate = user.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null;
  const watchCount = items?.length || 0;
  const initial = (user.displayName || user.email || '?').trim().charAt(0).toUpperCase();

  return (
    <>
      <SEOHead
        title="Account - Klick.stream"
        description="Manage your Klick.stream account and subscription."
        url="/account"
      />

      <div className="account-page">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.photoURL
              ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
              : <span>{initial}</span>}
          </div>
          <div className="profile-id">
            <div className="profile-name">
              {user.displayName || 'Film Fan'}
              {isActive && <span className="profile-badge">★ Premium</span>}
            </div>
            <div className="profile-email">{user.email}</div>
            <div className="profile-meta">
              {joinDate && <span>Member since {joinDate}</span>}
              <span>{watchCount} in watchlist</span>
            </div>
          </div>
        </div>

        <div className="profile-quicklinks">
          <Link href="/watchlater" className="profile-quicklink">
            <span className="profile-quicklink-num">{watchCount}</span>
            <span className="profile-quicklink-label">Watchlist</span>
          </Link>
          <Link href="/premium" className="profile-quicklink">
            <span className="profile-quicklink-num">{isActive ? '★' : '☆'}</span>
            <span className="profile-quicklink-label">{isActive ? 'Premium' : 'Go Premium'}</span>
          </Link>
        </div>

        <div className="account-section">
          <h2>Subscription</h2>
          {subLoading ? (
            <p className="account-muted">Loading subscription details...</p>
          ) : isActive ? (
            <>
              <div className="account-detail">
                <span className="account-label">Status</span>
                <span className="account-status-active">Active</span>
              </div>
              <div className="account-detail">
                <span className="account-label">Plan</span>
                <span>{sub.planInterval === 'year' ? 'Yearly' : 'Monthly'}</span>
              </div>
              {nextBillingDate && (
                <div className="account-detail">
                  <span className="account-label">Next billing date</span>
                  <span>{nextBillingDate}</span>
                </div>
              )}
              <button
                className="btn btn-secondary account-btn"
                onClick={handleManageSubscription}
                disabled={portalLoading}
              >
                {portalLoading ? 'Loading...' : 'Manage Subscription'}
              </button>
            </>
          ) : (
            <>
              <p className="account-muted">
                {sub?.subscriptionStatus === 'canceled'
                  ? 'Your subscription has been canceled.'
                  : 'You don\'t have an active subscription.'}
              </p>
              <button
                className="btn btn-primary account-btn"
                onClick={() => router.push('/premium')}
              >
                Subscribe to Premium
              </button>
            </>
          )}
        </div>

        <div className="account-section">
          <button className="btn btn-secondary account-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
