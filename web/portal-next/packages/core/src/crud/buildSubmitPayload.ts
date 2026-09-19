import type { ResolvedField, Row } from '../descriptor/types';

/**
 * Turns form state into the body of a create or update request.
 *
 * Two rules that pull against each other:
 *
 *  1. These APIs have no PATCH. A PUT replaces the resource, so omitting a
 *     writable field clears it — the payload must cover them all.
 *  2. A field the toggles have hidden is *not applicable*. A DDI routed to an
 *     IVR must not also carry the ten other route targets, so hidden fields are
 *     sent as an explicit `null`.
 *
 * The exception to rule 2 is a hidden field the spec marks `required`: the
 * backend would reject a null, so its current value (or the spec default)
 * stands. `CallForwardSetting.noAnswerTimeout` is the live example — required,
 * but only meaningful for one of the four forward types.
 */
export interface BuildSubmitPayloadInput {
  /** Field names laid out by the form, in order. */
  formFields: readonly string[];
  fieldsByName: Record<string, ResolvedField>;
  /** Current form state. */
  values: Row;
  /** Field name -> visible, as computed from the toggles. */
  visibility: Record<string, boolean>;
  /** Spec-derived defaults, used for required fields with nothing entered. */
  defaults: Row;
  /** Multipart file field names from the resource manifest, e.g. `OriginalFile`. */
  fileFields?: readonly string[];
}

export interface SubmitPayload {
  values: Row;
  files: Record<string, Blob>;
  /** The subset that should be validated — what the user can actually see. */
  visibleFields: string[];
}

export function buildSubmitPayload({
  formFields,
  fieldsByName,
  values,
  visibility,
  defaults,
  fileFields = [],
}: BuildSubmitPayloadInput): SubmitPayload {
  const payload: Row = {};
  const files: Record<string, Blob> = {};
  const visibleFields: string[] = [];

  for (const name of formFields) {
    const field = fieldsByName[name];
    if (!field || field.readOnly) continue;

    if (visibility[name] === false) {
      payload[name] = field.required
        ? (values[name] ?? defaults[name] ?? null)
        : null;
      continue;
    }

    visibleFields.push(name);

    const value = values[name];
    if (value instanceof Blob) {
      files[multipartFieldName(name, fileFields)] = value;
      continue;
    }

    payload[name] = value;
  }

  return { values: payload, files, visibleFields };
}

/**
 * Maps a form field to the multipart field the API expects.
 *
 * The spec names file fields in PascalCase (`OriginalFile`) while the JSON
 * payload uses lowerCamelCase (`originalFile`), so passing the form's own name
 * through would upload into a field the backend ignores.
 */
export function multipartFieldName(
  name: string,
  fileFields: readonly string[]
): string {
  return (
    fileFields.find(
      (candidate) => candidate.toLowerCase() === name.toLowerCase()
    ) ?? name
  );
}
