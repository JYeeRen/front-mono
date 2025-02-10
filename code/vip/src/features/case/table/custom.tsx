import { ValueFormatterParams } from 'ag-grid-community';
import { Thin_CustomCellRendererProps } from './table.types';
import { CustomFilterProps } from 'ag-grid-react';
import { Button, Divider, Dropdown, Space } from 'antd';
import styles from './custom.module.less';
import React from 'react';

// Custom Cell Renderer (Display logos based on cell value)
export const CompanyLogoRenderer = (params: Thin_CustomCellRendererProps) => (
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
export const MissionResultRenderer = (params: Thin_CustomCellRendererProps) => (
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
export const dateFormatter = (params: ValueFormatterParams): string => {
  return new Date(params.value).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const opts = Array(100)
  .fill(null)
  .map((_, i) => ({ key: i, value: i, label: `Option ${i}` }));

export const customFilter = ({ model }: CustomFilterProps) => {
  console.log('model', model);
  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Dropdown
        menu={{ items: opts }}
        open
        overlayClassName={styles.overlayClassName}
        dropdownRender={(menu) => {
          return (
            <div>
              {React.cloneElement(
                menu as React.ReactElement<{
                  style: React.CSSProperties;
                }>,
                // { style: menuStyle },
              )}
              <Divider style={{ margin: 0 }} />
              <Space style={{ padding: 8 }}>
                <Button type="primary">Click me!</Button>
              </Space>
            </div>
          );
        }}
        // overlayStyle={{ maxHeight: 200, overflowY: 'auto' }}
      ></Dropdown>
      {/* <div
      // style={{ maxHeight: 200, overflowY: 'auto' }}
      className="ant-table-filter-dropdown"
      >
        {opts.map((opt) => (
          <div key={opt.value}>
            <Checkbox>{opt.label}</Checkbox>
          </div>
        ))}
      </div> */}
      {/* <Space>
        <Button
          type="primary"
          // onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          // onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          // onClick={() => {
          //   confirm({ closeDropdown: false });
          //   setSearchText((selectedKeys as string[])[0]);
          //   setSearchedColumn(dataIndex);
          // }}
        >
          Filter
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            onModelChange(null);
          }}
        >
          close
        </Button>
      </Space> */}
    </div>
  );
};
