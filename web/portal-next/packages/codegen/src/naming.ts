/**
 * Definition names in the specs are not valid TypeScript identifiers.
 * They come in four shapes:
 *
 *   Ddi                       plain write/read model
 *   Ddi-collection            serialization-group variant  (suffix after `-`)
 *   Ddi-detailed              ditto
 *   Locution_OriginalFile     embeddable sub-object        (suffix after `_`)
 *
 * We keep the variants as distinct types rather than merging them the way
 * ivoz-ui's ApiSpecParser does, because list rows and detail rows genuinely have
 * different shapes and conflating them is how you end up reading fields that are
 * only ever populated on one of the two.
 */

const NON_WORD = /[^A-Za-z0-9]+/g;

export function pascalCase(value: string): string {
  return value
    .split(NON_WORD)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function camelCase(value: string): string {
  const pascal = pascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/** `Ddi-collection` -> `DdiCollection`, `Locution_OriginalFile` -> `LocutionOriginalFile` */
export function typeName(definition: string): string {
  return pascalCase(definition);
}

/** The base entity a definition variant belongs to: `Ddi-collection` -> `Ddi`. */
export function baseName(definition: string): string {
  const cut = definition.indexOf('-');
  return cut === -1 ? definition : definition.slice(0, cut);
}

/** The variant suffix: `Ddi-collection` -> `collection`, `Ddi` -> `''`. */
export function variantName(definition: string): string {
  const cut = definition.indexOf('-');
  return cut === -1 ? '' : definition.slice(cut + 1);
}

/** A property key that needs quoting in a TS interface / object literal. */
export function propertyKey(key: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}

/** Escape a value for embedding as a TS string literal. */
export function stringLiteral(value: string): string {
  return JSON.stringify(value);
}

/**
 * Resolves every definition name in a spec to a unique TypeScript identifier.
 *
 * Plain PascalCase is not injective over these names: the brand spec contains
 * both `CarrierServer-status` (a serialization variant) and `CarrierServerStatus`
 * (a resource in its own right), and both want to be `CarrierServerStatus`.
 *
 * Non-variant names are reserved first, because those are the ones app code
 * refers to by their obvious spelling. A variant that would collide keeps its
 * two halves separated: `CarrierServer-status` -> `CarrierServer_Status`.
 * Deterministic, so the generated output is stable across runs.
 */
export function buildNameRegistry(
  definitions: readonly string[]
): Map<string, string> {
  const registry = new Map<string, string>();
  const taken = new Set<string>();

  const sorted = [...definitions].sort();
  const plain = sorted.filter((name) => !name.includes('-'));
  const variants = sorted.filter((name) => name.includes('-'));

  for (const name of plain) {
    const identifier = pascalCase(name);
    registry.set(name, identifier);
    taken.add(identifier);
  }

  for (const name of variants) {
    let identifier = pascalCase(name);

    if (taken.has(identifier)) {
      identifier = `${pascalCase(baseName(name))}_${pascalCase(variantName(name))}`;
    }

    // Belt and braces: a third spelling would still have to be unique.
    let suffix = 2;
    let candidate = identifier;
    while (taken.has(candidate)) {
      candidate = `${identifier}${suffix}`;
      suffix += 1;
    }

    registry.set(name, candidate);
    taken.add(candidate);
  }

  return registry;
}
