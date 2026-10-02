import Modal from '@irontec/ivoz-ui/components/shared/Modal/Modal';
import _ from '@irontec/ivoz-ui/services/translations/translate';
import {
  Alert,
  Box,
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ChangeEvent, ReactNode, useMemo, useState } from 'react';

import {
  CsvColumn,
  CsvRecord,
  downloadCsv,
  parseFile,
  PlannedAction,
  RowIssue,
  toCsv,
  validateRecords,
} from './csvRecords';

const CONTENT_SX = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '100%',
  minWidth: 0,
  textAlign: 'left',
} as const;

const PREVIEW_LIMIT = 200;

export interface ImportDialogProps {
  title: ReactNode;
  columns: CsvColumn[];
  /** Columns shown in the preview table (long ones, like templates, left out). */
  previewColumns: string[];
  templateFileName: string;
  templateRecords: CsvRecord[];
  intro?: ReactNode;
  /** Shown when some rows update existing records; defaults to a note that updates replace every column. */
  updateNotice?: ReactNode;
  /** Works out, per row, whether it creates, updates or cannot be imported. */
  plan: (records: CsvRecord[]) => Promise<PlannedAction[]>;
  /** Saves one row; throws with a readable message on failure. */
  save: (action: PlannedAction) => Promise<void>;
  /** Names a row in the result list; defaults to its Iden column. */
  rowLabel?: (record: CsvRecord) => string;
  onClose: (changed: boolean) => void;
}

type Step = 'select' | 'preview' | 'running' | 'result';

interface Outcome {
  created: number;
  updated: number;
  errors: RowIssue[];
}

export default function ImportDialog(props: ImportDialogProps): JSX.Element {
  const {
    title,
    columns,
    previewColumns,
    templateFileName,
    templateRecords,
    intro,
    updateNotice,
    plan,
    save,
    rowLabel = (record: CsvRecord) => record.iden ?? '',
    onClose,
  } = props;

  const [step, setStep] = useState<Step>('select');
  const [fileName, setFileName] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [actions, setActions] = useState<PlannedAction[] | null>(null);
  const [planning, setPlanning] = useState(false);
  const [planError, setPlanError] = useState<ReactNode>(null);
  const [progress, setProgress] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const parsed = useMemo(
    () => (text === null ? null : parseFile(text, columns)),
    [text, columns]
  );
  const issues = useMemo(
    () => (parsed ? validateRecords(parsed.records, columns) : []),
    [parsed, columns]
  );
  const missingRequired = (parsed?.missingColumns ?? []).filter(
    (column) => column.required
  );
  const records = parsed?.records ?? [];

  const handleFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFileName(file.name);
      setActions(null);
      setText(String(reader.result ?? ''));
    };
    reader.readAsText(file);
  };

  const goToPreview = async (): Promise<void> => {
    setPlanning(true);
    setPlanError(null);
    try {
      setActions(await plan(records));
      setStep('preview');
    } catch (error) {
      setPlanError(String((error as Error)?.message ?? error));
    } finally {
      setPlanning(false);
    }
  };

  const run = async (): Promise<void> => {
    if (!actions) {
      return;
    }
    setStep('running');
    setProgress(0);
    const result: Outcome = { created: 0, updated: 0, errors: [] };

    for (const [index, action] of actions.entries()) {
      if (action.kind === 'error') {
        result.errors.push({ row: action.row, message: action.message });
      } else {
        try {
          await save(action);
          result[action.kind === 'create' ? 'created' : 'updated']++;
        } catch (error) {
          result.errors.push({
            row: action.row,
            message: String((error as Error)?.message ?? error),
          });
        }
      }
      setProgress(Math.round(((index + 1) / actions.length) * 100));
    }

    setOutcome(result);
    setStep('result');
  };

  const counts = useMemo(() => {
    const value = { create: 0, update: 0, error: 0 };
    for (const action of actions ?? []) {
      value[action.kind]++;
    }

    return value;
  }, [actions]);

  const canPreview =
    records.length > 0 &&
    issues.length === 0 &&
    missingRequired.length === 0 &&
    !planning;
  const canRun = !!actions && counts.create + counts.update > 0;

  const buttons =
    step === 'select'
      ? [
          {
            label: _('Cancel'),
            onClick: () => onClose(false),
            variant: 'outlined' as const,
          },
          {
            label: planning ? _('Checking…') : _('Continue'),
            onClick: goToPreview,
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
            label: _('Import'),
            onClick: run,
            variant: 'solid' as const,
            disabled: !canRun,
          },
        ]
      : step === 'running'
      ? []
      : [
          {
            label: _('Close'),
            onClick: () => onClose(true),
            variant: 'solid' as const,
          },
        ];

  const columnLabel = (key: string): string =>
    columns.find((column) => column.key === key)?.label ?? key;

  const renderSelect = () => (
    <Box sx={CONTENT_SX}>
      {intro}
      <Typography variant='body2' component='div'>
        <strong>{_('Columns')}:</strong>{' '}
        {columns
          .map((column) => `${column.label}${column.required ? ' *' : ''}`)
          .join(', ')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant='contained' component='label'>
          {fileName ? _('Choose another file') : _('Choose CSV file')}
          <input
            hidden
            type='file'
            accept='.csv,text/csv'
            onChange={handleFile}
          />
        </Button>
        <Button
          variant='text'
          onClick={() =>
            downloadCsv(templateFileName, toCsv(templateRecords, columns))
          }
        >
          {_('Download template')}
        </Button>
      </Box>
      {fileName && parsed && (
        <Typography variant='body2'>
          <strong>{fileName}</strong>: {records.length} {_('rows')}
        </Typography>
      )}
      {missingRequired.length > 0 && (
        <Alert severity='error'>
          {_('The header row is missing these columns')}:{' '}
          {missingRequired.map((column) => column.label).join(', ')}
        </Alert>
      )}
      {parsed && parsed.unknownHeaders.length > 0 && (
        <Alert severity='warning'>
          {_('These columns are not recognised and will be ignored')}:{' '}
          {parsed.unknownHeaders.join(', ')}
        </Alert>
      )}
      {issues.length > 0 && (
        <Alert severity='error'>
          {_('Fix these rows and choose the file again')}:
          <ul style={{ margin: '8px 0 0', paddingInlineStart: 20 }}>
            {issues.slice(0, 20).map((issue, index) => (
              <li key={index}>
                {_('Row')} {issue.row}: {issue.message}
              </li>
            ))}
          </ul>
        </Alert>
      )}
      {planError && <Alert severity='error'>{planError}</Alert>}
    </Box>
  );

  const renderPreview = () => (
    <Box sx={CONTENT_SX}>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Chip
          color='success'
          label={
            <>
              {counts.create} {_('new')}
            </>
          }
        />
        <Chip
          color='info'
          label={
            <>
              {counts.update} {_('to update')}
            </>
          }
        />
        {counts.error > 0 && (
          <Chip
            color='error'
            label={
              <>
                {counts.error} {_('cannot be imported')}
              </>
            }
          />
        )}
      </Box>
      {counts.update > 0 && (
        <Alert severity='info'>
          {updateNotice ??
            _(
              'Rows that match an existing record replace all of its values, including empty cells.'
            )}
        </Alert>
      )}
      <TableContainer
        sx={{ maxHeight: 360, maxWidth: '100%', overflowX: 'auto' }}
      >
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>{_('Action')}</TableCell>
              {previewColumns.map((key) => (
                <TableCell key={key} sx={{ whiteSpace: 'nowrap' }}>
                  {columnLabel(key)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(actions ?? []).slice(0, PREVIEW_LIMIT).map((action) => (
              <TableRow
                key={action.row}
                sx={
                  action.kind === 'error'
                    ? { backgroundColor: 'rgba(var(--color-danger-rgb), 0.08)' }
                    : undefined
                }
              >
                <TableCell>{action.row}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {action.kind === 'create' && _('New')}
                  {action.kind === 'update' && _('Update')}
                  {action.kind === 'error' && action.message}
                </TableCell>
                {previewColumns.map((key) => (
                  <TableCell key={key} sx={{ whiteSpace: 'nowrap' }}>
                    {action.record[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderRunning = () => (
    <Box sx={CONTENT_SX}>
      <Typography variant='body2'>{_('Importing…')}</Typography>
      <LinearProgress variant='determinate' value={progress} />
    </Box>
  );

  const renderResult = () =>
    outcome && (
      <Box sx={CONTENT_SX}>
        <Alert severity={outcome.errors.length ? 'warning' : 'success'}>
          {outcome.created} {_('created')}, {outcome.updated} {_('updated')}
          {outcome.errors.length > 0 && (
            <>
              , {outcome.errors.length} {_('failed')}
            </>
          )}
          .
        </Alert>
        {outcome.errors.length > 0 && (
          <ul style={{ margin: 0, paddingInlineStart: 20 }}>
            {outcome.errors.map((issue) => (
              <li key={issue.row}>
                {_('Row')} {issue.row}
                {records[issue.row - 1] && rowLabel(records[issue.row - 1])
                  ? ` (${rowLabel(records[issue.row - 1])})`
                  : ''}
                : {issue.message}
              </li>
            ))}
          </ul>
        )}
      </Box>
    );

  return (
    <Modal
      open={true}
      onClose={() => step !== 'running' && onClose(step === 'result')}
      title={title}
      buttons={buttons}
      keepMounted={true}
      sx={{
        '& .MuiPaper-root': { width: 'min(1100px, 95vw)', maxWidth: 'none' },
        '& .MuiDialogContent-root': { textAlign: 'left' },
      }}
    >
      {step === 'select' && renderSelect()}
      {step === 'preview' && renderPreview()}
      {step === 'running' && renderRunning()}
      {step === 'result' && renderResult()}
    </Modal>
  );
}
