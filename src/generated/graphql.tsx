import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: string;
  uuid: string;
  numeric: number;
};

/** columns and relationships of "accounts" */
export type Accounts = {
  colour?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  initial_amount: Scalars['numeric'];
  legacy_key?: Maybe<Scalars['String']>;
  minimum: Scalars['numeric'];
  name: Scalars['String'];
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An array relationship */
  transactionsByToAccountId: Array<Transactions>;
  /** An aggregated array relationship */
  transactionsByToAccountId_aggregate: Transactions_Aggregate;
  /** An aggregated array relationship */
  transactions_aggregate: Transactions_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "accounts" */
export type AccountsTransactionsArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "accounts" */
export type AccountsTransactionsByToAccountIdArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "accounts" */
export type AccountsTransactionsByToAccountId_AggregateArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "accounts" */
export type AccountsTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};

/** aggregated selection of "accounts" */
export type Accounts_Aggregate = {
  aggregate?: Maybe<Accounts_Aggregate_Fields>;
  nodes: Array<Accounts>;
};

/** aggregate fields of "accounts" */
export type Accounts_Aggregate_Fields = {
  avg?: Maybe<Accounts_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Accounts_Max_Fields>;
  min?: Maybe<Accounts_Min_Fields>;
  stddev?: Maybe<Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<Accounts_Sum_Fields>;
  var_pop?: Maybe<Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<Accounts_Var_Samp_Fields>;
  variance?: Maybe<Accounts_Variance_Fields>;
};


/** aggregate fields of "accounts" */
export type Accounts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Accounts_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "accounts" */
export type Accounts_Aggregate_Order_By = {
  avg?: Maybe<Accounts_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Accounts_Max_Order_By>;
  min?: Maybe<Accounts_Min_Order_By>;
  stddev?: Maybe<Accounts_Stddev_Order_By>;
  stddev_pop?: Maybe<Accounts_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Accounts_Stddev_Samp_Order_By>;
  sum?: Maybe<Accounts_Sum_Order_By>;
  var_pop?: Maybe<Accounts_Var_Pop_Order_By>;
  var_samp?: Maybe<Accounts_Var_Samp_Order_By>;
  variance?: Maybe<Accounts_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "accounts" */
export type Accounts_Arr_Rel_Insert_Input = {
  data: Array<Accounts_Insert_Input>;
  on_conflict?: Maybe<Accounts_On_Conflict>;
};

/** aggregate avg on columns */
export type Accounts_Avg_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "accounts" */
export type Accounts_Avg_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Accounts_Bool_Exp>>>;
  _not?: Maybe<Accounts_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Accounts_Bool_Exp>>>;
  colour?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  initial_amount?: Maybe<Numeric_Comparison_Exp>;
  legacy_key?: Maybe<String_Comparison_Exp>;
  minimum?: Maybe<Numeric_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  transactions?: Maybe<Transactions_Bool_Exp>;
  transactionsByToAccountId?: Maybe<Transactions_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "accounts" */
export enum Accounts_Constraint {
  /** unique or primary key constraint */
  AccountsPkey = 'accounts_pkey'
}

/** input type for inserting data into table "accounts" */
export type Accounts_Insert_Input = {
  colour?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initial_amount?: Maybe<Scalars['numeric']>;
  legacy_key?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  transactions?: Maybe<Transactions_Arr_Rel_Insert_Input>;
  transactionsByToAccountId?: Maybe<Transactions_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
  colour?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  initial_amount?: Maybe<Scalars['numeric']>;
  legacy_key?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "accounts" */
export type Accounts_Max_Order_By = {
  colour?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  initial_amount?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
  colour?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  initial_amount?: Maybe<Scalars['numeric']>;
  legacy_key?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "accounts" */
export type Accounts_Min_Order_By = {
  colour?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  initial_amount?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "accounts" */
export type Accounts_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Accounts>;
};

/** input type for inserting object relation for remote table "accounts" */
export type Accounts_Obj_Rel_Insert_Input = {
  data: Accounts_Insert_Input;
  on_conflict?: Maybe<Accounts_On_Conflict>;
};

/** on conflict condition type for table "accounts" */
export type Accounts_On_Conflict = {
  constraint: Accounts_Constraint;
  update_columns: Array<Accounts_Update_Column>;
  where?: Maybe<Accounts_Bool_Exp>;
};

/** ordering options when selecting data from "accounts" */
export type Accounts_Order_By = {
  colour?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initial_amount?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  transactionsByToAccountId_aggregate?: Maybe<Transactions_Aggregate_Order_By>;
  transactions_aggregate?: Maybe<Transactions_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "accounts" */
export enum Accounts_Select_Column {
  /** column name */
  Colour = 'colour',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InitialAmount = 'initial_amount',
  /** column name */
  LegacyKey = 'legacy_key',
  /** column name */
  Minimum = 'minimum',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "accounts" */
export type Accounts_Set_Input = {
  colour?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initial_amount?: Maybe<Scalars['numeric']>;
  legacy_key?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Accounts_Stddev_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "accounts" */
export type Accounts_Stddev_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Stddev_Pop_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "accounts" */
export type Accounts_Stddev_Pop_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Stddev_Samp_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "accounts" */
export type Accounts_Stddev_Samp_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Accounts_Sum_Fields = {
  initial_amount?: Maybe<Scalars['numeric']>;
  minimum?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "accounts" */
export type Accounts_Sum_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
};

/** update columns of table "accounts" */
export enum Accounts_Update_Column {
  /** column name */
  Colour = 'colour',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InitialAmount = 'initial_amount',
  /** column name */
  LegacyKey = 'legacy_key',
  /** column name */
  Minimum = 'minimum',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Accounts_Var_Pop_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "accounts" */
export type Accounts_Var_Pop_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Accounts_Var_Samp_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "accounts" */
export type Accounts_Var_Samp_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Accounts_Variance_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "accounts" */
export type Accounts_Variance_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
};

/** columns and relationships of "categories" */
export type Categories = {
  /** An array relationship */
  categories: Array<Categories>;
  /** An aggregated array relationship */
  categories_aggregate: Categories_Aggregate;
  /** An object relationship */
  category?: Maybe<Categories>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  legacy_key?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent_category_id?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregated array relationship */
  transactions_aggregate: Transactions_Aggregate;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "categories" */
export type CategoriesCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** columns and relationships of "categories" */
export type CategoriesCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** columns and relationships of "categories" */
export type CategoriesTransactionsArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "categories" */
export type CategoriesTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  aggregate?: Maybe<Categories_Aggregate_Fields>;
  nodes: Array<Categories>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Categories_Max_Fields>;
  min?: Maybe<Categories_Min_Fields>;
};


/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Categories_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "categories" */
export type Categories_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Categories_Max_Order_By>;
  min?: Maybe<Categories_Min_Order_By>;
};

/** input type for inserting array relation for remote table "categories" */
export type Categories_Arr_Rel_Insert_Input = {
  data: Array<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Categories_Bool_Exp>>>;
  _not?: Maybe<Categories_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Categories_Bool_Exp>>>;
  categories?: Maybe<Categories_Bool_Exp>;
  category?: Maybe<Categories_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  legacy_key?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  parent_category_id?: Maybe<Uuid_Comparison_Exp>;
  transactions?: Maybe<Transactions_Bool_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint */
  CategoriesPkey = 'categories_pkey'
}

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  categories?: Maybe<Categories_Arr_Rel_Insert_Input>;
  category?: Maybe<Categories_Obj_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  legacy_key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_category_id?: Maybe<Scalars['uuid']>;
  transactions?: Maybe<Transactions_Arr_Rel_Insert_Input>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  legacy_key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "categories" */
export type Categories_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  legacy_key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "categories" */
export type Categories_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Categories>;
};

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input;
  on_conflict?: Maybe<Categories_On_Conflict>;
};

/** on conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint;
  update_columns: Array<Categories_Update_Column>;
  where?: Maybe<Categories_Bool_Exp>;
};

/** ordering options when selecting data from "categories" */
export type Categories_Order_By = {
  categories_aggregate?: Maybe<Categories_Aggregate_Order_By>;
  category?: Maybe<Categories_Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  parent_category_id?: Maybe<Order_By>;
  transactions_aggregate?: Maybe<Transactions_Aggregate_Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LegacyKey = 'legacy_key',
  /** column name */
  Name = 'name',
  /** column name */
  ParentCategoryId = 'parent_category_id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  legacy_key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_category_id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LegacyKey = 'legacy_key',
  /** column name */
  Name = 'name',
  /** column name */
  ParentCategoryId = 'parent_category_id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Func_Category_By_Date_Type_Args = {
  v_account_id?: Maybe<Scalars['uuid']>;
  v_category_type?: Maybe<Scalars['String']>;
  v_end_date?: Maybe<Scalars['timestamptz']>;
  v_parent?: Maybe<Scalars['Boolean']>;
  v_start_date?: Maybe<Scalars['timestamptz']>;
};

export type Func_Transactions_By_Account_Grouped_Cumulative_Args = {
  v_account_id?: Maybe<Scalars['uuid']>;
  v_group_by?: Maybe<Scalars['String']>;
  v_start_date?: Maybe<Scalars['timestamptz']>;
};

export type Func_Transactions_By_Category_Grouped_Args = {
  v_category_id?: Maybe<Scalars['uuid']>;
  v_group_by?: Maybe<Scalars['String']>;
};

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "accounts" */
  delete_accounts?: Maybe<Accounts_Mutation_Response>;
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete data from the table: "table_category_by_date_type" */
  delete_table_category_by_date_type?: Maybe<Table_Category_By_Date_Type_Mutation_Response>;
  /** delete data from the table: "table_transactions_by_category_grouped" */
  delete_table_transactions_by_category_grouped?: Maybe<Table_Transactions_By_Category_Grouped_Mutation_Response>;
  /** delete data from the table: "table_transactions_group_by" */
  delete_table_transactions_group_by?: Maybe<Table_Transactions_Group_By_Mutation_Response>;
  /** delete data from the table: "transactions" */
  delete_transactions?: Maybe<Transactions_Mutation_Response>;
  /** insert data into the table: "accounts" */
  insert_accounts?: Maybe<Accounts_Mutation_Response>;
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert data into the table: "table_category_by_date_type" */
  insert_table_category_by_date_type?: Maybe<Table_Category_By_Date_Type_Mutation_Response>;
  /** insert data into the table: "table_transactions_by_category_grouped" */
  insert_table_transactions_by_category_grouped?: Maybe<Table_Transactions_By_Category_Grouped_Mutation_Response>;
  /** insert data into the table: "table_transactions_group_by" */
  insert_table_transactions_group_by?: Maybe<Table_Transactions_Group_By_Mutation_Response>;
  /** insert data into the table: "transactions" */
  insert_transactions?: Maybe<Transactions_Mutation_Response>;
  /** update data of the table: "accounts" */
  update_accounts?: Maybe<Accounts_Mutation_Response>;
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>;
  /** update data of the table: "table_category_by_date_type" */
  update_table_category_by_date_type?: Maybe<Table_Category_By_Date_Type_Mutation_Response>;
  /** update data of the table: "table_transactions_by_category_grouped" */
  update_table_transactions_by_category_grouped?: Maybe<Table_Transactions_By_Category_Grouped_Mutation_Response>;
  /** update data of the table: "table_transactions_group_by" */
  update_table_transactions_group_by?: Maybe<Table_Transactions_Group_By_Mutation_Response>;
  /** update data of the table: "transactions" */
  update_transactions?: Maybe<Transactions_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootDelete_AccountsArgs = {
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_CategoriesArgs = {
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Table_Category_By_Date_TypeArgs = {
  where: Table_Category_By_Date_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Table_Transactions_By_Category_GroupedArgs = {
  where: Table_Transactions_By_Category_Grouped_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Table_Transactions_Group_ByArgs = {
  where: Table_Transactions_Group_By_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_TransactionsArgs = {
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_AccountsArgs = {
  objects: Array<Accounts_Insert_Input>;
  on_conflict?: Maybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>;
  on_conflict?: Maybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Category_By_Date_TypeArgs = {
  objects: Array<Table_Category_By_Date_Type_Insert_Input>;
  on_conflict?: Maybe<Table_Category_By_Date_Type_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Transactions_By_Category_GroupedArgs = {
  objects: Array<Table_Transactions_By_Category_Grouped_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Transactions_Group_ByArgs = {
  objects: Array<Table_Transactions_Group_By_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_TransactionsArgs = {
  objects: Array<Transactions_Insert_Input>;
  on_conflict?: Maybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountsArgs = {
  _set?: Maybe<Accounts_Set_Input>;
  where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_CategoriesArgs = {
  _set?: Maybe<Categories_Set_Input>;
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Table_Category_By_Date_TypeArgs = {
  _set?: Maybe<Table_Category_By_Date_Type_Set_Input>;
  where: Table_Category_By_Date_Type_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Table_Transactions_By_Category_GroupedArgs = {
  _set?: Maybe<Table_Transactions_By_Category_Grouped_Set_Input>;
  where: Table_Transactions_By_Category_Grouped_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Table_Transactions_Group_ByArgs = {
  _set?: Maybe<Table_Transactions_Group_By_Set_Input>;
  where: Table_Transactions_Group_By_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionsArgs = {
  _set?: Maybe<Transactions_Set_Input>;
  where: Transactions_Bool_Exp;
};


/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** execute function "func_category_by_date_type" which returns "table_category_by_date_type" */
  func_category_by_date_type: Array<Table_Category_By_Date_Type>;
  /** execute function "func_category_by_date_type" and query aggregates on result of table type "table_category_by_date_type" */
  func_category_by_date_type_aggregate: Table_Category_By_Date_Type_Aggregate;
  /** execute function "func_transactions_by_account_grouped_cumulative" which returns "table_transactions_group_by" */
  func_transactions_by_account_grouped_cumulative: Array<Table_Transactions_Group_By>;
  /**
   * execute function "func_transactions_by_account_grouped_cumulative" and query
   * aggregates on result of table type "table_transactions_group_by"
   */
  func_transactions_by_account_grouped_cumulative_aggregate: Table_Transactions_Group_By_Aggregate;
  /** execute function "func_transactions_by_category_grouped" which returns "table_transactions_by_category_grouped" */
  func_transactions_by_category_grouped: Array<Table_Transactions_By_Category_Grouped>;
  /**
   * execute function "func_transactions_by_category_grouped" and query aggregates
   * on result of table type "table_transactions_by_category_grouped"
   */
  func_transactions_by_category_grouped_aggregate: Table_Transactions_By_Category_Grouped_Aggregate;
  /** fetch data from the table: "table_category_by_date_type" */
  table_category_by_date_type: Array<Table_Category_By_Date_Type>;
  /** fetch aggregated fields from the table: "table_category_by_date_type" */
  table_category_by_date_type_aggregate: Table_Category_By_Date_Type_Aggregate;
  /** fetch data from the table: "table_category_by_date_type" using primary key columns */
  table_category_by_date_type_by_pk?: Maybe<Table_Category_By_Date_Type>;
  /** fetch data from the table: "table_transactions_by_category_grouped" */
  table_transactions_by_category_grouped: Array<Table_Transactions_By_Category_Grouped>;
  /** fetch aggregated fields from the table: "table_transactions_by_category_grouped" */
  table_transactions_by_category_grouped_aggregate: Table_Transactions_By_Category_Grouped_Aggregate;
  /** fetch data from the table: "table_transactions_group_by" */
  table_transactions_group_by: Array<Table_Transactions_Group_By>;
  /** fetch aggregated fields from the table: "table_transactions_group_by" */
  table_transactions_group_by_aggregate: Table_Transactions_Group_By_Aggregate;
  /** fetch data from the table: "transactions" */
  transactions: Array<Transactions>;
  /** fetch aggregated fields from the table: "transactions" */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table: "view_accounts" */
  view_accounts: Array<View_Accounts>;
  /** fetch aggregated fields from the table: "view_accounts" */
  view_accounts_aggregate: View_Accounts_Aggregate;
  /** fetch data from the table: "view_categories_with_parents" */
  view_categories_with_parents: Array<View_Categories_With_Parents>;
  /** fetch aggregated fields from the table: "view_categories_with_parents" */
  view_categories_with_parents_aggregate: View_Categories_With_Parents_Aggregate;
};


/** query root */
export type Query_RootAccountsArgs = {
  distinct_on?: Maybe<Array<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


/** query root */
export type Query_RootAccounts_AggregateArgs = {
  distinct_on?: Maybe<Array<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


/** query root */
export type Query_RootAccounts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** query root */
export type Query_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** query root */
export type Query_RootCategories_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootFunc_Category_By_Date_TypeArgs = {
  args: Func_Category_By_Date_Type_Args;
  distinct_on?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Category_By_Date_Type_Order_By>>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Category_By_Date_Type_AggregateArgs = {
  args: Func_Category_By_Date_Type_Args;
  distinct_on?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Category_By_Date_Type_Order_By>>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Transactions_By_Account_Grouped_CumulativeArgs = {
  args: Func_Transactions_By_Account_Grouped_Cumulative_Args;
  distinct_on?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_Group_By_Order_By>>;
  where?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Transactions_By_Account_Grouped_Cumulative_AggregateArgs = {
  args: Func_Transactions_By_Account_Grouped_Cumulative_Args;
  distinct_on?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_Group_By_Order_By>>;
  where?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Transactions_By_Category_GroupedArgs = {
  args: Func_Transactions_By_Category_Grouped_Args;
  distinct_on?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_By_Category_Grouped_Order_By>>;
  where?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Transactions_By_Category_Grouped_AggregateArgs = {
  args: Func_Transactions_By_Category_Grouped_Args;
  distinct_on?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_By_Category_Grouped_Order_By>>;
  where?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Category_By_Date_TypeArgs = {
  distinct_on?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Category_By_Date_Type_Order_By>>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Category_By_Date_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Category_By_Date_Type_Order_By>>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Category_By_Date_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootTable_Transactions_By_Category_GroupedArgs = {
  distinct_on?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_By_Category_Grouped_Order_By>>;
  where?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Transactions_By_Category_Grouped_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_By_Category_Grouped_Order_By>>;
  where?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Transactions_Group_ByArgs = {
  distinct_on?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_Group_By_Order_By>>;
  where?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Transactions_Group_By_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_Group_By_Order_By>>;
  where?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
};


/** query root */
export type Query_RootTransactionsArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** query root */
export type Query_RootTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** query root */
export type Query_RootTransactions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootView_AccountsArgs = {
  distinct_on?: Maybe<Array<View_Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<View_Accounts_Order_By>>;
  where?: Maybe<View_Accounts_Bool_Exp>;
};


/** query root */
export type Query_RootView_Accounts_AggregateArgs = {
  distinct_on?: Maybe<Array<View_Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<View_Accounts_Order_By>>;
  where?: Maybe<View_Accounts_Bool_Exp>;
};


/** query root */
export type Query_RootView_Categories_With_ParentsArgs = {
  distinct_on?: Maybe<Array<View_Categories_With_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<View_Categories_With_Parents_Order_By>>;
  where?: Maybe<View_Categories_With_Parents_Bool_Exp>;
};


/** query root */
export type Query_RootView_Categories_With_Parents_AggregateArgs = {
  distinct_on?: Maybe<Array<View_Categories_With_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<View_Categories_With_Parents_Order_By>>;
  where?: Maybe<View_Categories_With_Parents_Bool_Exp>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** subscription root */
export type Subscription_Root = {
  /** fetch data from the table: "accounts" */
  accounts: Array<Accounts>;
  /** fetch aggregated fields from the table: "accounts" */
  accounts_aggregate: Accounts_Aggregate;
  /** fetch data from the table: "accounts" using primary key columns */
  accounts_by_pk?: Maybe<Accounts>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** execute function "func_category_by_date_type" which returns "table_category_by_date_type" */
  func_category_by_date_type: Array<Table_Category_By_Date_Type>;
  /** execute function "func_category_by_date_type" and query aggregates on result of table type "table_category_by_date_type" */
  func_category_by_date_type_aggregate: Table_Category_By_Date_Type_Aggregate;
  /** execute function "func_transactions_by_account_grouped_cumulative" which returns "table_transactions_group_by" */
  func_transactions_by_account_grouped_cumulative: Array<Table_Transactions_Group_By>;
  /**
   * execute function "func_transactions_by_account_grouped_cumulative" and query
   * aggregates on result of table type "table_transactions_group_by"
   */
  func_transactions_by_account_grouped_cumulative_aggregate: Table_Transactions_Group_By_Aggregate;
  /** execute function "func_transactions_by_category_grouped" which returns "table_transactions_by_category_grouped" */
  func_transactions_by_category_grouped: Array<Table_Transactions_By_Category_Grouped>;
  /**
   * execute function "func_transactions_by_category_grouped" and query aggregates
   * on result of table type "table_transactions_by_category_grouped"
   */
  func_transactions_by_category_grouped_aggregate: Table_Transactions_By_Category_Grouped_Aggregate;
  /** fetch data from the table: "table_category_by_date_type" */
  table_category_by_date_type: Array<Table_Category_By_Date_Type>;
  /** fetch aggregated fields from the table: "table_category_by_date_type" */
  table_category_by_date_type_aggregate: Table_Category_By_Date_Type_Aggregate;
  /** fetch data from the table: "table_category_by_date_type" using primary key columns */
  table_category_by_date_type_by_pk?: Maybe<Table_Category_By_Date_Type>;
  /** fetch data from the table: "table_transactions_by_category_grouped" */
  table_transactions_by_category_grouped: Array<Table_Transactions_By_Category_Grouped>;
  /** fetch aggregated fields from the table: "table_transactions_by_category_grouped" */
  table_transactions_by_category_grouped_aggregate: Table_Transactions_By_Category_Grouped_Aggregate;
  /** fetch data from the table: "table_transactions_group_by" */
  table_transactions_group_by: Array<Table_Transactions_Group_By>;
  /** fetch aggregated fields from the table: "table_transactions_group_by" */
  table_transactions_group_by_aggregate: Table_Transactions_Group_By_Aggregate;
  /** fetch data from the table: "transactions" */
  transactions: Array<Transactions>;
  /** fetch aggregated fields from the table: "transactions" */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table: "view_accounts" */
  view_accounts: Array<View_Accounts>;
  /** fetch aggregated fields from the table: "view_accounts" */
  view_accounts_aggregate: View_Accounts_Aggregate;
  /** fetch data from the table: "view_categories_with_parents" */
  view_categories_with_parents: Array<View_Categories_With_Parents>;
  /** fetch aggregated fields from the table: "view_categories_with_parents" */
  view_categories_with_parents_aggregate: View_Categories_With_Parents_Aggregate;
};


/** subscription root */
export type Subscription_RootAccountsArgs = {
  distinct_on?: Maybe<Array<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccounts_AggregateArgs = {
  distinct_on?: Maybe<Array<Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Accounts_Order_By>>;
  where?: Maybe<Accounts_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccounts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootCategoriesArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Categories_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Categories_Order_By>>;
  where?: Maybe<Categories_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCategories_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootFunc_Category_By_Date_TypeArgs = {
  args: Func_Category_By_Date_Type_Args;
  distinct_on?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Category_By_Date_Type_Order_By>>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Category_By_Date_Type_AggregateArgs = {
  args: Func_Category_By_Date_Type_Args;
  distinct_on?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Category_By_Date_Type_Order_By>>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Transactions_By_Account_Grouped_CumulativeArgs = {
  args: Func_Transactions_By_Account_Grouped_Cumulative_Args;
  distinct_on?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_Group_By_Order_By>>;
  where?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Transactions_By_Account_Grouped_Cumulative_AggregateArgs = {
  args: Func_Transactions_By_Account_Grouped_Cumulative_Args;
  distinct_on?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_Group_By_Order_By>>;
  where?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Transactions_By_Category_GroupedArgs = {
  args: Func_Transactions_By_Category_Grouped_Args;
  distinct_on?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_By_Category_Grouped_Order_By>>;
  where?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Transactions_By_Category_Grouped_AggregateArgs = {
  args: Func_Transactions_By_Category_Grouped_Args;
  distinct_on?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_By_Category_Grouped_Order_By>>;
  where?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Category_By_Date_TypeArgs = {
  distinct_on?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Category_By_Date_Type_Order_By>>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Category_By_Date_Type_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Category_By_Date_Type_Order_By>>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Category_By_Date_Type_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTable_Transactions_By_Category_GroupedArgs = {
  distinct_on?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_By_Category_Grouped_Order_By>>;
  where?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Transactions_By_Category_Grouped_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_By_Category_Grouped_Order_By>>;
  where?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Transactions_Group_ByArgs = {
  distinct_on?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_Group_By_Order_By>>;
  where?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Transactions_Group_By_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Transactions_Group_By_Order_By>>;
  where?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTransactionsArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTransactions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootView_AccountsArgs = {
  distinct_on?: Maybe<Array<View_Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<View_Accounts_Order_By>>;
  where?: Maybe<View_Accounts_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootView_Accounts_AggregateArgs = {
  distinct_on?: Maybe<Array<View_Accounts_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<View_Accounts_Order_By>>;
  where?: Maybe<View_Accounts_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootView_Categories_With_ParentsArgs = {
  distinct_on?: Maybe<Array<View_Categories_With_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<View_Categories_With_Parents_Order_By>>;
  where?: Maybe<View_Categories_With_Parents_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootView_Categories_With_Parents_AggregateArgs = {
  distinct_on?: Maybe<Array<View_Categories_With_Parents_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<View_Categories_With_Parents_Order_By>>;
  where?: Maybe<View_Categories_With_Parents_Bool_Exp>;
};

/** columns and relationships of "table_category_by_date_type" */
export type Table_Category_By_Date_Type = {
  id: Scalars['uuid'];
  name: Scalars['String'];
  sum: Scalars['numeric'];
};

/** aggregated selection of "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Aggregate = {
  aggregate?: Maybe<Table_Category_By_Date_Type_Aggregate_Fields>;
  nodes: Array<Table_Category_By_Date_Type>;
};

/** aggregate fields of "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Aggregate_Fields = {
  avg?: Maybe<Table_Category_By_Date_Type_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Table_Category_By_Date_Type_Max_Fields>;
  min?: Maybe<Table_Category_By_Date_Type_Min_Fields>;
  stddev?: Maybe<Table_Category_By_Date_Type_Stddev_Fields>;
  stddev_pop?: Maybe<Table_Category_By_Date_Type_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Table_Category_By_Date_Type_Stddev_Samp_Fields>;
  sum?: Maybe<Table_Category_By_Date_Type_Sum_Fields>;
  var_pop?: Maybe<Table_Category_By_Date_Type_Var_Pop_Fields>;
  var_samp?: Maybe<Table_Category_By_Date_Type_Var_Samp_Fields>;
  variance?: Maybe<Table_Category_By_Date_Type_Variance_Fields>;
};


/** aggregate fields of "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Table_Category_By_Date_Type_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Aggregate_Order_By = {
  avg?: Maybe<Table_Category_By_Date_Type_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Table_Category_By_Date_Type_Max_Order_By>;
  min?: Maybe<Table_Category_By_Date_Type_Min_Order_By>;
  stddev?: Maybe<Table_Category_By_Date_Type_Stddev_Order_By>;
  stddev_pop?: Maybe<Table_Category_By_Date_Type_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Table_Category_By_Date_Type_Stddev_Samp_Order_By>;
  sum?: Maybe<Table_Category_By_Date_Type_Sum_Order_By>;
  var_pop?: Maybe<Table_Category_By_Date_Type_Var_Pop_Order_By>;
  var_samp?: Maybe<Table_Category_By_Date_Type_Var_Samp_Order_By>;
  variance?: Maybe<Table_Category_By_Date_Type_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Arr_Rel_Insert_Input = {
  data: Array<Table_Category_By_Date_Type_Insert_Input>;
  on_conflict?: Maybe<Table_Category_By_Date_Type_On_Conflict>;
};

/** aggregate avg on columns */
export type Table_Category_By_Date_Type_Avg_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Avg_Order_By = {
  sum?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table "table_category_by_date_type".
 * All fields are combined with a logical 'AND'.
 */
export type Table_Category_By_Date_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Table_Category_By_Date_Type_Bool_Exp>>>;
  _not?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Table_Category_By_Date_Type_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  sum?: Maybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "table_category_by_date_type" */
export enum Table_Category_By_Date_Type_Constraint {
  /** unique or primary key constraint */
  TableCategoryByDateTypePkey = 'table_category_by_date_type_pkey'
}

/** input type for inserting data into table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Table_Category_By_Date_Type_Max_Fields = {
  name?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Max_Order_By = {
  name?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Table_Category_By_Date_Type_Min_Fields = {
  name?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Min_Order_By = {
  name?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** response of any mutation on the table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Table_Category_By_Date_Type>;
};

/** input type for inserting object relation for remote table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Obj_Rel_Insert_Input = {
  data: Table_Category_By_Date_Type_Insert_Input;
  on_conflict?: Maybe<Table_Category_By_Date_Type_On_Conflict>;
};

/** on conflict condition type for table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_On_Conflict = {
  constraint: Table_Category_By_Date_Type_Constraint;
  update_columns: Array<Table_Category_By_Date_Type_Update_Column>;
  where?: Maybe<Table_Category_By_Date_Type_Bool_Exp>;
};

/** ordering options when selecting data from "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** select columns of table "table_category_by_date_type" */
export enum Table_Category_By_Date_Type_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Sum = 'sum'
}

/** input type for updating data in table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Table_Category_By_Date_Type_Stddev_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Stddev_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Table_Category_By_Date_Type_Stddev_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Stddev_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Table_Category_By_Date_Type_Stddev_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Stddev_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Table_Category_By_Date_Type_Sum_Fields = {
  sum?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Sum_Order_By = {
  sum?: Maybe<Order_By>;
};

/** update columns of table "table_category_by_date_type" */
export enum Table_Category_By_Date_Type_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Sum = 'sum'
}

/** aggregate var_pop on columns */
export type Table_Category_By_Date_Type_Var_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Var_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Table_Category_By_Date_Type_Var_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Var_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Table_Category_By_Date_Type_Variance_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "table_category_by_date_type" */
export type Table_Category_By_Date_Type_Variance_Order_By = {
  sum?: Maybe<Order_By>;
};

/** columns and relationships of "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped = {
  balance: Scalars['numeric'];
  date: Scalars['timestamptz'];
  expense: Scalars['numeric'];
  income: Scalars['numeric'];
};

/** aggregated selection of "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Aggregate = {
  aggregate?: Maybe<Table_Transactions_By_Category_Grouped_Aggregate_Fields>;
  nodes: Array<Table_Transactions_By_Category_Grouped>;
};

/** aggregate fields of "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Aggregate_Fields = {
  avg?: Maybe<Table_Transactions_By_Category_Grouped_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Table_Transactions_By_Category_Grouped_Max_Fields>;
  min?: Maybe<Table_Transactions_By_Category_Grouped_Min_Fields>;
  stddev?: Maybe<Table_Transactions_By_Category_Grouped_Stddev_Fields>;
  stddev_pop?: Maybe<Table_Transactions_By_Category_Grouped_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Table_Transactions_By_Category_Grouped_Stddev_Samp_Fields>;
  sum?: Maybe<Table_Transactions_By_Category_Grouped_Sum_Fields>;
  var_pop?: Maybe<Table_Transactions_By_Category_Grouped_Var_Pop_Fields>;
  var_samp?: Maybe<Table_Transactions_By_Category_Grouped_Var_Samp_Fields>;
  variance?: Maybe<Table_Transactions_By_Category_Grouped_Variance_Fields>;
};


/** aggregate fields of "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Table_Transactions_By_Category_Grouped_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Aggregate_Order_By = {
  avg?: Maybe<Table_Transactions_By_Category_Grouped_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Table_Transactions_By_Category_Grouped_Max_Order_By>;
  min?: Maybe<Table_Transactions_By_Category_Grouped_Min_Order_By>;
  stddev?: Maybe<Table_Transactions_By_Category_Grouped_Stddev_Order_By>;
  stddev_pop?: Maybe<Table_Transactions_By_Category_Grouped_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Table_Transactions_By_Category_Grouped_Stddev_Samp_Order_By>;
  sum?: Maybe<Table_Transactions_By_Category_Grouped_Sum_Order_By>;
  var_pop?: Maybe<Table_Transactions_By_Category_Grouped_Var_Pop_Order_By>;
  var_samp?: Maybe<Table_Transactions_By_Category_Grouped_Var_Samp_Order_By>;
  variance?: Maybe<Table_Transactions_By_Category_Grouped_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Arr_Rel_Insert_Input = {
  data: Array<Table_Transactions_By_Category_Grouped_Insert_Input>;
};

/** aggregate avg on columns */
export type Table_Transactions_By_Category_Grouped_Avg_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Avg_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table
 * "table_transactions_by_category_grouped". All fields are combined with a logical 'AND'.
 */
export type Table_Transactions_By_Category_Grouped_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>>>;
  _not?: Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Table_Transactions_By_Category_Grouped_Bool_Exp>>>;
  balance?: Maybe<Numeric_Comparison_Exp>;
  date?: Maybe<Timestamptz_Comparison_Exp>;
  expense?: Maybe<Numeric_Comparison_Exp>;
  income?: Maybe<Numeric_Comparison_Exp>;
};

/** input type for inserting data into table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Insert_Input = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Table_Transactions_By_Category_Grouped_Max_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Max_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Table_Transactions_By_Category_Grouped_Min_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Min_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** response of any mutation on the table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Table_Transactions_By_Category_Grouped>;
};

/** input type for inserting object relation for remote table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Obj_Rel_Insert_Input = {
  data: Table_Transactions_By_Category_Grouped_Insert_Input;
};

/** ordering options when selecting data from "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** select columns of table "table_transactions_by_category_grouped" */
export enum Table_Transactions_By_Category_Grouped_Select_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  Date = 'date',
  /** column name */
  Expense = 'expense',
  /** column name */
  Income = 'income'
}

/** input type for updating data in table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Set_Input = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Table_Transactions_By_Category_Grouped_Stddev_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Stddev_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Table_Transactions_By_Category_Grouped_Stddev_Pop_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Stddev_Pop_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Table_Transactions_By_Category_Grouped_Stddev_Samp_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Stddev_Samp_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Table_Transactions_By_Category_Grouped_Sum_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Sum_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Table_Transactions_By_Category_Grouped_Var_Pop_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Var_Pop_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Table_Transactions_By_Category_Grouped_Var_Samp_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Var_Samp_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Table_Transactions_By_Category_Grouped_Variance_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Variance_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** columns and relationships of "table_transactions_group_by" */
export type Table_Transactions_Group_By = {
  date: Scalars['timestamptz'];
  sum: Scalars['numeric'];
};

/** aggregated selection of "table_transactions_group_by" */
export type Table_Transactions_Group_By_Aggregate = {
  aggregate?: Maybe<Table_Transactions_Group_By_Aggregate_Fields>;
  nodes: Array<Table_Transactions_Group_By>;
};

/** aggregate fields of "table_transactions_group_by" */
export type Table_Transactions_Group_By_Aggregate_Fields = {
  avg?: Maybe<Table_Transactions_Group_By_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Table_Transactions_Group_By_Max_Fields>;
  min?: Maybe<Table_Transactions_Group_By_Min_Fields>;
  stddev?: Maybe<Table_Transactions_Group_By_Stddev_Fields>;
  stddev_pop?: Maybe<Table_Transactions_Group_By_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Table_Transactions_Group_By_Stddev_Samp_Fields>;
  sum?: Maybe<Table_Transactions_Group_By_Sum_Fields>;
  var_pop?: Maybe<Table_Transactions_Group_By_Var_Pop_Fields>;
  var_samp?: Maybe<Table_Transactions_Group_By_Var_Samp_Fields>;
  variance?: Maybe<Table_Transactions_Group_By_Variance_Fields>;
};


/** aggregate fields of "table_transactions_group_by" */
export type Table_Transactions_Group_By_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Table_Transactions_Group_By_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Aggregate_Order_By = {
  avg?: Maybe<Table_Transactions_Group_By_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Table_Transactions_Group_By_Max_Order_By>;
  min?: Maybe<Table_Transactions_Group_By_Min_Order_By>;
  stddev?: Maybe<Table_Transactions_Group_By_Stddev_Order_By>;
  stddev_pop?: Maybe<Table_Transactions_Group_By_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Table_Transactions_Group_By_Stddev_Samp_Order_By>;
  sum?: Maybe<Table_Transactions_Group_By_Sum_Order_By>;
  var_pop?: Maybe<Table_Transactions_Group_By_Var_Pop_Order_By>;
  var_samp?: Maybe<Table_Transactions_Group_By_Var_Samp_Order_By>;
  variance?: Maybe<Table_Transactions_Group_By_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Arr_Rel_Insert_Input = {
  data: Array<Table_Transactions_Group_By_Insert_Input>;
};

/** aggregate avg on columns */
export type Table_Transactions_Group_By_Avg_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Avg_Order_By = {
  sum?: Maybe<Order_By>;
};

/**
 * Boolean expression to filter rows from the table "table_transactions_group_by".
 * All fields are combined with a logical 'AND'.
 */
export type Table_Transactions_Group_By_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Table_Transactions_Group_By_Bool_Exp>>>;
  _not?: Maybe<Table_Transactions_Group_By_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Table_Transactions_Group_By_Bool_Exp>>>;
  date?: Maybe<Timestamptz_Comparison_Exp>;
  sum?: Maybe<Numeric_Comparison_Exp>;
};

/** input type for inserting data into table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Insert_Input = {
  date?: Maybe<Scalars['timestamptz']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Table_Transactions_Group_By_Max_Fields = {
  date?: Maybe<Scalars['timestamptz']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Max_Order_By = {
  date?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Table_Transactions_Group_By_Min_Fields = {
  date?: Maybe<Scalars['timestamptz']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Min_Order_By = {
  date?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** response of any mutation on the table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Table_Transactions_Group_By>;
};

/** input type for inserting object relation for remote table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Obj_Rel_Insert_Input = {
  data: Table_Transactions_Group_By_Insert_Input;
};

/** ordering options when selecting data from "table_transactions_group_by" */
export type Table_Transactions_Group_By_Order_By = {
  date?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** select columns of table "table_transactions_group_by" */
export enum Table_Transactions_Group_By_Select_Column {
  /** column name */
  Date = 'date',
  /** column name */
  Sum = 'sum'
}

/** input type for updating data in table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Set_Input = {
  date?: Maybe<Scalars['timestamptz']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Table_Transactions_Group_By_Stddev_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Stddev_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Table_Transactions_Group_By_Stddev_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Stddev_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Table_Transactions_Group_By_Stddev_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Stddev_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Table_Transactions_Group_By_Sum_Fields = {
  sum?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Sum_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Table_Transactions_Group_By_Var_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Var_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Table_Transactions_Group_By_Var_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Var_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Table_Transactions_Group_By_Variance_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "table_transactions_group_by" */
export type Table_Transactions_Group_By_Variance_Order_By = {
  sum?: Maybe<Order_By>;
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "transactions" */
export type Transactions = {
  /** An object relationship */
  account: Accounts;
  account_id: Scalars['uuid'];
  amount: Scalars['numeric'];
  /** An object relationship */
  category: Categories;
  /** Defaults to the None category */
  category_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  date: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  linkedAccount?: Maybe<Accounts>;
  linked_account_id?: Maybe<Scalars['uuid']>;
  pair_id?: Maybe<Scalars['uuid']>;
  paired_with_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  transaction?: Maybe<Transactions>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregated array relationship */
  transactions_aggregate: Transactions_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "transactions" */
export type TransactionsTransactionsArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "transactions" */
export type TransactionsTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transactions_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transactions_Order_By>>;
  where?: Maybe<Transactions_Bool_Exp>;
};

/** aggregated selection of "transactions" */
export type Transactions_Aggregate = {
  aggregate?: Maybe<Transactions_Aggregate_Fields>;
  nodes: Array<Transactions>;
};

/** aggregate fields of "transactions" */
export type Transactions_Aggregate_Fields = {
  avg?: Maybe<Transactions_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Transactions_Max_Fields>;
  min?: Maybe<Transactions_Min_Fields>;
  stddev?: Maybe<Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Transactions_Sum_Fields>;
  var_pop?: Maybe<Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Transactions_Var_Samp_Fields>;
  variance?: Maybe<Transactions_Variance_Fields>;
};


/** aggregate fields of "transactions" */
export type Transactions_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Transactions_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "transactions" */
export type Transactions_Aggregate_Order_By = {
  avg?: Maybe<Transactions_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Transactions_Max_Order_By>;
  min?: Maybe<Transactions_Min_Order_By>;
  stddev?: Maybe<Transactions_Stddev_Order_By>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Order_By>;
  sum?: Maybe<Transactions_Sum_Order_By>;
  var_pop?: Maybe<Transactions_Var_Pop_Order_By>;
  var_samp?: Maybe<Transactions_Var_Samp_Order_By>;
  variance?: Maybe<Transactions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "transactions" */
export type Transactions_Arr_Rel_Insert_Input = {
  data: Array<Transactions_Insert_Input>;
  on_conflict?: Maybe<Transactions_On_Conflict>;
};

/** aggregate avg on columns */
export type Transactions_Avg_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "transactions" */
export type Transactions_Avg_Order_By = {
  amount?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transactions". All fields are combined with a logical 'AND'. */
export type Transactions_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Transactions_Bool_Exp>>>;
  _not?: Maybe<Transactions_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Transactions_Bool_Exp>>>;
  account?: Maybe<Accounts_Bool_Exp>;
  account_id?: Maybe<Uuid_Comparison_Exp>;
  amount?: Maybe<Numeric_Comparison_Exp>;
  category?: Maybe<Categories_Bool_Exp>;
  category_id?: Maybe<Uuid_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  date?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  linkedAccount?: Maybe<Accounts_Bool_Exp>;
  linked_account_id?: Maybe<Uuid_Comparison_Exp>;
  pair_id?: Maybe<Uuid_Comparison_Exp>;
  paired_with_id?: Maybe<Uuid_Comparison_Exp>;
  transaction?: Maybe<Transactions_Bool_Exp>;
  transactions?: Maybe<Transactions_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "transactions" */
export enum Transactions_Constraint {
  /** unique or primary key constraint */
  TransactionsPkey = 'transactions_pkey'
}

/** input type for inserting data into table "transactions" */
export type Transactions_Insert_Input = {
  account?: Maybe<Accounts_Obj_Rel_Insert_Input>;
  account_id?: Maybe<Scalars['uuid']>;
  amount?: Maybe<Scalars['numeric']>;
  category?: Maybe<Categories_Obj_Rel_Insert_Input>;
  category_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  date?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  linkedAccount?: Maybe<Accounts_Obj_Rel_Insert_Input>;
  linked_account_id?: Maybe<Scalars['uuid']>;
  pair_id?: Maybe<Scalars['uuid']>;
  paired_with_id?: Maybe<Scalars['uuid']>;
  transaction?: Maybe<Transactions_Obj_Rel_Insert_Input>;
  transactions?: Maybe<Transactions_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Transactions_Max_Fields = {
  amount?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  date?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "transactions" */
export type Transactions_Max_Order_By = {
  amount?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Transactions_Min_Fields = {
  amount?: Maybe<Scalars['numeric']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  date?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "transactions" */
export type Transactions_Min_Order_By = {
  amount?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "transactions" */
export type Transactions_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Transactions>;
};

/** input type for inserting object relation for remote table "transactions" */
export type Transactions_Obj_Rel_Insert_Input = {
  data: Transactions_Insert_Input;
  on_conflict?: Maybe<Transactions_On_Conflict>;
};

/** on conflict condition type for table "transactions" */
export type Transactions_On_Conflict = {
  constraint: Transactions_Constraint;
  update_columns: Array<Transactions_Update_Column>;
  where?: Maybe<Transactions_Bool_Exp>;
};

/** ordering options when selecting data from "transactions" */
export type Transactions_Order_By = {
  account?: Maybe<Accounts_Order_By>;
  account_id?: Maybe<Order_By>;
  amount?: Maybe<Order_By>;
  category?: Maybe<Categories_Order_By>;
  category_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  linkedAccount?: Maybe<Accounts_Order_By>;
  linked_account_id?: Maybe<Order_By>;
  pair_id?: Maybe<Order_By>;
  paired_with_id?: Maybe<Order_By>;
  transaction?: Maybe<Transactions_Order_By>;
  transactions_aggregate?: Maybe<Transactions_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "transactions" */
export enum Transactions_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  LinkedAccountId = 'linked_account_id',
  /** column name */
  PairId = 'pair_id',
  /** column name */
  PairedWithId = 'paired_with_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "transactions" */
export type Transactions_Set_Input = {
  account_id?: Maybe<Scalars['uuid']>;
  amount?: Maybe<Scalars['numeric']>;
  category_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  date?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  linked_account_id?: Maybe<Scalars['uuid']>;
  pair_id?: Maybe<Scalars['uuid']>;
  paired_with_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Transactions_Stddev_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "transactions" */
export type Transactions_Stddev_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transactions_Stddev_Pop_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "transactions" */
export type Transactions_Stddev_Pop_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transactions_Stddev_Samp_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "transactions" */
export type Transactions_Stddev_Samp_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Transactions_Sum_Fields = {
  amount?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "transactions" */
export type Transactions_Sum_Order_By = {
  amount?: Maybe<Order_By>;
};

/** update columns of table "transactions" */
export enum Transactions_Update_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Amount = 'amount',
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Date = 'date',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  LinkedAccountId = 'linked_account_id',
  /** column name */
  PairId = 'pair_id',
  /** column name */
  PairedWithId = 'paired_with_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Transactions_Var_Pop_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "transactions" */
export type Transactions_Var_Pop_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transactions_Var_Samp_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "transactions" */
export type Transactions_Var_Samp_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Transactions_Variance_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "transactions" */
export type Transactions_Variance_Order_By = {
  amount?: Maybe<Order_By>;
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "view_accounts" */
export type View_Accounts = {
  account_id?: Maybe<Scalars['uuid']>;
  colour?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  initial_amount?: Maybe<Scalars['numeric']>;
  legacy_key?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['numeric']>;
  most_recent_transaction_date?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "view_accounts" */
export type View_Accounts_Aggregate = {
  aggregate?: Maybe<View_Accounts_Aggregate_Fields>;
  nodes: Array<View_Accounts>;
};

/** aggregate fields of "view_accounts" */
export type View_Accounts_Aggregate_Fields = {
  avg?: Maybe<View_Accounts_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<View_Accounts_Max_Fields>;
  min?: Maybe<View_Accounts_Min_Fields>;
  stddev?: Maybe<View_Accounts_Stddev_Fields>;
  stddev_pop?: Maybe<View_Accounts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<View_Accounts_Stddev_Samp_Fields>;
  sum?: Maybe<View_Accounts_Sum_Fields>;
  var_pop?: Maybe<View_Accounts_Var_Pop_Fields>;
  var_samp?: Maybe<View_Accounts_Var_Samp_Fields>;
  variance?: Maybe<View_Accounts_Variance_Fields>;
};


/** aggregate fields of "view_accounts" */
export type View_Accounts_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<View_Accounts_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "view_accounts" */
export type View_Accounts_Aggregate_Order_By = {
  avg?: Maybe<View_Accounts_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<View_Accounts_Max_Order_By>;
  min?: Maybe<View_Accounts_Min_Order_By>;
  stddev?: Maybe<View_Accounts_Stddev_Order_By>;
  stddev_pop?: Maybe<View_Accounts_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<View_Accounts_Stddev_Samp_Order_By>;
  sum?: Maybe<View_Accounts_Sum_Order_By>;
  var_pop?: Maybe<View_Accounts_Var_Pop_Order_By>;
  var_samp?: Maybe<View_Accounts_Var_Samp_Order_By>;
  variance?: Maybe<View_Accounts_Variance_Order_By>;
};

/** aggregate avg on columns */
export type View_Accounts_Avg_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "view_accounts" */
export type View_Accounts_Avg_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "view_accounts". All fields are combined with a logical 'AND'. */
export type View_Accounts_Bool_Exp = {
  _and?: Maybe<Array<Maybe<View_Accounts_Bool_Exp>>>;
  _not?: Maybe<View_Accounts_Bool_Exp>;
  _or?: Maybe<Array<Maybe<View_Accounts_Bool_Exp>>>;
  account_id?: Maybe<Uuid_Comparison_Exp>;
  colour?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  initial_amount?: Maybe<Numeric_Comparison_Exp>;
  legacy_key?: Maybe<String_Comparison_Exp>;
  minimum?: Maybe<Numeric_Comparison_Exp>;
  most_recent_transaction_date?: Maybe<Timestamptz_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  sum?: Maybe<Numeric_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type View_Accounts_Max_Fields = {
  colour?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  initial_amount?: Maybe<Scalars['numeric']>;
  legacy_key?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['numeric']>;
  most_recent_transaction_date?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "view_accounts" */
export type View_Accounts_Max_Order_By = {
  colour?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  initial_amount?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  most_recent_transaction_date?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type View_Accounts_Min_Fields = {
  colour?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  initial_amount?: Maybe<Scalars['numeric']>;
  legacy_key?: Maybe<Scalars['String']>;
  minimum?: Maybe<Scalars['numeric']>;
  most_recent_transaction_date?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "view_accounts" */
export type View_Accounts_Min_Order_By = {
  colour?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  initial_amount?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  most_recent_transaction_date?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** ordering options when selecting data from "view_accounts" */
export type View_Accounts_Order_By = {
  account_id?: Maybe<Order_By>;
  colour?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initial_amount?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  most_recent_transaction_date?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** select columns of table "view_accounts" */
export enum View_Accounts_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Colour = 'colour',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InitialAmount = 'initial_amount',
  /** column name */
  LegacyKey = 'legacy_key',
  /** column name */
  Minimum = 'minimum',
  /** column name */
  MostRecentTransactionDate = 'most_recent_transaction_date',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status',
  /** column name */
  Sum = 'sum',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type View_Accounts_Stddev_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "view_accounts" */
export type View_Accounts_Stddev_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type View_Accounts_Stddev_Pop_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "view_accounts" */
export type View_Accounts_Stddev_Pop_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type View_Accounts_Stddev_Samp_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "view_accounts" */
export type View_Accounts_Stddev_Samp_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type View_Accounts_Sum_Fields = {
  initial_amount?: Maybe<Scalars['numeric']>;
  minimum?: Maybe<Scalars['numeric']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "view_accounts" */
export type View_Accounts_Sum_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type View_Accounts_Var_Pop_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "view_accounts" */
export type View_Accounts_Var_Pop_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type View_Accounts_Var_Samp_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "view_accounts" */
export type View_Accounts_Var_Samp_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type View_Accounts_Variance_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "view_accounts" */
export type View_Accounts_Variance_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** columns and relationships of "view_categories_with_parents" */
export type View_Categories_With_Parents = {
  full_name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  parent_category_id?: Maybe<Scalars['uuid']>;
  parent_category_name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregated selection of "view_categories_with_parents" */
export type View_Categories_With_Parents_Aggregate = {
  aggregate?: Maybe<View_Categories_With_Parents_Aggregate_Fields>;
  nodes: Array<View_Categories_With_Parents>;
};

/** aggregate fields of "view_categories_with_parents" */
export type View_Categories_With_Parents_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<View_Categories_With_Parents_Max_Fields>;
  min?: Maybe<View_Categories_With_Parents_Min_Fields>;
};


/** aggregate fields of "view_categories_with_parents" */
export type View_Categories_With_Parents_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<View_Categories_With_Parents_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "view_categories_with_parents" */
export type View_Categories_With_Parents_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<View_Categories_With_Parents_Max_Order_By>;
  min?: Maybe<View_Categories_With_Parents_Min_Order_By>;
};

/**
 * Boolean expression to filter rows from the table "view_categories_with_parents".
 * All fields are combined with a logical 'AND'.
 */
export type View_Categories_With_Parents_Bool_Exp = {
  _and?: Maybe<Array<Maybe<View_Categories_With_Parents_Bool_Exp>>>;
  _not?: Maybe<View_Categories_With_Parents_Bool_Exp>;
  _or?: Maybe<Array<Maybe<View_Categories_With_Parents_Bool_Exp>>>;
  full_name?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  parent_category_id?: Maybe<Uuid_Comparison_Exp>;
  parent_category_name?: Maybe<String_Comparison_Exp>;
  type?: Maybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type View_Categories_With_Parents_Max_Fields = {
  full_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_category_name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "view_categories_with_parents" */
export type View_Categories_With_Parents_Max_Order_By = {
  full_name?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  parent_category_name?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type View_Categories_With_Parents_Min_Fields = {
  full_name?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_category_name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "view_categories_with_parents" */
export type View_Categories_With_Parents_Min_Order_By = {
  full_name?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  parent_category_name?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** ordering options when selecting data from "view_categories_with_parents" */
export type View_Categories_With_Parents_Order_By = {
  full_name?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  parent_category_id?: Maybe<Order_By>;
  parent_category_name?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
};

/** select columns of table "view_categories_with_parents" */
export enum View_Categories_With_Parents_Select_Column {
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  ParentCategoryId = 'parent_category_id',
  /** column name */
  ParentCategoryName = 'parent_category_name',
  /** column name */
  Type = 'type'
}

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
}>;


export type CreateCategoryMutation = { insert_categories?: Maybe<(
    Pick<Categories_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      Pick<Categories, 'id' | 'name' | 'type'>
      & { key: Categories['id'] }
    )> }
  )> };

export type DeleteCategoryMutationVariables = Exact<{
  id?: Maybe<Scalars['uuid']>;
}>;


export type DeleteCategoryMutation = { delete_categories?: Maybe<(
    Pick<Categories_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      Pick<Categories, 'id' | 'name' | 'type'>
      & { key: Categories['id'] }
    )> }
  )> };

export type DeleteTransactionsMutationVariables = Exact<{
  transactionIds: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type DeleteTransactionsMutation = { delete_transactions?: Maybe<Pick<Transactions_Mutation_Response, 'affected_rows'>> };

export type PairTransactionsMutationVariables = Exact<{
  transactionIds: Array<Scalars['uuid']> | Scalars['uuid'];
  setLinkedAccountId?: Maybe<Scalars['uuid']>;
  setPairId?: Maybe<Scalars['uuid']>;
}>;


export type PairTransactionsMutation = { update_transactions?: Maybe<Pick<Transactions_Mutation_Response, 'affected_rows'>> };

export type UnpairTransactionsMutationVariables = Exact<{
  pairIds: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type UnpairTransactionsMutation = { update_transactions?: Maybe<Pick<Transactions_Mutation_Response, 'affected_rows'>> };

export type UpdateTransactionsCategoryMutationVariables = Exact<{
  transactionIds: Array<Scalars['uuid']> | Scalars['uuid'];
  categoryId?: Maybe<Scalars['uuid']>;
}>;


export type UpdateTransactionsCategoryMutation = { update_transactions?: Maybe<(
    Pick<Transactions_Mutation_Response, 'affected_rows'>
    & { returning: Array<{ category: Pick<Categories, 'name'> }> }
  )> };

export type GetAmountGroupsQueryVariables = Exact<{
  startDate?: Maybe<Scalars['timestamptz']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  categoryId?: Maybe<Scalars['uuid']>;
  groupBy?: Maybe<Scalars['String']>;
}>;


export type GetAmountGroupsQuery = { groups: Array<Pick<Table_Transactions_By_Category_Grouped, 'date' | 'balance' | 'expense' | 'income'>>, aggregate: { aggregate?: Maybe<{ avg?: Maybe<Pick<Table_Transactions_By_Category_Grouped_Avg_Fields, 'balance' | 'expense' | 'income'>>, max?: Maybe<Pick<Table_Transactions_By_Category_Grouped_Max_Fields, 'balance' | 'income'>>, min?: Maybe<Pick<Table_Transactions_By_Category_Grouped_Min_Fields, 'expense'>> }> } };

export type GetBalanceQueryVariables = Exact<{
  startDate?: Maybe<Scalars['timestamptz']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  accountId?: Maybe<Scalars['uuid']>;
  groupBy?: Maybe<Scalars['String']>;
}>;


export type GetBalanceQuery = { balances: Array<Pick<Table_Transactions_Group_By, 'date' | 'sum'>> };

export type GetBaseDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBaseDataQuery = { accounts: Array<(
    Pick<View_Accounts, 'id' | 'name' | 'sum' | 'minimum' | 'colour' | 'status'>
    & { key: View_Accounts['id'], initialAmount: View_Accounts['initial_amount'], mostRecentTransactionDate: View_Accounts['most_recent_transaction_date'] }
  )>, categories: Array<(
    Pick<Categories, 'id' | 'name' | 'type'>
    & { key: Categories['id'] }
  )> };

export type GetCategoriesQueryVariables = Exact<{
  startDate?: Maybe<Scalars['timestamptz']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  accountId?: Maybe<Scalars['uuid']>;
  categoryType?: Maybe<Scalars['String']>;
  groupByParent?: Maybe<Scalars['Boolean']>;
}>;


export type GetCategoriesQuery = { categories: Array<Pick<Table_Category_By_Date_Type, 'id' | 'name' | 'sum'>>, amount: { aggregate?: Maybe<{ sum?: Maybe<Pick<Table_Category_By_Date_Type_Sum_Fields, 'sum'>> }> } };

export type GetTransactionsQueryVariables = Exact<{
  startDate?: Maybe<Scalars['timestamptz']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  categoryIds?: Maybe<Array<Scalars['uuid']> | Scalars['uuid']>;
  accountId?: Maybe<Scalars['uuid']>;
  searchText: Scalars['String'];
  searchAmount: Scalars['numeric'];
  searchAmountComplement: Scalars['numeric'];
}>;


export type GetTransactionsQuery = { transactions_aggregate: { aggregate?: Maybe<Pick<Transactions_Aggregate_Fields, 'count'>>, nodes: Array<(
      Pick<Transactions, 'id' | 'date' | 'amount' | 'description' | 'pair_id'>
      & { key: Transactions['id'] }
      & { account: Pick<Accounts, 'id' | 'name' | 'colour'>, linkedAccount?: Maybe<Pick<Accounts, 'id' | 'name' | 'colour'>>, category: Pick<Categories, 'id' | 'name'> }
    )> } };


export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!, $type: String) {
  insert_categories(objects: {name: $name, type: $type}) {
    affected_rows
    returning {
      id
      key: id
      name
      type
    }
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, baseOptions);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($id: uuid) {
  delete_categories(where: {id: {_eq: $id}}) {
    affected_rows
    returning {
      id
      key: id
      name
      type
    }
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, baseOptions);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteTransactionsDocument = gql`
    mutation DeleteTransactions($transactionIds: [uuid!]!) {
  delete_transactions(where: {id: {_in: $transactionIds}}) {
    affected_rows
  }
}
    `;
export type DeleteTransactionsMutationFn = Apollo.MutationFunction<DeleteTransactionsMutation, DeleteTransactionsMutationVariables>;

/**
 * __useDeleteTransactionsMutation__
 *
 * To run a mutation, you first call `useDeleteTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTransactionsMutation, { data, loading, error }] = useDeleteTransactionsMutation({
 *   variables: {
 *      transactionIds: // value for 'transactionIds'
 *   },
 * });
 */
export function useDeleteTransactionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTransactionsMutation, DeleteTransactionsMutationVariables>) {
        return Apollo.useMutation<DeleteTransactionsMutation, DeleteTransactionsMutationVariables>(DeleteTransactionsDocument, baseOptions);
      }
export type DeleteTransactionsMutationHookResult = ReturnType<typeof useDeleteTransactionsMutation>;
export type DeleteTransactionsMutationResult = Apollo.MutationResult<DeleteTransactionsMutation>;
export type DeleteTransactionsMutationOptions = Apollo.BaseMutationOptions<DeleteTransactionsMutation, DeleteTransactionsMutationVariables>;
export const PairTransactionsDocument = gql`
    mutation PairTransactions($transactionIds: [uuid!]!, $setLinkedAccountId: uuid, $setPairId: uuid) {
  update_transactions(where: {id: {_in: $transactionIds}}, _set: {updated_at: "now", linked_account_id: $setLinkedAccountId, pair_id: $setPairId}) {
    affected_rows
  }
}
    `;
export type PairTransactionsMutationFn = Apollo.MutationFunction<PairTransactionsMutation, PairTransactionsMutationVariables>;

/**
 * __usePairTransactionsMutation__
 *
 * To run a mutation, you first call `usePairTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePairTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pairTransactionsMutation, { data, loading, error }] = usePairTransactionsMutation({
 *   variables: {
 *      transactionIds: // value for 'transactionIds'
 *      setLinkedAccountId: // value for 'setLinkedAccountId'
 *      setPairId: // value for 'setPairId'
 *   },
 * });
 */
export function usePairTransactionsMutation(baseOptions?: Apollo.MutationHookOptions<PairTransactionsMutation, PairTransactionsMutationVariables>) {
        return Apollo.useMutation<PairTransactionsMutation, PairTransactionsMutationVariables>(PairTransactionsDocument, baseOptions);
      }
export type PairTransactionsMutationHookResult = ReturnType<typeof usePairTransactionsMutation>;
export type PairTransactionsMutationResult = Apollo.MutationResult<PairTransactionsMutation>;
export type PairTransactionsMutationOptions = Apollo.BaseMutationOptions<PairTransactionsMutation, PairTransactionsMutationVariables>;
export const UnpairTransactionsDocument = gql`
    mutation UnpairTransactions($pairIds: [uuid!]!) {
  update_transactions(where: {pair_id: {_in: $pairIds}}, _set: {linked_account_id: null, updated_at: "now", pair_id: null}) {
    affected_rows
  }
}
    `;
export type UnpairTransactionsMutationFn = Apollo.MutationFunction<UnpairTransactionsMutation, UnpairTransactionsMutationVariables>;

/**
 * __useUnpairTransactionsMutation__
 *
 * To run a mutation, you first call `useUnpairTransactionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnpairTransactionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unpairTransactionsMutation, { data, loading, error }] = useUnpairTransactionsMutation({
 *   variables: {
 *      pairIds: // value for 'pairIds'
 *   },
 * });
 */
export function useUnpairTransactionsMutation(baseOptions?: Apollo.MutationHookOptions<UnpairTransactionsMutation, UnpairTransactionsMutationVariables>) {
        return Apollo.useMutation<UnpairTransactionsMutation, UnpairTransactionsMutationVariables>(UnpairTransactionsDocument, baseOptions);
      }
export type UnpairTransactionsMutationHookResult = ReturnType<typeof useUnpairTransactionsMutation>;
export type UnpairTransactionsMutationResult = Apollo.MutationResult<UnpairTransactionsMutation>;
export type UnpairTransactionsMutationOptions = Apollo.BaseMutationOptions<UnpairTransactionsMutation, UnpairTransactionsMutationVariables>;
export const UpdateTransactionsCategoryDocument = gql`
    mutation UpdateTransactionsCategory($transactionIds: [uuid!]!, $categoryId: uuid) {
  update_transactions(where: {id: {_in: $transactionIds}}, _set: {category_id: $categoryId, updated_at: "now"}) {
    affected_rows
    returning {
      category {
        name
      }
    }
  }
}
    `;
export type UpdateTransactionsCategoryMutationFn = Apollo.MutationFunction<UpdateTransactionsCategoryMutation, UpdateTransactionsCategoryMutationVariables>;

/**
 * __useUpdateTransactionsCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionsCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionsCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTransactionsCategoryMutation, { data, loading, error }] = useUpdateTransactionsCategoryMutation({
 *   variables: {
 *      transactionIds: // value for 'transactionIds'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useUpdateTransactionsCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTransactionsCategoryMutation, UpdateTransactionsCategoryMutationVariables>) {
        return Apollo.useMutation<UpdateTransactionsCategoryMutation, UpdateTransactionsCategoryMutationVariables>(UpdateTransactionsCategoryDocument, baseOptions);
      }
export type UpdateTransactionsCategoryMutationHookResult = ReturnType<typeof useUpdateTransactionsCategoryMutation>;
export type UpdateTransactionsCategoryMutationResult = Apollo.MutationResult<UpdateTransactionsCategoryMutation>;
export type UpdateTransactionsCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateTransactionsCategoryMutation, UpdateTransactionsCategoryMutationVariables>;
export const GetAmountGroupsDocument = gql`
    query GetAmountGroups($startDate: timestamptz, $endDate: timestamptz, $categoryId: uuid, $groupBy: String) {
  groups: func_transactions_by_category_grouped(args: {v_category_id: $categoryId, v_group_by: $groupBy}, where: {date: {_gte: $startDate, _lte: $endDate}}, order_by: {date: asc}) {
    date
    balance
    expense
    income
  }
  aggregate: func_transactions_by_category_grouped_aggregate(args: {v_category_id: $categoryId, v_group_by: $groupBy}, where: {date: {_gte: $startDate, _lte: $endDate}}, order_by: {date: asc}) {
    aggregate {
      avg {
        balance
        expense
        income
      }
      max {
        balance
        income
      }
      min {
        expense
      }
    }
  }
}
    `;

/**
 * __useGetAmountGroupsQuery__
 *
 * To run a query within a React component, call `useGetAmountGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAmountGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAmountGroupsQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      categoryId: // value for 'categoryId'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useGetAmountGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetAmountGroupsQuery, GetAmountGroupsQueryVariables>) {
        return Apollo.useQuery<GetAmountGroupsQuery, GetAmountGroupsQueryVariables>(GetAmountGroupsDocument, baseOptions);
      }
export function useGetAmountGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAmountGroupsQuery, GetAmountGroupsQueryVariables>) {
          return Apollo.useLazyQuery<GetAmountGroupsQuery, GetAmountGroupsQueryVariables>(GetAmountGroupsDocument, baseOptions);
        }
export type GetAmountGroupsQueryHookResult = ReturnType<typeof useGetAmountGroupsQuery>;
export type GetAmountGroupsLazyQueryHookResult = ReturnType<typeof useGetAmountGroupsLazyQuery>;
export type GetAmountGroupsQueryResult = Apollo.QueryResult<GetAmountGroupsQuery, GetAmountGroupsQueryVariables>;
export const GetBalanceDocument = gql`
    query GetBalance($startDate: timestamptz, $endDate: timestamptz, $accountId: uuid, $groupBy: String) {
  balances: func_transactions_by_account_grouped_cumulative(args: {v_account_id: $accountId, v_group_by: $groupBy, v_start_date: $startDate}, where: {date: {_gte: $startDate, _lte: $endDate}}, order_by: {date: asc}) {
    date
    sum
  }
}
    `;

/**
 * __useGetBalanceQuery__
 *
 * To run a query within a React component, call `useGetBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalanceQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      accountId: // value for 'accountId'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useGetBalanceQuery(baseOptions?: Apollo.QueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>) {
        return Apollo.useQuery<GetBalanceQuery, GetBalanceQueryVariables>(GetBalanceDocument, baseOptions);
      }
export function useGetBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBalanceQuery, GetBalanceQueryVariables>) {
          return Apollo.useLazyQuery<GetBalanceQuery, GetBalanceQueryVariables>(GetBalanceDocument, baseOptions);
        }
export type GetBalanceQueryHookResult = ReturnType<typeof useGetBalanceQuery>;
export type GetBalanceLazyQueryHookResult = ReturnType<typeof useGetBalanceLazyQuery>;
export type GetBalanceQueryResult = Apollo.QueryResult<GetBalanceQuery, GetBalanceQueryVariables>;
export const GetBaseDataDocument = gql`
    query GetBaseData {
  accounts: view_accounts(order_by: {name: asc}) {
    id
    key: id
    name
    initialAmount: initial_amount
    sum
    minimum
    colour
    mostRecentTransactionDate: most_recent_transaction_date
    status
  }
  categories(order_by: {name: asc}) {
    id
    key: id
    name
    type
  }
}
    `;

/**
 * __useGetBaseDataQuery__
 *
 * To run a query within a React component, call `useGetBaseDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBaseDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBaseDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBaseDataQuery(baseOptions?: Apollo.QueryHookOptions<GetBaseDataQuery, GetBaseDataQueryVariables>) {
        return Apollo.useQuery<GetBaseDataQuery, GetBaseDataQueryVariables>(GetBaseDataDocument, baseOptions);
      }
export function useGetBaseDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBaseDataQuery, GetBaseDataQueryVariables>) {
          return Apollo.useLazyQuery<GetBaseDataQuery, GetBaseDataQueryVariables>(GetBaseDataDocument, baseOptions);
        }
export type GetBaseDataQueryHookResult = ReturnType<typeof useGetBaseDataQuery>;
export type GetBaseDataLazyQueryHookResult = ReturnType<typeof useGetBaseDataLazyQuery>;
export type GetBaseDataQueryResult = Apollo.QueryResult<GetBaseDataQuery, GetBaseDataQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories($startDate: timestamptz, $endDate: timestamptz, $accountId: uuid, $categoryType: String, $groupByParent: Boolean) {
  categories: func_category_by_date_type(args: {v_account_id: $accountId, v_category_type: $categoryType, v_end_date: $endDate, v_start_date: $startDate, v_parent: $groupByParent}) {
    id
    name
    sum
  }
  amount: func_category_by_date_type_aggregate(args: {v_account_id: $accountId, v_category_type: $categoryType, v_end_date: $endDate, v_start_date: $startDate, v_parent: $groupByParent}) {
    aggregate {
      sum {
        sum
      }
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      accountId: // value for 'accountId'
 *      categoryType: // value for 'categoryType'
 *      groupByParent: // value for 'groupByParent'
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetTransactionsDocument = gql`
    query GetTransactions($startDate: timestamptz, $endDate: timestamptz, $categoryIds: [uuid!], $accountId: uuid, $searchText: String!, $searchAmount: numeric!, $searchAmountComplement: numeric!) {
  transactions_aggregate(where: {date: {_gte: $startDate, _lte: $endDate}, _and: [{_and: [{_or: [{category_id: {_in: $categoryIds}}, {category_id: {_is_null: true}}]}, {account_id: {_eq: $accountId}}]}, {_or: [{description: {_ilike: $searchText}}, {amount: {_eq: $searchAmount}}, {amount: {_eq: $searchAmountComplement}}]}]}, order_by: {date: desc}) {
    aggregate {
      count
    }
    nodes {
      id
      key: id
      date
      amount
      description
      account {
        id
        name
        colour
      }
      linkedAccount {
        id
        name
        colour
      }
      category {
        id
        name
      }
      pair_id
    }
  }
}
    `;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      categoryIds: // value for 'categoryIds'
 *      accountId: // value for 'accountId'
 *      searchText: // value for 'searchText'
 *      searchAmount: // value for 'searchAmount'
 *      searchAmountComplement: // value for 'searchAmountComplement'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, baseOptions);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, baseOptions);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;