import React from 'react';
import {
  AllCommunityModule,
  GridOptions,
  ModuleRegistry,
  SelectionColumnDef,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Thin_ColDef, Thin_ColGroupDef } from './table.types';
import { useMemo } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

interface TableProps<TData = unknown>
  extends Omit<GridOptions<TData>, 'columnDefs' | 'defaultColDef'> {
  columnDefs: (Thin_ColDef<TData> | Thin_ColGroupDef<TData>)[] | null;
  defaultColDef?: Thin_ColDef<TData>;
}

export function TableImpl<TData>(props: TableProps<TData>) {
  const { pagination = true, ...restProps } = props;

  const selectionColumnDef: SelectionColumnDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      width: 50,
      suppressHeaderMenuButton: false,
      pinned: 'left',
    };
  }, []);

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        resize: 'both',
        overflow: 'hidden',
      }}
    >
      <AgGridReact
        selectionColumnDef={selectionColumnDef}
        {...restProps}
        // rowData={rowData}
        // columnDefs={columns}
        // defaultColDef={defaultColDef}
        pagination={pagination}
        paginationPageSize={1000}
        paginationPageSizeSelector={[100, 200, 500, 1000]}
        onFilterChanged={(event) => console.log('Filter Changed!', event)}
        onFilterOpened={(event) => console.log(event)}
        // selectionColumnDef={selectionColumnDef}
        // rowSelection={rowSelection}
        // suppressRowHoverHighlight={suppressRowHoverHighlight}
        // columnHoverHighlight={columnHoverHighlight}
        // onSelectionChanged={(event) => console.log('Row Selected!', event)}
        // onCellValueChanged={(event) =>
        //   console.log(`New Cell Value: ${event.value}`)
        // }
        // pinnedBottomRowData={pinnedBottomRowData}
      />
    </div>
  );
}
