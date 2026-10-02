import { MoreMenuItem } from '@irontec/ivoz-ui/components/List/Content/Shared/MoreChildEntityLinks';
import { StyledTableRowCustomCta } from '@irontec/ivoz-ui/components/List/Content/Table/ContentTable.styles';
import Modal from '@irontec/ivoz-ui/components/shared/Modal/Modal';
import {
  ActionFunctionComponent,
  ActionItemProps,
} from '@irontec/ivoz-ui/router/routeMapParser';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { ChangeEvent, ReactNode, useMemo, useState } from 'react';
import { useStoreActions } from 'store';

import {
  COLUMNS,
  ImportResult,
  parseCsv,
  parseServerErrors,
  RowIssue,
  serialiseRows,
  TEMPLATE,
  validateRows,
} from './usersCsv';

const PREVIEW_LIMIT = 200;

const CONTENT_SX = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '100%',
  minWidth: 0,
  textAlign: 'left',
} as const;

type Step = 'select' | 'preview' | 'result';

const downloadTemplate = (): void => {
  const blob = new Blob([`${TEMPLATE}\n`], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'users-import-template.csv';
  link.click();
  URL.revokeObjectURL(url);
};

const errorFromResponse = (error: unknown): ReactNode => {
  const response = error as {
    status?: number;
    data?: { detail?: string; message?: string; 'hydra:description'?: string };
  } | null;
  const data = response?.data;
  const detail =
    data?.detail || data?.['hydra:description'] || data?.message || null;

  if (detail) {
    return detail;
  }

  return (
    <>
      {_('The import request failed')}
      {response?.status ? ` (HTTP ${response.status})` : ''}
    </>
  );
};

/**
 * Row action on the client list: bulk-create users, with their terminal,
 * extension and outgoing DDI, in one vPBX client from a CSV file
 * (POST /users/mass_import).
 */
const ImportUsers: ActionFunctionComponent = (props: ActionItemProps) => {
  const { row, variant = 'icon' } = props;
  const apiPost = useStoreActions((actions) => actions.api.post);
  const reload = useStoreActions((actions) => actions.list.reload);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('select');
  const [fileName, setFileName] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [headerMode, setHeaderMode] = useState<'auto' | boolean>('auto');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [requestError, setRequestError] = useState<ReactNode>(null);

  const parsed = useMemo(
    () => (text === null ? null : parseCsv(text, headerMode)),
    [text, headerMode]
  );
  const issues: RowIssue[] = useMemo(
    () => (parsed ? validateRows(parsed.rows) : []),
    [parsed]
  );
  const issuesByRow = useMemo(() => {
    const map = new Map<number, string[]>();
    for (const issue of issues) {
      map.set(issue.row, [...(map.get(issue.row) ?? []), issue.message]);
    }

    return map;
  }, [issues]);

  if (!row || row.type !== 'vpbx') {
    return <span className='display-none'></span>;
  }

  const reset = (): void => {
    setStep('select');
    setFileName(null);
    setText(null);
    setHeaderMode('auto');
    setResult(null);
    setRequestError(null);
  };

  const handleClose = (): void => {
    const imported = step === 'result';
    setOpen(false);
    reset();
    if (imported) {
      reload();
    }
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFileName(file.name);
      setHeaderMode('auto');
      setText(String(reader.result ?? ''));
    };
    reader.readAsText(file);
  };

  const handleSend = async (): Promise<void> => {
    if (!parsed || parsed.rows.length === 0 || issues.length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append('company', String(row.id));
    formData.append(
      'csv',
      new Blob([serialiseRows(parsed.rows)], { type: 'text/csv' }),
      'users.csv'
    );

    setSending(true);
    setRequestError(null);
    try {
      const response = await apiPost({
        path: '/users/mass_import',
        values: formData,
        contentType: 'multipart/form-data',
        handleErrors: false,
      });
      setResult(response?.data as ImportResult);
      setStep('result');
    } catch (error) {
      setRequestError(errorFromResponse(error));
    } finally {
      setSending(false);
    }
  };

  const rowCount = parsed?.rows.length ?? 0;
  const canPreview = rowCount > 0;
  const canSend = canPreview && issues.length === 0 && !sending;

  const buttons =
    step === 'select'
      ? [
          {
            label: _('Cancel'),
            onClick: handleClose,
            variant: 'outlined' as const,
          },
          {
            label: _('Continue'),
            onClick: () => setStep('preview'),
            variant: 'solid' as const,
            disabled: !canPreview,
          },
        ]
      : step === 'preview'
      ? [
          {
            label: _('Back'),
            onClick: () => setStep('select'),
            variant: 'outlined' as const,
          },
          {
            label: sending ? _('Importing…') : _('Import'),
            onClick: handleSend,
            variant: 'solid' as const,
            disabled: !canSend,
          },
        ]
      : [
          {
            label: _('Close'),
            onClick: handleClose,
            variant: 'solid' as const,
          },
        ];

  const renderSelect = () => (
    <Box sx={CONTENT_SX}>
      <Typography variant='body2'>
        {_(
          'One user per row. Only name and lastname are required; the terminal, extension and DDI columns can be left empty.'
        )}
      </Typography>
      <Typography variant='body2' component='div'>
        <strong>{_('Columns, in this order')}:</strong>{' '}
        {COLUMNS.map((column) => column.label).join(', ')}
      </Typography>
      <Alert severity='info'>
        {_(
          'Existing records are updated instead of duplicated: users are matched by name and lastname (or email), terminals by name (or MAC), extensions by number and DDIs by number and country. Terminal model is the model identifier (e.g. YealinkT21P_E2), DDI country is the country code (e.g. ES) and DDI provider is the provider name. An empty terminal password is generated.'
        )}
      </Alert>
      <Box
        sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
      >
        <Button variant='contained' component='label'>
          {fileName ? _('Choose another file') : _('Choose CSV file')}
          <input
            hidden
            type='file'
            accept='.csv,text/csv'
            onChange={handleFile}
          />
        </Button>
        <Button variant='text' onClick={downloadTemplate}>
          {_('Download template')}
        </Button>
      </Box>
      {fileName && parsed && (
        <>
          <Typography variant='body2'>
            <strong>{fileName}</strong>: {rowCount} {_('rows')}
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={parsed.headerRemoved}
                onChange={(event) => setHeaderMode(event.target.checked)}
              />
            }
            label={_('The first row is a header (skip it)')}
          />
        </>
      )}
    </Box>
  );

  const renderPreview = () => (
    <Box sx={CONTENT_SX}>
      <Typography variant='body2'>
        {_('Client')}: <strong>{String(row.name ?? row.id)}</strong> ·{' '}
        {rowCount} {_('rows')}
      </Typography>
      {issues.length > 0 ? (
        <Alert severity='error'>
          {_(
            'Fix these rows and choose the file again. The server rejects the whole file when any of these checks fail.'
          )}
          <ul style={{ margin: '8px 0 0', paddingInlineStart: 20 }}>
            {issues.slice(0, 20).map((issue, index) => (
              <li key={index}>
                {_('Row')} {issue.row}: {issue.message}
              </li>
            ))}
          </ul>
          {issues.length > 20 && (
            <div>
              {issues.length - 20} {_('more')}
            </div>
          )}
        </Alert>
      ) : (
        <Alert severity='success'>
          {_('No problems found. Import to create or update these users.')}
        </Alert>
      )}
      {requestError && <Alert severity='error'>{requestError}</Alert>}
      <TableContainer
        sx={{ maxHeight: 360, maxWidth: '100%', overflowX: 'auto' }}
      >
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              {COLUMNS.map((column) => (
                <TableCell key={column.key} sx={{ whiteSpace: 'nowrap' }}>
                  {column.label}
                  {column.required ? ' *' : ''}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {parsed?.rows.slice(0, PREVIEW_LIMIT).map((cells, index) => {
              const rowIssues = issuesByRow.get(index + 1);

              return (
                <Tooltip
                  key={index}
                  title={rowIssues ? rowIssues.join('; ') : ''}
                  placement='top-start'
                >
                  <TableRow
                    sx={
                      rowIssues
                        ? {
                            backgroundColor:
                              'rgba(var(--color-danger-rgb), 0.08)',
                          }
                        : undefined
                    }
                  >
                    <TableCell>{index + 1}</TableCell>
                    {COLUMNS.map((column, position) => (
                      <TableCell key={column.key} sx={{ whiteSpace: 'nowrap' }}>
                        {column.key === 'terminalPassword' && cells[position]
                          ? '••••••'
                          : cells[position] ?? ''}
                      </TableCell>
                    ))}
                  </TableRow>
                </Tooltip>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {rowCount > PREVIEW_LIMIT && (
        <Typography variant='caption'>
          {_('Showing the first')} {PREVIEW_LIMIT} {_('rows')}.
        </Typography>
      )}
    </Box>
  );

  const renderResult = () => {
    if (!result) {
      return null;
    }
    const { rowErrors, fileError } = parseServerErrors(result.errorMsg ?? '');

    if (result.success) {
      return (
        <Alert severity='success'>
          {rowCount} {_('users imported or updated.')}
        </Alert>
      );
    }

    if (rowErrors.length === 0) {
      return (
        <Alert severity='error'>
          {_('Nothing was imported.')} {fileError}
        </Alert>
      );
    }

    return (
      <Box sx={CONTENT_SX}>
        <Alert severity='warning'>
          {rowCount - result.failed} {_('of')} {rowCount}{' '}
          {_('users imported or updated.')} {result.failed}{' '}
          {_('rows were rejected')}:
        </Alert>
        <ul style={{ margin: 0, paddingInlineStart: 20 }}>
          {rowErrors.map((issue) => (
            <li key={issue.row}>
              {_('Row')} {issue.row}
              {parsed?.rows[issue.row - 1]
                ? ` (${parsed.rows[issue.row - 1][0]} ${
                    parsed.rows[issue.row - 1][1]
                  })`
                : ''}
              : {issue.message}
            </li>
          ))}
        </ul>
      </Box>
    );
  };

  return (
    <>
      <a onClick={() => setOpen(true)}>
        {variant === 'text' && <MoreMenuItem>{_('Import users')}</MoreMenuItem>}
        {variant === 'icon' && (
          <Tooltip
            title={_('Import users')}
            placement='bottom-start'
            enterTouchDelay={0}
          >
            <StyledTableRowCustomCta>
              <GroupAddIcon />
            </StyledTableRowCustomCta>
          </Tooltip>
        )}
      </a>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          title={
            <>
              {_('Import users')} · {String(row.name ?? '')}
            </>
          }
          buttons={buttons}
          keepMounted={true}
          sx={{
            '& .MuiPaper-root': {
              width: 'min(1100px, 95vw)',
              maxWidth: 'none',
            },
            '& .MuiDialogContent-root': { textAlign: 'left' },
          }}
        >
          {step === 'select' && renderSelect()}
          {step === 'preview' && renderPreview()}
          {step === 'result' && renderResult()}
        </Modal>
      )}
    </>
  );
};

export default ImportUsers;
