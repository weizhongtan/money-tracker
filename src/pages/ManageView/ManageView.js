import { useMutation, useQuery } from '@apollo/react-hooks';
import { ResponsiveBar } from '@nivo/bar';
import { Table } from 'antd';
import { gql } from 'apollo-boost';
import moment from 'moment';
import React, { useState } from 'react';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { Radio, Select, Wrapper } from '../../components';
import { BaseDataContext, CategoriesList, toMoney } from '../../lib';

const { Option } = Select;
const { Column } = Table;

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $categoryId: uuid!
    $parentCategoryId: string
    $name: string
    $type: string
  ) {
    update_categories(
      where: { id: { _eq: $categoryId } }
      _set: { parent_category_id: $parentCategoryId, name: $name, type: $type }
    ) {
      returning {
        id
      }
    }
  }
`;

const ManageView = ({ startDate, endDate }) => {
  const baseData = useContext(BaseDataContext);

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const categories = new CategoriesList([
    {
      id: null,
      name: 'All Categories',
    },
    ...baseData.categories,
  ]);

  console.log(categories);

  return null;
  // return (
  //   <>
  //     <Table
  //       dataSource={transactions}
  //       pagination={{
  //         defaultPageSize: 50,
  //       }}
  //       rowSelection={{
  //         selectedRowKeys: selectedRows.map(x => x.key),
  //         onChange: (_, rows) => setSelectedRows(rows),
  //       }}
  //       size="small"
  //       onRow={(record, rowIndex) => {
  //         return {
  //           onClick: () => {
  //             const selectedRowsClone = [...selectedRows];
  //             if (selectedRowsClone.find(row => row.key === record.key)) {
  //               _.remove(selectedRowsClone, row => row.key === record.key);
  //             } else {
  //               selectedRowsClone.push(record);
  //             }
  //             setSelectedRows(selectedRowsClone);
  //           },
  //         };
  //       }}
  //     >
  //       <Column
  //         title="Date"
  //         dataIndex="date"
  //         key="date"
  //         render={date => <TimeAgo date={date} />}
  //       />
  //       <Column
  //         title="Account"
  //         dataIndex="account"
  //         key="account"
  //         filters={baseData.accounts.map(({ name }) => ({
  //           text: name,
  //           value: name,
  //         }))}
  //         onFilter={(value, record) => record.account === value}
  //         render={({ to, from }, record) => {
  //           const { isOut } = record.amount;
  //           const arrow = <Icon type={isOut ? 'right' : 'left'} />;
  //           return (
  //             <>
  //               {avatars[to]}
  //               {from && (
  //                 <>
  //                   {' '}
  //                   {arrow} {avatars[from]}
  //                 </>
  //               )}
  //             </>
  //           );
  //         }}
  //       />
  //       <Column
  //         title="Amount"
  //         dataIndex="amount"
  //         key="amount"
  //         render={({ value, isOut }) => (
  //           <Amount positive={!isOut}>{toMoney(value, false)}</Amount>
  //         )}
  //       />
  //       <Column title="Description" dataIndex="description" key="description" />
  //       <Column
  //         title="Category"
  //         dataIndex="category"
  //         key="category"
  //         filters={categories.get().map(({ name }) => ({
  //           text: name,
  //           value: name,
  //         }))}
  //         onFilter={(value, record) => record.category === value}
  //         render={(currentCategoryName, record) => {
  //           const categoryId = categories.getId(currentCategoryName);
  //           return (
  //             <>
  //               <Select
  //                 value={categoryId}
  //                 onChange={async newCategoryId => {
  //                   await updateTransactionsCategory({
  //                     transactionIds: [record.key],
  //                     newCategoryId,
  //                     currentCategoryIds: [categoryId],
  //                   });
  //                 }}
  //                 showSearch
  //                 optionFilterProp="label"
  //                 size="small"
  //               >
  //                 {categories.get().map(({ id, name, isSub }) => (
  //                   <Option key={id} value={id} label={name}>
  //                     {isSub ? name : <Parent>{name}</Parent>}
  //                   </Option>
  //                 ))}
  //               </Select>
  //               {!currentCategoryName && <Icon type="exclamation-circle" />}
  //             </>
  //           );
  //         }}
  //       />
  //     </Table>
  //   </>
};

export default ManageView;
