import { ArrowLeft, Save } from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ApiError } from '../api/errors';
import { defaultValuesFor, zodForDefinition } from '../api/zodFromFields';
import { computeVisibility } from '../descriptor/resolve';
import type { EntityDescriptor, Row } from '../descriptor/types';
import { PageHeader } from '../layout/AppShell';
import {
  useEntityItem,
  useEntitySave,
  useManifest,
  useResolvedEntity,
} from '../runtime/hooks';
import { usePortal } from '../runtime/PortalProvider';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Field,
  Skeleton,
} from '../ui';
import { buildSubmitPayload } from './buildSubmitPayload';
import { FieldControl } from './FieldControl';

export interface EntityFormProps<TRow extends Row = Row> {
  descriptor: EntityDescriptor<TRow>;
}

/**
 * The generic create/edit screen.
 *
 * Validation comes from the spec-derived zod schema, so a value the API would
 * reject is caught before the request. Conditional visibility is recomputed on
 * every change, which is how one `routeType` select drives eleven other fields.
 *
 * Updates send the whole resource: these APIs have no PATCH.
 */
export function EntityForm<TRow extends Row = Row>({
  descriptor,
}: EntityFormProps<TRow>): React.JSX.Element {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { config } = usePortal();

  const isNew = id === undefined || id === 'new';
  const resolved = useResolvedEntity(descriptor, t);
  const manifest = useManifest(descriptor.resource);

  const item = useEntityItem<TRow>(descriptor, isNew ? undefined : id);
  const save = useEntitySave(descriptor);

  // Only fields the form actually lays out are validated or submitted.
  const formFields = useMemo(
    () => descriptor.sections.flatMap((section) => section.fields),
    [descriptor.sections]
  );

  const writeFields = useMemo(() => {
    const name =
      manifest.schemas.write ?? manifest.schemas.create ?? descriptor.iden;
    return config.fieldsByDefinition[name] ?? {};
  }, [manifest.schemas, descriptor.iden, config.fieldsByDefinition]);

  const [values, setValues] = useState<Row>(() =>
    defaultValuesFor(writeFields, { pick: formFields })
  );
  const [files, setFiles] = useState<Record<string, Blob>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Seed the form once the item arrives.
  useEffect(() => {
    if (!item.data) return;
    const seeded: Row = {
      ...defaultValuesFor(writeFields, { pick: formFields }),
    };
    for (const name of formFields) {
      if (name in item.data) seeded[name] = (item.data as Row)[name];
    }
    setValues(seeded);
  }, [item.data, writeFields, formFields]);

  const visibility = useMemo(
    () => computeVisibility(resolved.fields, values),
    [resolved.fields, values]
  );

  const setValue = (name: string, value: unknown): void => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!(name in current)) return current;
      const { [name]: _removed, ...rest } = current;
      return rest;
    });
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const {
      values: submitted,
      files: submittedFiles,
      visibleFields,
    } = buildSubmitPayload({
      formFields,
      fieldsByName: resolved.fieldsByName,
      values,
      visibility,
      defaults: defaultValuesFor(writeFields, { pick: formFields }),
      fileFields: manifest.multipartForm?.fileFields ?? [],
    });

    // Only what the user can actually see is validated: an error pinned to a
    // hidden control would block the form with nothing to show for it.
    const schema = zodForDefinition(writeFields, { pick: visibleFields, t });

    const parsed = schema.safeParse(
      Object.fromEntries(visibleFields.map((name) => [name, submitted[name]]))
    );

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? '');
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    save.mutate(
      {
        ...(isNew ? {} : { id }),
        values: submitted,
        files: { ...files, ...submittedFiles },
      },
      { onSuccess: () => navigate('..', { relative: 'path' }) }
    );
  };

  if (!isNew && item.isPending) {
    return (
      <Card className='p-6'>
        <Skeleton className='h-6 w-48' />
        <div className='mt-6 space-y-4'>
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className='h-9 w-full' />
          ))}
        </div>
      </Card>
    );
  }

  const heading = isNew
    ? t('New {{entity}}', { entity: t(descriptor.title.one) })
    : descriptor.toStr && item.data
      ? descriptor.toStr(item.data, t)
      : t('Edit {{entity}}', { entity: t(descriptor.title.one) });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <PageHeader
        title={heading}
        actions={
          <>
            <Button variant='ghost' asChild>
              <Link to='..' relative='path'>
                <ArrowLeft /> {t('Back')}
              </Link>
            </Button>
            <Button type='submit' variant='primary' loading={save.isPending}>
              <Save /> {t('Save')}
            </Button>
          </>
        }
      />

      {save.isError ? (
        <Alert tone='danger' title={t('Could not save')} className='mb-4'>
          {save.error instanceof ApiError
            ? save.error.message
            : (save.error as Error).message}
        </Alert>
      ) : null}

      <div className='space-y-5'>
        {descriptor.sections.map((section) => {
          const visibleFields = section.fields.filter(
            (name) => visibility[name] !== false && resolved.fieldsByName[name]
          );
          if (visibleFields.length === 0) return null;

          return (
            <Card key={section.legend}>
              <CardHeader>
                <CardTitle>{t(section.legend)}</CardTitle>
              </CardHeader>
              <CardBody className='grid gap-4 sm:grid-cols-2'>
                {visibleFields.map((name) => {
                  const field = resolved.fieldsByName[name]!;
                  const error = errors[name];

                  return (
                    <Field
                      key={name}
                      id={name}
                      label={field.label}
                      required={field.required}
                      help={field.helpText}
                      error={error}
                      className={
                        field.widget === 'textarea'
                          ? 'sm:col-span-2'
                          : undefined
                      }
                    >
                      <FieldControl
                        name={name}
                        field={field}
                        value={values[name]}
                        values={values}
                        error={error}
                        onChange={(value) => {
                          if (value instanceof Blob) {
                            setFiles((current) => ({
                              ...current,
                              [name]: value,
                            }));
                          }
                          setValue(name, value);
                        }}
                      />
                    </Field>
                  );
                })}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </form>
  );
}
