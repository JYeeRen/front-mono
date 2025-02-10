import { useMemo } from 'react';
// Theme
import type {
  RowSelectionOptions,
} from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// Core CSS

import { Button } from 'antd';
import { app } from '@app/services';
import { columns } from './colDefs';
import { TableImpl } from './table';
import { useQuery } from '@tanstack/react-query';


ModuleRegistry.registerModules([AllCommunityModule]);





// Row Data Interface
// interface IRow {
//   mission: string;
//   company: string;
//   location: string;
//   date: string;
//   time: string;
//   rocket: string;
//   price: number;
//   successful: boolean;
// }

const rowSelection: RowSelectionOptions = {
  mode: 'multiRow',
  headerCheckbox: false,
  enableClickSelection: true,
  enableSelectionWithoutKeys: true,
  // checkboxes: (params) => params.data.successful,
  isRowSelectable: (rowNode) => rowNode.data.successful,
  hideDisabledCheckboxes: true,
};

// Create new GridExample component
const GridExample = () => {
  // Row Data: The data to be displayed.
  // const [rowData, setRowData] = useState<IRow[]>([]);

  const { data: rowData } =useQuery({
    queryKey: ['space-mission-data'],
    queryFn: async () => {
      const res = await fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
      return res.json();
    }
  })

  // Apply settings across all columns
  // const defaultColDef = useMemo<Thin_ColDef>(() => {
  //   return {
  //     filter: true,
  //     editable: true,
  //   };
  // }, []);

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
    <div
      // width={1000}
      // height={500}
      // draggableOpts={{ grid: [25, 25] }}
      // minConstraints={[100, 100]}
      // maxConstraints={[2000, 2000]}
      style={{
        padding: 10,
        margin: 10,
        background: 'green',
        height: '500px',
        width: '1000px',
      }}
    >
      <Button
        onClick={() => {
          app.message.success('test');
        }}
      >
        message
      </Button>
      <Button
        onClick={() => {
          app.notification.error({ message: 'test', description: 'test' });
        }}
      >
        notification
      </Button>
      <Button
        onClick={() => {
          app.modal.error({ title: 'test', content: 'test' });
        }}
      >
        modal
      </Button>
      <div style={{ width: '100%', height: '100%' }}>
        <TableImpl
          rowData={rowData}
          columnDefs={columns}
          // defaultColDef={defaultColDef}
          // pagination={true}
          // selectionColumnDef={selectionColumnDef}
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
    </div>
  );
};

export const Table = GridExample;
