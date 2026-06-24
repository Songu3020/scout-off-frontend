// Mock SorobanRpc.Server to prevent module-level construction error,
// while keeping every other export (StrKey, Keypair, etc.) real.
jest.mock("@stellar/stellar-sdk", () => {
  const actual = jest.requireActual("@stellar/stellar-sdk");
  return {
    ...actual,
    SorobanRpc: {
      ...actual.SorobanRpc,
      Server: jest.fn().mockImplementation(() => ({})),
    },
  };
});

import { isValidStellarAddress } from "../../lib/stellar";

// Generate a valid Stellar public key at runtime using the real Keypair implementation.
// This guarantees structural + checksum validity without hardcoding a specific address.
const { Keypair } = jest.requireActual("@stellar/stellar-sdk") as typeof import("@stellar/stellar-sdk");
const VALID_ADDRESS = Keypair.random().publicKey();

describe("isValidStellarAddress", () => {
  test("returns true for a valid Stellar G-address", () => {
    expect(isValidStellarAddress(VALID_ADDRESS)).toBe(true);
  });

  test("returns false for an empty string", () => {
    expect(isValidStellarAddress("")).toBe(false);
  });

  test("returns false for a truncated G-address", () => {
    // Chop the last char from a valid address — breaks the checksum
    expect(isValidStellarAddress(VALID_ADDRESS.slice(0, -1))).toBe(false);
  });

  test("returns false for a random non-Stellar string", () => {
    expect(isValidStellarAddress("not-a-stellar-address")).toBe(false);
  });

  test("returns false for an Ethereum-style address", () => {
    expect(isValidStellarAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")).toBe(false);
  });

  test("returns false for a numeric string", () => {
    expect(isValidStellarAddress("12345678901234567890")).toBe(false);
  });

  test("returns false for a Stellar secret key (S-prefix)", () => {
    // Secret keys start with S — not a public key
    const secret = Keypair.random().secret();
    expect(isValidStellarAddress(secret)).toBe(false);
  });

  test("returns false for path traversal input", () => {
    expect(isValidStellarAddress("../etc/passwd")).toBe(false);
  });
});
