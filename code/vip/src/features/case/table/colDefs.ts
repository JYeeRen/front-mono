import { ValueFormatterParams } from "ag-grid-community";
import { CompanyLogoRenderer, customFilter, dateFormatter, MissionResultRenderer } from "./custom";
import CustomPinnedRowRenderer from "./customPinnedRowRenderer";
import { Thin_ColDef } from "./table.types";

export const columns: Thin_ColDef[] = [
    {
      field: 'mission',
      width: 150,
    },
    {
      field: 'company',
      width: 130,
      filter: customFilter,
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
  ]