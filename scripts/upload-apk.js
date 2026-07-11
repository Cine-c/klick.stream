/**
 * Upload the Klick Android APK to Firebase Storage and print the tokenized
 * download URL to paste into pages/app.jsx (APK_URL).
 *
 * Usage (run from D:\klick):
 *   node scripts/upload-apk.js <path-to-apk>
 *
 * If no path is given, it looks for ./klick.apk, then the newest *.apk in cwd.
 *
 * The file is uploaded to app/klick.apk with a firebaseStorageDownloadTokens
 * metadata value, which yields a public download URL that works WITHOUT
 * changing storage.rules (same mechanism as the Firebase Console "Download URL").
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const ROOT = path.resolve(__dirname, '..');
const serviceAccount = require(path.join(ROOT, 'serviceAccountKey.json'));
const BUCKET = 'klick-a2f4e.firebasestorage.app';
const DEST = 'app/klick.apk';

function resolveApkPath() {
  const arg = process.argv[2];
  if (arg) {
    if (!fs.existsSync(arg)) {
      console.error(`APK not found at: ${arg}`);
      process.exit(1);
    }
    return path.resolve(arg);
  }
  const local = path.join(process.cwd(), 'klick.apk');
  if (fs.existsSync(local)) return local;
  const apks = fs
    .readdirSync(process.cwd())
    .filter((f) => f.toLowerCase().endsWith('.apk'))
    .map((f) => ({ f, t: fs.statSync(path.join(process.cwd(), f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  if (apks.length) return path.join(process.cwd(), apks[0].f);
  console.error('No APK path given and no *.apk found in current directory.');
  console.error('Usage: node scripts/upload-apk.js <path-to-apk>');
  process.exit(1);
}

async function main() {
  const apkPath = resolveApkPath();
  const sizeMB = (fs.statSync(apkPath).size / (1024 * 1024)).toFixed(1);
  console.log(`Uploading: ${apkPath} (${sizeMB} MB)`);
  console.log(`       to: gs://${BUCKET}/${DEST}`);

  const app = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: BUCKET,
  });

  const token = crypto.randomUUID();
  const bucket = getStorage(app).bucket();

  await bucket.upload(apkPath, {
    destination: DEST,
    resumable: true,
    metadata: {
      contentType: 'application/vnd.android.package-archive',
      metadata: { firebaseStorageDownloadTokens: token },
    },
  });

  const url =
    `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/` +
    `${encodeURIComponent(DEST)}?alt=media&token=${token}`;

  console.log('\n✅ Upload complete. APK_URL:\n');
  console.log(url);
  console.log('\nPaste this into pages/app.jsx → const APK_URL = \'...\';');
}

main().catch((err) => {
  console.error('\n❌ Upload failed:', err.message || err);
  process.exit(1);
});
