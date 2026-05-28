import { describe, it, expect } from 'vitest';
import { parseFraction } from './parseFraction';

describe('parseFraction', () => {
  // Plain numbers
  it('parses plain integer', () => expect(parseFraction('400')).toBe(400));
  it('parses decimal', () => expect(parseFraction('0.5')).toBe(0.5));
  it('parses decimal > 1', () => expect(parseFraction('1.5')).toBe(1.5));

  // ASCII fractions
  it('parses 1/2', () => expect(parseFraction('1/2')).toBe(0.5));
  it('parses 3/4', () => expect(parseFraction('3/4')).toBe(0.75));
  it('parses 1/4', () => expect(parseFraction('1/4')).toBe(0.25));
  it('parses 1/8', () => expect(parseFraction('1/8')).toBe(0.125));

  // Mixed numbers (ASCII)
  it('parses 1 3/4', () => expect(parseFraction('1 3/4')).toBe(1.75));
  it('parses 2 1/2', () => expect(parseFraction('2 1/2')).toBe(2.5));

  // Unicode fractions (as output by toFraction)
  it('parses unicode ½', () => expect(parseFraction('½')).toBe(0.5));
  it('parses unicode ¼', () => expect(parseFraction('¼')).toBe(0.25));
  it('parses unicode ¾', () => expect(parseFraction('¾')).toBe(0.75));
  it('parses unicode ⅛', () => expect(parseFraction('⅛')).toBe(0.125));
  it('parses mixed with unicode: 1 ¾', () => expect(parseFraction('1 ¾')).toBe(1.75));
  it('parses mixed with unicode: 2 ½', () => expect(parseFraction('2 ½')).toBe(2.5));

  // Edge cases — all should return null
  it('returns null for empty string', () => expect(parseFraction('')).toBeNull());
  it('returns null for whitespace only', () => expect(parseFraction('   ')).toBeNull());
  it('returns null for non-numeric text', () => expect(parseFraction('abc')).toBeNull());
  it('returns null for division by zero', () => expect(parseFraction('1/0')).toBeNull());
  it('returns null for negative', () => expect(parseFraction('-1')).toBeNull());
  it('returns null for partial fraction', () => expect(parseFraction('1/')).toBeNull());
});
