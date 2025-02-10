/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CustomCellRendererProps } from 'ag-grid-react';
import type { ColDef, ColGroupDef } from 'ag-grid-community';

export type Thin_CustomCellRendererProps<
  TData = any,
  TValue = any,
  TContext = any,
> = {
  value: CustomCellRendererProps<TData, TValue, TContext>['value'];
  data: CustomCellRendererProps<TData, TValue, TContext>['data'];
};

export type Thin_ColDef<TData = any, TValue = any> = {
  colId?: ColDef<TData, TValue>['colId'];
  field?: ColDef<TData, TValue>['field'];
  filter?: ColDef<TData, TValue>['filter'];
  editable?: ColDef<TData, TValue>['editable'];
  valueGetter?: ColDef<TData, TValue>['valueGetter'];
  valueFormatter?: ColDef<TData, TValue>['valueFormatter'];
  refData?: ColDef<TData, TValue>['refData'];
  hide?: ColDef<TData, TValue>['hide'];
  width?: ColDef<TData, TValue>['width'];
  cellRenderer?: ColDef<TData, TValue>['cellRenderer'];
  cellRendererSelector?: ColDef<TData, TValue>['cellRendererSelector'];
  pinned?: ColDef<TData, TValue>['pinned'];
};

export type Thin_ColGroupDef<TData = any> = {
  groupId?: ColGroupDef<TData>['groupId'];
  children: (Thin_ColDef<TData> | Thin_ColGroupDef<TData>)[];
}