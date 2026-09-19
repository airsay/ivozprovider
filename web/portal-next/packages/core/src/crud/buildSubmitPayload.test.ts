import { describe, expect, it } from 'vitest';

import type { ResolvedField } from '../descriptor/types';
import { buildSubmitPayload, multipartFieldName } from './buildSubmitPayload';

function field(
  name: string,
  overrides: Partial<ResolvedField> = {}
): ResolvedField {
  return {
    name,
    label: name,
    helpText: undefined,
    widget: 'text',
    meta: { kind: 'string' },
    descriptor: undefined,
    required: false,
    readOnly: false,
    options: undefined,
    nullLabel: undefined,
    relation: undefined,
    Control: undefined,
    ...overrides,
  };
}

describe('buildSubmitPayload', () => {
  const fieldsByName: Record<string, ResolvedField> = {
    enabled: field('enabled', { widget: 'boolean', required: true }),
    callForwardType: field('callForwardType', {
      widget: 'select',
      required: true,
    }),
    noAnswerTimeout: field('noAnswerTimeout', {
      widget: 'number',
      required: true,
    }),
    targetType: field('targetType', { widget: 'select' }),
    numberValue: field('numberValue'),
    extension: field('extension', { widget: 'reference' }),
    voicemail: field('voicemail', { widget: 'reference' }),
    id: field('id', { readOnly: true }),
  };

  const formFields = [
    'enabled',
    'callForwardType',
    'noAnswerTimeout',
    'targetType',
    'numberValue',
    'extension',
    'voicemail',
    'id',
  ];

  const defaults = {
    noAnswerTimeout: 0,
    numberValue: '',
    extension: null,
    voicemail: null,
  };

  it('sends every writable field, because a PUT replaces the whole resource', () => {
    const { values } = buildSubmitPayload({
      formFields,
      fieldsByName,
      values: {
        enabled: true,
        callForwardType: 'busy',
        targetType: 'extension',
        extension: 45,
      },
      visibility: {
        enabled: true,
        callForwardType: true,
        targetType: true,
        extension: true,
      },
      defaults,
    });

    // Omitting a field from a PUT would clear it server-side, so all of them
    // are present — not just the ones that changed.
    expect(Object.keys(values).sort()).toEqual([
      'callForwardType',
      'enabled',
      'extension',
      'noAnswerTimeout',
      'numberValue',
      'targetType',
      'voicemail',
    ]);
  });

  it('never submits a read-only field', () => {
    const { values } = buildSubmitPayload({
      formFields,
      fieldsByName,
      values: { id: 7, enabled: true },
      visibility: {},
      defaults,
    });

    expect(values).not.toHaveProperty('id');
  });

  it('clears hidden optional fields with an explicit null', () => {
    // Forwarding to an extension must not also carry a number or a voicemail.
    const { values } = buildSubmitPayload({
      formFields,
      fieldsByName,
      values: {
        targetType: 'extension',
        extension: 45,
        numberValue: '600123456',
        voicemail: 3,
      },
      visibility: {
        numberValue: false,
        voicemail: false,
        extension: true,
        targetType: true,
      },
      defaults,
    });

    expect(values.numberValue).toBeNull();
    expect(values.voicemail).toBeNull();
    expect(values.extension).toBe(45);
  });

  it('keeps a hidden field the spec marks required', () => {
    // `noAnswerTimeout` only matters for one forward type, but the API rejects
    // a null — this is the case that silently deadlocked the form once.
    const { values } = buildSubmitPayload({
      formFields,
      fieldsByName,
      values: { callForwardType: 'busy', noAnswerTimeout: 20 },
      visibility: { noAnswerTimeout: false },
      defaults,
    });

    expect(values.noAnswerTimeout).toBe(20);
  });

  it('falls back to the spec default for a required hidden field with no value', () => {
    const { values } = buildSubmitPayload({
      formFields,
      fieldsByName,
      values: {},
      visibility: { noAnswerTimeout: false },
      defaults,
    });

    expect(values.noAnswerTimeout).toBe(0);
  });

  it('reports only visible fields for validation', () => {
    const { visibleFields } = buildSubmitPayload({
      formFields,
      fieldsByName,
      values: {},
      visibility: {
        numberValue: false,
        voicemail: false,
        noAnswerTimeout: false,
      },
      defaults,
    });

    expect(visibleFields).not.toContain('numberValue');
    expect(visibleFields).not.toContain('noAnswerTimeout');
    expect(visibleFields).toContain('targetType');
    // Read-only fields are not validated either.
    expect(visibleFields).not.toContain('id');
  });

  it('routes a Blob to the multipart field the API declares', () => {
    const blob = new Blob(['audio'], { type: 'audio/wav' });
    const { files, values } = buildSubmitPayload({
      formFields: ['originalFile'],
      fieldsByName: { originalFile: field('originalFile', { widget: 'file' }) },
      values: { originalFile: blob },
      visibility: { originalFile: true },
      defaults: {},
      fileFields: ['OriginalFile'],
    });

    // The spec spells the form field in PascalCase; the JSON payload does not.
    expect(files.OriginalFile).toBe(blob);
    expect(values).not.toHaveProperty('originalFile');
  });
});

describe('multipartFieldName', () => {
  it('matches the spec spelling case-insensitively', () => {
    expect(multipartFieldName('originalFile', ['OriginalFile'])).toBe(
      'OriginalFile'
    );
    expect(multipartFieldName('file', ['file'])).toBe('file');
  });

  it('passes through when the resource declares no file fields', () => {
    expect(multipartFieldName('logo', [])).toBe('logo');
  });
});
