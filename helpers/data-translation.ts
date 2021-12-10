import * as BufferLayout from '@solana/buffer-layout';

/**
 * Layout for a public key
 */
const publicKey = (property = 'publicKey') => {
  return BufferLayout.blob(32, property);
};
/**
 * Layout for a 64bit unsigned value
 */
const uint64 = (property = 'uint64') => {
  return BufferLayout.blob(8, property);
};

export const escrowAccountDataLayout = BufferLayout.struct([
  BufferLayout.u8('isInitialized'),
  publicKey('sellerPubkey'),
  publicKey('tokenAccountPubkey'),
  publicKey('mintKey'),
  uint64('expectedAmount'),
]);
