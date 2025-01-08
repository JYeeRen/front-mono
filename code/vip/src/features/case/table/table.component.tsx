import { useEffect, useMemo, useState } from 'react';
import { ResizableBox } from 'react-resizable';

// Theme
import type {
  ColDef,
  RowSelectionOptions,
  SelectionColumnDef,
  ValueFormatterParams,
} from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// Core CSS
import type { CustomCellRendererProps } from 'ag-grid-react';
import { AgGridReact } from 'ag-grid-react';
import CustomPinnedRowRenderer from './customPinnedRowRenderer';

ModuleRegistry.registerModules([AllCommunityModule]);

// Custom Cell Renderer (Display logos based on cell value)
const CompanyLogoRenderer = (params: CustomCellRendererProps) => (
  <span
    style={{
      display: 'flex',
      height: '100%',
      width: '100%',
      alignItems: 'center',
    }}
  >
    {params.value && (
      <img
        alt={`${params.value} Flag`}
        src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`}
        style={{
          display: 'block',
          width: '25px',
          height: 'auto',
          maxHeight: '50%',
          marginRight: '12px',
          filter: 'brightness(1.1)',
        }}
      />
    )}
    <p
      style={{
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {params.value}
    </p>
  </span>
);

/* Custom Cell Renderer (Display tick / cross in 'Successful' column) */
const MissionResultRenderer = (params: CustomCellRendererProps) => (
  <span
    style={{
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      alignItems: 'center',
    }}
  >
    {
      <img
        alt={`${params.value}`}
        src={`https://www.ag-grid.com/example-assets/icons/${params.value ? 'tick-in-circle' : 'cross-in-circle'}.png`}
        style={{ width: 'auto', height: 'auto' }}
      />
    }
  </span>
);

/* Format Date Cells */
const dateFormatter = (params: ValueFormatterParams): string => {
  return new Date(params.value).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Row Data Interface
interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

const rowSelection: RowSelectionOptions = {
  mode: 'multiRow',
  headerCheckbox: false,
  enableClickSelection: true,
  enableSelectionWithoutKeys: true,
  // checkboxes: (params) => params.data.successful,
  isRowSelectable: rowNode => rowNode.data.successful,
  hideDisabledCheckboxes: true
};

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<IRow[]>([]);

  const selectionColumnDef: SelectionColumnDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      width: 120,
      suppressHeaderMenuButton: false,
      pinned: 'left',
    };
  }, []);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    {
      field: 'mission',
      width: 150,
    },
    {
      field: 'company',
      width: 130,
      cellRenderer: CompanyLogoRenderer,
      pinned: 'left',
      cellRendererSelector: (params) => {
        if (params.node.rowPinned) {
          return {
            component: CustomPinnedRowRenderer,
            params: {
              style: { color: '#5577CC' },
            },
          };
        }
        return undefined;
      },
    },
    {
      field: 'location',
      width: 225,
    },
    {
      field: 'date',
      valueFormatter: dateFormatter,
    },
    {
      field: 'price',
      width: 130,
      valueFormatter: (params: ValueFormatterParams) => {
        return '£' + params.value?.toLocaleString();
      },
    },
    {
      field: 'successful',
      width: 120,
      cellRenderer: MissionResultRenderer,
    },
    { field: 'rocket', pinned: 'right' },
  ]);

  // Fetch data & update rowData state
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: true,
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pinnedBottomRowData = useMemo<any[]>(() => {
    return [
      {
        mission: 'BOTTOM (mission)',
        company: 'BOTTOM (company)',
        rocket: 'BOTTOM (rocket)',
      },
    ];
  }, []);

  // turns OFF row hover, it's on by default
  const suppressRowHoverHighlight = false;
  // turns ON column hover, it's off by default
  const columnHoverHighlight = true;

  // Container: Defines the grid's theme & dimensions.
  return (
    <ResizableBox
      width={1000}
      height={500}
      // draggableOpts={{ grid: [25, 25] }}
      // minConstraints={[100, 100]}
      // maxConstraints={[2000, 2000]}
      style={{ padding: 10, margin: 10, background: 'green' }}
    >
      <div style={{ width: '100%', height: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          selectionColumnDef={selectionColumnDef}
          rowSelection={rowSelection}
          suppressRowHoverHighlight={suppressRowHoverHighlight}
          columnHoverHighlight={columnHoverHighlight}
          onSelectionChanged={(event) => console.log('Row Selected!', event)}
          onCellValueChanged={(event) =>
            console.log(`New Cell Value: ${event.value}`)
          }
          pinnedBottomRowData={pinnedBottomRowData}
        />
      </div>
    </ResizableBox>
  );
};

export const Table = GridExample;
