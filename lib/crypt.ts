// Encrypt: genera key + iv aleatorios, devuelve ciphertext + iv + key
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
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    iv: btoa(String.fromCharCode(...new Uint8Array(iv))),
    key: btoa(String.fromCharCode(...new Uint8Array(exportedKey))),
  };
}

export async function decrypt(ciphertextB64: string, ivB64: string, keyB64: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    Uint8Array.from(atob(keyB64), c => c.charCodeAt(0)),
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: Uint8Array.from(atob(ivB64), c => c.charCodeAt(0)) },
    key,
    Uint8Array.from(atob(ciphertextB64), c => c.charCodeAt(0))
  );

  return new TextDecoder().decode(decrypted);
}