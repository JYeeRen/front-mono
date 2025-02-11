import { ValueFormatterParams } from 'ag-grid-community';
import { Thin_CustomCellRendererProps } from './table.types';
import { CustomFilterProps } from 'ag-grid-react';
import {
  Dropdown,
  Menu,
  Tree,
  TreeDataNode,
  TreeProps,
} from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

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

export const CustomFilter = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleMenuClick = (e: any) => {
    const value = e.key;
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    // props.filterChangedCallback();
  };

  // useImperativeHandle(ref, () => ({
  //   isFilterActive() {
  //     return selectedValues.length > 0;
  //   },

  //   doesFilterPass(params) {
  //     return selectedValues.includes(params.data[props.colDef.field]);
  //   },

  //   getModel() {
  //     return { values: selectedValues };
  //   },

  //   setModel(model) {
  //     if (model) {
  //       setSelectedValues(model.values);
  //     } else {
  //       setSelectedValues([]);
  //     }
  //   },
  // }));

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="value1">Value 1</Menu.Item>
      <Menu.Item key="value2">Value 2</Menu.Item>
      <Menu.Item key="value3">Value 3</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <div style={{ padding: '8px', cursor: 'pointer' }}>
        Filter ({selectedValues.length} selected)
      </div>
    </Dropdown>
  );

  // return (
  //     <Dropdown
  //       menu={{ items: opts }}
  //       open
  //       overlayClassName={styles.overlayClassName}
  //       getPopupContainer={(triggerNode) => triggerNode.parentNode!}
  //       dropdownRender={(menu) => {
  //         return (
  //           <div>
  //             {React.cloneElement(
  //               menu as React.ReactElement<{
  //                 style: React.CSSProperties;
  //               }>,
  //               // { style: menuStyle },
  //             )}
  //             <Divider style={{ margin: 0 }} />
  //             <Space style={{ padding: 8 }}>
  //               <Button type="primary">Click me!</Button>
  //             </Space>
  //           </div>
  //         );
  //       }}
  //       // overlayStyle={{ maxHeight: 200, overflowY: 'auto' }}
  //     ></Dropdown>

  // );
};

export const Cfilter = forwardRef(
  (
    {
      model,
      onModelChange,
      getValue,
    }: CustomFilterProps<any, any, { value: string }>,
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleMenuClick = (e) => {
      console.log(e);
      const value = e.key;
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      setSelectedValues(newSelectedValues);
      // props.filterChangedCallback();
    };

    useImperativeHandle(ref, () => ({
      isFilterActive() {
        return selectedValues.length > 0;
      },

      doesFilterPass(params) {
        return selectedValues.includes(params.data[props.colDef.field]);
      },

      getModel() {
        return { values: selectedValues };
      },

      setModel(model) {
        if (model) {
          setSelectedValues(model.values);
        } else {
          setSelectedValues([]);
        }
      },
    }));

    const treeData: TreeDataNode[] = [
      {
        title: '全选',
        key: 'all',
        children: opts.map((opt) => ({
          title: opt.label,
          key: opt.key,
        })),
      },
    ];

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };

    const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
      console.log('onCheck', checkedKeys, info);
    };

    return (
      <Tree
        checkable
        defaultExpandedKeys={['all']}
        defaultSelectedKeys={['all']}
        defaultCheckedKeys={['all']}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        style={{ maxHeight: '200px' }}
      />
      // <Dropdown
      //   menu={{ items: opts, selectable: true, onClick: handleMenuClick, multiple: true }}
      //   open
      //   overlayClassName={styles.overlayClassName}
      //   getPopupContainer={(triggerNode) => {
      //     return triggerNode;
      //   }}
      //   overlayStyle={{ position: 'unset' }}
      // >
      //   <div id="ccc">SELECTED</div>
      // </Dropdown>
    );
  },
);
