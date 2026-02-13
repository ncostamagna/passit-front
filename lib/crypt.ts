function toBase64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export async function encrypt(secret: string) {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(secret);

  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );

  const exportedKey = await crypto.subtle.exportKey('raw', key);

  return {
    ciphertext: toBase64Url(new Uint8Array(ciphertext)),
    iv: toBase64Url(iv),
    key: toBase64Url(new Uint8Array(exportedKey)),
  };
}

export async function decrypt(ciphertextB64: string, ivB64: string, keyB64: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    fromBase64Url(keyB64).buffer as ArrayBuffer,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromBase64Url(ivB64).buffer as ArrayBuffer },
    key,
    fromBase64Url(ciphertextB64).buffer as ArrayBuffer
  );

  return new TextDecoder().decode(decrypted);
}