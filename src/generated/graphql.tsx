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

/** columns and relationships of "account" */
export type Account = {
  colour?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  initial_amount: Scalars['numeric'];
  legacy_key?: Maybe<Scalars['String']>;
  minimum: Scalars['numeric'];
  most_recent_transaction_date?: Maybe<Scalars['timestamptz']>;
  name: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
  /** An array relationship */
  transactions: Array<Transaction>;
  /** An array relationship */
  transactionsByToAccountId: Array<Transaction>;
  /** An aggregated array relationship */
  transactionsByToAccountId_aggregate: Transaction_Aggregate;
  /** An aggregated array relationship */
  transactions_aggregate: Transaction_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "account" */
export type AccountTransactionsArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountTransactionsByToAccountIdArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountTransactionsByToAccountId_AggregateArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** columns and relationships of "account" */
export type AccountTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};

/** aggregated selection of "account" */
export type Account_Aggregate = {
  aggregate?: Maybe<Account_Aggregate_Fields>;
  nodes: Array<Account>;
};

/** aggregate fields of "account" */
export type Account_Aggregate_Fields = {
  avg?: Maybe<Account_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Account_Max_Fields>;
  min?: Maybe<Account_Min_Fields>;
  stddev?: Maybe<Account_Stddev_Fields>;
  stddev_pop?: Maybe<Account_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Account_Stddev_Samp_Fields>;
  sum?: Maybe<Account_Sum_Fields>;
  var_pop?: Maybe<Account_Var_Pop_Fields>;
  var_samp?: Maybe<Account_Var_Samp_Fields>;
  variance?: Maybe<Account_Variance_Fields>;
};


/** aggregate fields of "account" */
export type Account_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Account_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "account" */
export type Account_Aggregate_Order_By = {
  avg?: Maybe<Account_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Account_Max_Order_By>;
  min?: Maybe<Account_Min_Order_By>;
  stddev?: Maybe<Account_Stddev_Order_By>;
  stddev_pop?: Maybe<Account_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Account_Stddev_Samp_Order_By>;
  sum?: Maybe<Account_Sum_Order_By>;
  var_pop?: Maybe<Account_Var_Pop_Order_By>;
  var_samp?: Maybe<Account_Var_Samp_Order_By>;
  variance?: Maybe<Account_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "account" */
export type Account_Arr_Rel_Insert_Input = {
  data: Array<Account_Insert_Input>;
  on_conflict?: Maybe<Account_On_Conflict>;
};

/** aggregate avg on columns */
export type Account_Avg_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "account" */
export type Account_Avg_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "account". All fields are combined with a logical 'AND'. */
export type Account_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Account_Bool_Exp>>>;
  _not?: Maybe<Account_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Account_Bool_Exp>>>;
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
  transactions?: Maybe<Transaction_Bool_Exp>;
  transactionsByToAccountId?: Maybe<Transaction_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "account" */
export enum Account_Constraint {
  /** unique or primary key constraint */
  AccountsPkey = 'accounts_pkey'
}

/** input type for incrementing integer column in table "account" */
export type Account_Inc_Input = {
  initial_amount?: Maybe<Scalars['numeric']>;
  minimum?: Maybe<Scalars['numeric']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "account" */
export type Account_Insert_Input = {
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
  transactions?: Maybe<Transaction_Arr_Rel_Insert_Input>;
  transactionsByToAccountId?: Maybe<Transaction_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Account_Max_Fields = {
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

/** order by max() on columns of table "account" */
export type Account_Max_Order_By = {
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

/** aggregate min on columns */
export type Account_Min_Fields = {
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

/** order by min() on columns of table "account" */
export type Account_Min_Order_By = {
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

/** response of any mutation on the table "account" */
export type Account_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Account>;
};

/** input type for inserting object relation for remote table "account" */
export type Account_Obj_Rel_Insert_Input = {
  data: Account_Insert_Input;
  on_conflict?: Maybe<Account_On_Conflict>;
};

/** on conflict condition type for table "account" */
export type Account_On_Conflict = {
  constraint: Account_Constraint;
  update_columns: Array<Account_Update_Column>;
  where?: Maybe<Account_Bool_Exp>;
};

/** ordering options when selecting data from "account" */
export type Account_Order_By = {
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
  transactionsByToAccountId_aggregate?: Maybe<Transaction_Aggregate_Order_By>;
  transactions_aggregate?: Maybe<Transaction_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "account" */
export type Account_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "account" */
export enum Account_Select_Column {
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

/** input type for updating data in table "account" */
export type Account_Set_Input = {
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

/** aggregate stddev on columns */
export type Account_Stddev_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "account" */
export type Account_Stddev_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Account_Stddev_Pop_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "account" */
export type Account_Stddev_Pop_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Account_Stddev_Samp_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "account" */
export type Account_Stddev_Samp_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Account_Sum_Fields = {
  initial_amount?: Maybe<Scalars['numeric']>;
  minimum?: Maybe<Scalars['numeric']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "account" */
export type Account_Sum_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** update columns of table "account" */
export enum Account_Update_Column {
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

/** aggregate var_pop on columns */
export type Account_Var_Pop_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "account" */
export type Account_Var_Pop_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Account_Var_Samp_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "account" */
export type Account_Var_Samp_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Account_Variance_Fields = {
  initial_amount?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  sum?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "account" */
export type Account_Variance_Order_By = {
  initial_amount?: Maybe<Order_By>;
  minimum?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "category" */
export type Category = {
  /** An array relationship */
  categories: Array<Category>;
  /** An aggregated array relationship */
  categories_aggregate: Category_Aggregate;
  /** An object relationship */
  category?: Maybe<Category>;
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  is_parent: Scalars['Boolean'];
  legacy_key?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent_category_id?: Maybe<Scalars['uuid']>;
  sum: Scalars['numeric'];
  /** An array relationship */
  transactions: Array<Transaction>;
  /** An aggregated array relationship */
  transactions_aggregate: Transaction_Aggregate;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "category" */
export type CategoryCategoriesArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** columns and relationships of "category" */
export type CategoryCategories_AggregateArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** columns and relationships of "category" */
export type CategoryTransactionsArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** columns and relationships of "category" */
export type CategoryTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};

/** aggregated selection of "category" */
export type Category_Aggregate = {
  aggregate?: Maybe<Category_Aggregate_Fields>;
  nodes: Array<Category>;
};

/** aggregate fields of "category" */
export type Category_Aggregate_Fields = {
  avg?: Maybe<Category_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Category_Max_Fields>;
  min?: Maybe<Category_Min_Fields>;
  stddev?: Maybe<Category_Stddev_Fields>;
  stddev_pop?: Maybe<Category_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Category_Stddev_Samp_Fields>;
  sum?: Maybe<Category_Sum_Fields>;
  var_pop?: Maybe<Category_Var_Pop_Fields>;
  var_samp?: Maybe<Category_Var_Samp_Fields>;
  variance?: Maybe<Category_Variance_Fields>;
};


/** aggregate fields of "category" */
export type Category_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Category_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "category" */
export type Category_Aggregate_Order_By = {
  avg?: Maybe<Category_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Category_Max_Order_By>;
  min?: Maybe<Category_Min_Order_By>;
  stddev?: Maybe<Category_Stddev_Order_By>;
  stddev_pop?: Maybe<Category_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Category_Stddev_Samp_Order_By>;
  sum?: Maybe<Category_Sum_Order_By>;
  var_pop?: Maybe<Category_Var_Pop_Order_By>;
  var_samp?: Maybe<Category_Var_Samp_Order_By>;
  variance?: Maybe<Category_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "category" */
export type Category_Arr_Rel_Insert_Input = {
  data: Array<Category_Insert_Input>;
  on_conflict?: Maybe<Category_On_Conflict>;
};

/** aggregate avg on columns */
export type Category_Avg_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "category" */
export type Category_Avg_Order_By = {
  sum?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "category". All fields are combined with a logical 'AND'. */
export type Category_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Category_Bool_Exp>>>;
  _not?: Maybe<Category_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Category_Bool_Exp>>>;
  categories?: Maybe<Category_Bool_Exp>;
  category?: Maybe<Category_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_parent?: Maybe<Boolean_Comparison_Exp>;
  legacy_key?: Maybe<String_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  parent_category_id?: Maybe<Uuid_Comparison_Exp>;
  sum?: Maybe<Numeric_Comparison_Exp>;
  transactions?: Maybe<Transaction_Bool_Exp>;
  type?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "category" */
export enum Category_Constraint {
  /** unique or primary key constraint */
  CategoriesPkey = 'categories_pkey'
}

/** input type for incrementing integer column in table "category" */
export type Category_Inc_Input = {
  sum?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "category" */
export type Category_Insert_Input = {
  categories?: Maybe<Category_Arr_Rel_Insert_Input>;
  category?: Maybe<Category_Obj_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  is_parent?: Maybe<Scalars['Boolean']>;
  legacy_key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_category_id?: Maybe<Scalars['uuid']>;
  sum?: Maybe<Scalars['numeric']>;
  transactions?: Maybe<Transaction_Arr_Rel_Insert_Input>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Category_Max_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  legacy_key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_category_id?: Maybe<Scalars['uuid']>;
  sum?: Maybe<Scalars['numeric']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "category" */
export type Category_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  parent_category_id?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Category_Min_Fields = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  legacy_key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_category_id?: Maybe<Scalars['uuid']>;
  sum?: Maybe<Scalars['numeric']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "category" */
export type Category_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  parent_category_id?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "category" */
export type Category_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Category>;
};

/** input type for inserting object relation for remote table "category" */
export type Category_Obj_Rel_Insert_Input = {
  data: Category_Insert_Input;
  on_conflict?: Maybe<Category_On_Conflict>;
};

/** on conflict condition type for table "category" */
export type Category_On_Conflict = {
  constraint: Category_Constraint;
  update_columns: Array<Category_Update_Column>;
  where?: Maybe<Category_Bool_Exp>;
};

/** ordering options when selecting data from "category" */
export type Category_Order_By = {
  categories_aggregate?: Maybe<Category_Aggregate_Order_By>;
  category?: Maybe<Category_Order_By>;
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  is_parent?: Maybe<Order_By>;
  legacy_key?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  parent_category_id?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
  transactions_aggregate?: Maybe<Transaction_Aggregate_Order_By>;
  type?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "category" */
export type Category_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "category" */
export enum Category_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsParent = 'is_parent',
  /** column name */
  LegacyKey = 'legacy_key',
  /** column name */
  Name = 'name',
  /** column name */
  ParentCategoryId = 'parent_category_id',
  /** column name */
  Sum = 'sum',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "category" */
export type Category_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  is_parent?: Maybe<Scalars['Boolean']>;
  legacy_key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent_category_id?: Maybe<Scalars['uuid']>;
  sum?: Maybe<Scalars['numeric']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Category_Stddev_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "category" */
export type Category_Stddev_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Category_Stddev_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "category" */
export type Category_Stddev_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Category_Stddev_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "category" */
export type Category_Stddev_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Category_Sum_Fields = {
  sum?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "category" */
export type Category_Sum_Order_By = {
  sum?: Maybe<Order_By>;
};

/** update columns of table "category" */
export enum Category_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsParent = 'is_parent',
  /** column name */
  LegacyKey = 'legacy_key',
  /** column name */
  Name = 'name',
  /** column name */
  ParentCategoryId = 'parent_category_id',
  /** column name */
  Sum = 'sum',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Category_Var_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "category" */
export type Category_Var_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Category_Var_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "category" */
export type Category_Var_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Category_Variance_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "category" */
export type Category_Variance_Order_By = {
  sum?: Maybe<Order_By>;
};

export type Func_Category_Breakdown_Args = {
  v_account_id?: Maybe<Scalars['uuid']>;
  v_category_type?: Maybe<Scalars['String']>;
  v_end_date?: Maybe<Scalars['timestamptz']>;
  v_group_categories?: Maybe<Scalars['Boolean']>;
  v_start_date?: Maybe<Scalars['timestamptz']>;
};

export type Func_Cumulative_Amount_Args = {
  v_account_id?: Maybe<Scalars['uuid']>;
  v_end_date?: Maybe<Scalars['timestamptz']>;
  v_group_by?: Maybe<Scalars['String']>;
  v_start_date?: Maybe<Scalars['timestamptz']>;
};

export type Func_Transactions_By_Category_Grouped_Args = {
  v_category_id?: Maybe<Scalars['uuid']>;
  v_group_by?: Maybe<Scalars['String']>;
};

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "account" */
  delete_account?: Maybe<Account_Mutation_Response>;
  /** delete single row from the table: "account" */
  delete_account_by_pk?: Maybe<Account>;
  /** delete data from the table: "category" */
  delete_category?: Maybe<Category_Mutation_Response>;
  /** delete single row from the table: "category" */
  delete_category_by_pk?: Maybe<Category>;
  /** delete data from the table: "table_amount_groups" */
  delete_table_amount_groups?: Maybe<Table_Amount_Groups_Mutation_Response>;
  /** delete data from the table: "table_breakdown" */
  delete_table_breakdown?: Maybe<Table_Breakdown_Mutation_Response>;
  /** delete data from the table: "table_cumulative_amount" */
  delete_table_cumulative_amount?: Maybe<Table_Cumulative_Amount_Mutation_Response>;
  /** delete data from the table: "table_transactions_by_category_grouped" */
  delete_table_transactions_by_category_grouped?: Maybe<Table_Transactions_By_Category_Grouped_Mutation_Response>;
  /** delete data from the table: "transaction" */
  delete_transaction?: Maybe<Transaction_Mutation_Response>;
  /** delete single row from the table: "transaction" */
  delete_transaction_by_pk?: Maybe<Transaction>;
  /** insert data into the table: "account" */
  insert_account?: Maybe<Account_Mutation_Response>;
  /** insert a single row into the table: "account" */
  insert_account_one?: Maybe<Account>;
  /** insert data into the table: "category" */
  insert_category?: Maybe<Category_Mutation_Response>;
  /** insert a single row into the table: "category" */
  insert_category_one?: Maybe<Category>;
  /** insert data into the table: "table_amount_groups" */
  insert_table_amount_groups?: Maybe<Table_Amount_Groups_Mutation_Response>;
  /** insert a single row into the table: "table_amount_groups" */
  insert_table_amount_groups_one?: Maybe<Table_Amount_Groups>;
  /** insert data into the table: "table_breakdown" */
  insert_table_breakdown?: Maybe<Table_Breakdown_Mutation_Response>;
  /** insert a single row into the table: "table_breakdown" */
  insert_table_breakdown_one?: Maybe<Table_Breakdown>;
  /** insert data into the table: "table_cumulative_amount" */
  insert_table_cumulative_amount?: Maybe<Table_Cumulative_Amount_Mutation_Response>;
  /** insert a single row into the table: "table_cumulative_amount" */
  insert_table_cumulative_amount_one?: Maybe<Table_Cumulative_Amount>;
  /** insert data into the table: "table_transactions_by_category_grouped" */
  insert_table_transactions_by_category_grouped?: Maybe<Table_Transactions_By_Category_Grouped_Mutation_Response>;
  /** insert a single row into the table: "table_transactions_by_category_grouped" */
  insert_table_transactions_by_category_grouped_one?: Maybe<Table_Transactions_By_Category_Grouped>;
  /** insert data into the table: "transaction" */
  insert_transaction?: Maybe<Transaction_Mutation_Response>;
  /** insert a single row into the table: "transaction" */
  insert_transaction_one?: Maybe<Transaction>;
  /** update data of the table: "account" */
  update_account?: Maybe<Account_Mutation_Response>;
  /** update single row of the table: "account" */
  update_account_by_pk?: Maybe<Account>;
  /** update data of the table: "category" */
  update_category?: Maybe<Category_Mutation_Response>;
  /** update single row of the table: "category" */
  update_category_by_pk?: Maybe<Category>;
  /** update data of the table: "table_amount_groups" */
  update_table_amount_groups?: Maybe<Table_Amount_Groups_Mutation_Response>;
  /** update data of the table: "table_breakdown" */
  update_table_breakdown?: Maybe<Table_Breakdown_Mutation_Response>;
  /** update data of the table: "table_cumulative_amount" */
  update_table_cumulative_amount?: Maybe<Table_Cumulative_Amount_Mutation_Response>;
  /** update data of the table: "table_transactions_by_category_grouped" */
  update_table_transactions_by_category_grouped?: Maybe<Table_Transactions_By_Category_Grouped_Mutation_Response>;
  /** update data of the table: "transaction" */
  update_transaction?: Maybe<Transaction_Mutation_Response>;
  /** update single row of the table: "transaction" */
  update_transaction_by_pk?: Maybe<Transaction>;
};


/** mutation root */
export type Mutation_RootDelete_AccountArgs = {
  where: Account_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Account_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CategoryArgs = {
  where: Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Category_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Table_Amount_GroupsArgs = {
  where: Table_Amount_Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Table_BreakdownArgs = {
  where: Table_Breakdown_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Table_Cumulative_AmountArgs = {
  where: Table_Cumulative_Amount_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Table_Transactions_By_Category_GroupedArgs = {
  where: Table_Transactions_By_Category_Grouped_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_TransactionArgs = {
  where: Transaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transaction_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_AccountArgs = {
  objects: Array<Account_Insert_Input>;
  on_conflict?: Maybe<Account_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Account_OneArgs = {
  object: Account_Insert_Input;
  on_conflict?: Maybe<Account_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CategoryArgs = {
  objects: Array<Category_Insert_Input>;
  on_conflict?: Maybe<Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Category_OneArgs = {
  object: Category_Insert_Input;
  on_conflict?: Maybe<Category_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Amount_GroupsArgs = {
  objects: Array<Table_Amount_Groups_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Amount_Groups_OneArgs = {
  object: Table_Amount_Groups_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Table_BreakdownArgs = {
  objects: Array<Table_Breakdown_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Breakdown_OneArgs = {
  object: Table_Breakdown_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Table_Cumulative_AmountArgs = {
  objects: Array<Table_Cumulative_Amount_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Cumulative_Amount_OneArgs = {
  object: Table_Cumulative_Amount_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Table_Transactions_By_Category_GroupedArgs = {
  objects: Array<Table_Transactions_By_Category_Grouped_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Transactions_By_Category_Grouped_OneArgs = {
  object: Table_Transactions_By_Category_Grouped_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_TransactionArgs = {
  objects: Array<Transaction_Insert_Input>;
  on_conflict?: Maybe<Transaction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transaction_OneArgs = {
  object: Transaction_Insert_Input;
  on_conflict?: Maybe<Transaction_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountArgs = {
  _inc?: Maybe<Account_Inc_Input>;
  _set?: Maybe<Account_Set_Input>;
  where: Account_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Account_By_PkArgs = {
  _inc?: Maybe<Account_Inc_Input>;
  _set?: Maybe<Account_Set_Input>;
  pk_columns: Account_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CategoryArgs = {
  _inc?: Maybe<Category_Inc_Input>;
  _set?: Maybe<Category_Set_Input>;
  where: Category_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Category_By_PkArgs = {
  _inc?: Maybe<Category_Inc_Input>;
  _set?: Maybe<Category_Set_Input>;
  pk_columns: Category_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Table_Amount_GroupsArgs = {
  _inc?: Maybe<Table_Amount_Groups_Inc_Input>;
  _set?: Maybe<Table_Amount_Groups_Set_Input>;
  where: Table_Amount_Groups_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Table_BreakdownArgs = {
  _inc?: Maybe<Table_Breakdown_Inc_Input>;
  _set?: Maybe<Table_Breakdown_Set_Input>;
  where: Table_Breakdown_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Table_Cumulative_AmountArgs = {
  _inc?: Maybe<Table_Cumulative_Amount_Inc_Input>;
  _set?: Maybe<Table_Cumulative_Amount_Set_Input>;
  where: Table_Cumulative_Amount_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Table_Transactions_By_Category_GroupedArgs = {
  _inc?: Maybe<Table_Transactions_By_Category_Grouped_Inc_Input>;
  _set?: Maybe<Table_Transactions_By_Category_Grouped_Set_Input>;
  where: Table_Transactions_By_Category_Grouped_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionArgs = {
  _inc?: Maybe<Transaction_Inc_Input>;
  _set?: Maybe<Transaction_Set_Input>;
  where: Transaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transaction_By_PkArgs = {
  _inc?: Maybe<Transaction_Inc_Input>;
  _set?: Maybe<Transaction_Set_Input>;
  pk_columns: Transaction_Pk_Columns_Input;
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
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "category" */
  category: Array<Category>;
  /** fetch aggregated fields from the table: "category" */
  category_aggregate: Category_Aggregate;
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>;
  /** execute function "func_account" which returns "account" */
  func_account: Array<Account>;
  /** execute function "func_account" and query aggregates on result of table type "account" */
  func_account_aggregate: Account_Aggregate;
  /** execute function "func_category_breakdown" which returns "category" */
  func_category_breakdown: Array<Category>;
  /** execute function "func_category_breakdown" and query aggregates on result of table type "category" */
  func_category_breakdown_aggregate: Category_Aggregate;
  /** execute function "func_cumulative_amount" which returns "table_cumulative_amount" */
  func_cumulative_amount: Array<Table_Cumulative_Amount>;
  /** execute function "func_cumulative_amount" and query aggregates on result of table type "table_cumulative_amount" */
  func_cumulative_amount_aggregate: Table_Cumulative_Amount_Aggregate;
  /** execute function "func_transactions_by_category_grouped" which returns "table_transactions_by_category_grouped" */
  func_transactions_by_category_grouped: Array<Table_Transactions_By_Category_Grouped>;
  /**
   * execute function "func_transactions_by_category_grouped" and query aggregates
   * on result of table type "table_transactions_by_category_grouped"
   */
  func_transactions_by_category_grouped_aggregate: Table_Transactions_By_Category_Grouped_Aggregate;
  /** fetch data from the table: "table_amount_groups" */
  table_amount_groups: Array<Table_Amount_Groups>;
  /** fetch aggregated fields from the table: "table_amount_groups" */
  table_amount_groups_aggregate: Table_Amount_Groups_Aggregate;
  /** fetch data from the table: "table_breakdown" */
  table_breakdown: Array<Table_Breakdown>;
  /** fetch aggregated fields from the table: "table_breakdown" */
  table_breakdown_aggregate: Table_Breakdown_Aggregate;
  /** fetch data from the table: "table_cumulative_amount" */
  table_cumulative_amount: Array<Table_Cumulative_Amount>;
  /** fetch aggregated fields from the table: "table_cumulative_amount" */
  table_cumulative_amount_aggregate: Table_Cumulative_Amount_Aggregate;
  /** fetch data from the table: "table_transactions_by_category_grouped" */
  table_transactions_by_category_grouped: Array<Table_Transactions_By_Category_Grouped>;
  /** fetch aggregated fields from the table: "table_transactions_by_category_grouped" */
  table_transactions_by_category_grouped_aggregate: Table_Transactions_By_Category_Grouped_Aggregate;
  /** fetch data from the table: "transaction" */
  transaction: Array<Transaction>;
  /** fetch aggregated fields from the table: "transaction" */
  transaction_aggregate: Transaction_Aggregate;
  /** fetch data from the table: "transaction" using primary key columns */
  transaction_by_pk?: Maybe<Transaction>;
};


/** query root */
export type Query_RootAccountArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** query root */
export type Query_RootAccount_AggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** query root */
export type Query_RootAccount_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootCategoryArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** query root */
export type Query_RootCategory_AggregateArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** query root */
export type Query_RootCategory_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootFunc_AccountArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Account_AggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Category_BreakdownArgs = {
  args: Func_Category_Breakdown_Args;
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Category_Breakdown_AggregateArgs = {
  args: Func_Category_Breakdown_Args;
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Cumulative_AmountArgs = {
  args: Func_Cumulative_Amount_Args;
  distinct_on?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Cumulative_Amount_Order_By>>;
  where?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Cumulative_Amount_AggregateArgs = {
  args: Func_Cumulative_Amount_Args;
  distinct_on?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Cumulative_Amount_Order_By>>;
  where?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
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
export type Query_RootTable_Amount_GroupsArgs = {
  distinct_on?: Maybe<Array<Table_Amount_Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Groups_Order_By>>;
  where?: Maybe<Table_Amount_Groups_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Amount_Groups_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Amount_Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Groups_Order_By>>;
  where?: Maybe<Table_Amount_Groups_Bool_Exp>;
};


/** query root */
export type Query_RootTable_BreakdownArgs = {
  distinct_on?: Maybe<Array<Table_Breakdown_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Breakdown_Order_By>>;
  where?: Maybe<Table_Breakdown_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Breakdown_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Breakdown_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Breakdown_Order_By>>;
  where?: Maybe<Table_Breakdown_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Cumulative_AmountArgs = {
  distinct_on?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Cumulative_Amount_Order_By>>;
  where?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Cumulative_Amount_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Cumulative_Amount_Order_By>>;
  where?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
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
export type Query_RootTransactionArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** query root */
export type Query_RootTransaction_AggregateArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** query root */
export type Query_RootTransaction_By_PkArgs = {
  id: Scalars['uuid'];
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
  /** fetch data from the table: "account" */
  account: Array<Account>;
  /** fetch aggregated fields from the table: "account" */
  account_aggregate: Account_Aggregate;
  /** fetch data from the table: "account" using primary key columns */
  account_by_pk?: Maybe<Account>;
  /** fetch data from the table: "category" */
  category: Array<Category>;
  /** fetch aggregated fields from the table: "category" */
  category_aggregate: Category_Aggregate;
  /** fetch data from the table: "category" using primary key columns */
  category_by_pk?: Maybe<Category>;
  /** execute function "func_account" which returns "account" */
  func_account: Array<Account>;
  /** execute function "func_account" and query aggregates on result of table type "account" */
  func_account_aggregate: Account_Aggregate;
  /** execute function "func_category_breakdown" which returns "category" */
  func_category_breakdown: Array<Category>;
  /** execute function "func_category_breakdown" and query aggregates on result of table type "category" */
  func_category_breakdown_aggregate: Category_Aggregate;
  /** execute function "func_cumulative_amount" which returns "table_cumulative_amount" */
  func_cumulative_amount: Array<Table_Cumulative_Amount>;
  /** execute function "func_cumulative_amount" and query aggregates on result of table type "table_cumulative_amount" */
  func_cumulative_amount_aggregate: Table_Cumulative_Amount_Aggregate;
  /** execute function "func_transactions_by_category_grouped" which returns "table_transactions_by_category_grouped" */
  func_transactions_by_category_grouped: Array<Table_Transactions_By_Category_Grouped>;
  /**
   * execute function "func_transactions_by_category_grouped" and query aggregates
   * on result of table type "table_transactions_by_category_grouped"
   */
  func_transactions_by_category_grouped_aggregate: Table_Transactions_By_Category_Grouped_Aggregate;
  /** fetch data from the table: "table_amount_groups" */
  table_amount_groups: Array<Table_Amount_Groups>;
  /** fetch aggregated fields from the table: "table_amount_groups" */
  table_amount_groups_aggregate: Table_Amount_Groups_Aggregate;
  /** fetch data from the table: "table_breakdown" */
  table_breakdown: Array<Table_Breakdown>;
  /** fetch aggregated fields from the table: "table_breakdown" */
  table_breakdown_aggregate: Table_Breakdown_Aggregate;
  /** fetch data from the table: "table_cumulative_amount" */
  table_cumulative_amount: Array<Table_Cumulative_Amount>;
  /** fetch aggregated fields from the table: "table_cumulative_amount" */
  table_cumulative_amount_aggregate: Table_Cumulative_Amount_Aggregate;
  /** fetch data from the table: "table_transactions_by_category_grouped" */
  table_transactions_by_category_grouped: Array<Table_Transactions_By_Category_Grouped>;
  /** fetch aggregated fields from the table: "table_transactions_by_category_grouped" */
  table_transactions_by_category_grouped_aggregate: Table_Transactions_By_Category_Grouped_Aggregate;
  /** fetch data from the table: "transaction" */
  transaction: Array<Transaction>;
  /** fetch aggregated fields from the table: "transaction" */
  transaction_aggregate: Transaction_Aggregate;
  /** fetch data from the table: "transaction" using primary key columns */
  transaction_by_pk?: Maybe<Transaction>;
};


/** subscription root */
export type Subscription_RootAccountArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccount_AggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccount_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootCategoryArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCategory_AggregateArgs = {
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCategory_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootFunc_AccountArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Account_AggregateArgs = {
  distinct_on?: Maybe<Array<Account_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Account_Order_By>>;
  where?: Maybe<Account_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Category_BreakdownArgs = {
  args: Func_Category_Breakdown_Args;
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Category_Breakdown_AggregateArgs = {
  args: Func_Category_Breakdown_Args;
  distinct_on?: Maybe<Array<Category_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Category_Order_By>>;
  where?: Maybe<Category_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Cumulative_AmountArgs = {
  args: Func_Cumulative_Amount_Args;
  distinct_on?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Cumulative_Amount_Order_By>>;
  where?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Cumulative_Amount_AggregateArgs = {
  args: Func_Cumulative_Amount_Args;
  distinct_on?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Cumulative_Amount_Order_By>>;
  where?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
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
export type Subscription_RootTable_Amount_GroupsArgs = {
  distinct_on?: Maybe<Array<Table_Amount_Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Groups_Order_By>>;
  where?: Maybe<Table_Amount_Groups_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Amount_Groups_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Amount_Groups_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Groups_Order_By>>;
  where?: Maybe<Table_Amount_Groups_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_BreakdownArgs = {
  distinct_on?: Maybe<Array<Table_Breakdown_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Breakdown_Order_By>>;
  where?: Maybe<Table_Breakdown_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Breakdown_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Breakdown_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Breakdown_Order_By>>;
  where?: Maybe<Table_Breakdown_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Cumulative_AmountArgs = {
  distinct_on?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Cumulative_Amount_Order_By>>;
  where?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Cumulative_Amount_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Cumulative_Amount_Order_By>>;
  where?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
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
export type Subscription_RootTransactionArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTransaction_AggregateArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTransaction_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "table_amount_groups" */
export type Table_Amount_Groups = {
  balance: Scalars['numeric'];
  date: Scalars['timestamptz'];
  expense: Scalars['numeric'];
  income: Scalars['numeric'];
};

/** aggregated selection of "table_amount_groups" */
export type Table_Amount_Groups_Aggregate = {
  aggregate?: Maybe<Table_Amount_Groups_Aggregate_Fields>;
  nodes: Array<Table_Amount_Groups>;
};

/** aggregate fields of "table_amount_groups" */
export type Table_Amount_Groups_Aggregate_Fields = {
  avg?: Maybe<Table_Amount_Groups_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Table_Amount_Groups_Max_Fields>;
  min?: Maybe<Table_Amount_Groups_Min_Fields>;
  stddev?: Maybe<Table_Amount_Groups_Stddev_Fields>;
  stddev_pop?: Maybe<Table_Amount_Groups_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Table_Amount_Groups_Stddev_Samp_Fields>;
  sum?: Maybe<Table_Amount_Groups_Sum_Fields>;
  var_pop?: Maybe<Table_Amount_Groups_Var_Pop_Fields>;
  var_samp?: Maybe<Table_Amount_Groups_Var_Samp_Fields>;
  variance?: Maybe<Table_Amount_Groups_Variance_Fields>;
};


/** aggregate fields of "table_amount_groups" */
export type Table_Amount_Groups_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Table_Amount_Groups_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "table_amount_groups" */
export type Table_Amount_Groups_Aggregate_Order_By = {
  avg?: Maybe<Table_Amount_Groups_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Table_Amount_Groups_Max_Order_By>;
  min?: Maybe<Table_Amount_Groups_Min_Order_By>;
  stddev?: Maybe<Table_Amount_Groups_Stddev_Order_By>;
  stddev_pop?: Maybe<Table_Amount_Groups_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Table_Amount_Groups_Stddev_Samp_Order_By>;
  sum?: Maybe<Table_Amount_Groups_Sum_Order_By>;
  var_pop?: Maybe<Table_Amount_Groups_Var_Pop_Order_By>;
  var_samp?: Maybe<Table_Amount_Groups_Var_Samp_Order_By>;
  variance?: Maybe<Table_Amount_Groups_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "table_amount_groups" */
export type Table_Amount_Groups_Arr_Rel_Insert_Input = {
  data: Array<Table_Amount_Groups_Insert_Input>;
};

/** aggregate avg on columns */
export type Table_Amount_Groups_Avg_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Avg_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "table_amount_groups". All fields are combined with a logical 'AND'. */
export type Table_Amount_Groups_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Table_Amount_Groups_Bool_Exp>>>;
  _not?: Maybe<Table_Amount_Groups_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Table_Amount_Groups_Bool_Exp>>>;
  balance?: Maybe<Numeric_Comparison_Exp>;
  date?: Maybe<Timestamptz_Comparison_Exp>;
  expense?: Maybe<Numeric_Comparison_Exp>;
  income?: Maybe<Numeric_Comparison_Exp>;
};

/** input type for incrementing integer column in table "table_amount_groups" */
export type Table_Amount_Groups_Inc_Input = {
  balance?: Maybe<Scalars['numeric']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "table_amount_groups" */
export type Table_Amount_Groups_Insert_Input = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Table_Amount_Groups_Max_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Max_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Table_Amount_Groups_Min_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Min_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** response of any mutation on the table "table_amount_groups" */
export type Table_Amount_Groups_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Table_Amount_Groups>;
};

/** input type for inserting object relation for remote table "table_amount_groups" */
export type Table_Amount_Groups_Obj_Rel_Insert_Input = {
  data: Table_Amount_Groups_Insert_Input;
};

/** ordering options when selecting data from "table_amount_groups" */
export type Table_Amount_Groups_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** select columns of table "table_amount_groups" */
export enum Table_Amount_Groups_Select_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  Date = 'date',
  /** column name */
  Expense = 'expense',
  /** column name */
  Income = 'income'
}

/** input type for updating data in table "table_amount_groups" */
export type Table_Amount_Groups_Set_Input = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Table_Amount_Groups_Stddev_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Stddev_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Table_Amount_Groups_Stddev_Pop_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Stddev_Pop_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Table_Amount_Groups_Stddev_Samp_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Stddev_Samp_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Table_Amount_Groups_Sum_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Sum_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Table_Amount_Groups_Var_Pop_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Var_Pop_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Table_Amount_Groups_Var_Samp_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Var_Samp_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Table_Amount_Groups_Variance_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "table_amount_groups" */
export type Table_Amount_Groups_Variance_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** columns and relationships of "table_breakdown" */
export type Table_Breakdown = {
  id: Scalars['uuid'];
  name: Scalars['String'];
  sum: Scalars['numeric'];
};

/** aggregated selection of "table_breakdown" */
export type Table_Breakdown_Aggregate = {
  aggregate?: Maybe<Table_Breakdown_Aggregate_Fields>;
  nodes: Array<Table_Breakdown>;
};

/** aggregate fields of "table_breakdown" */
export type Table_Breakdown_Aggregate_Fields = {
  avg?: Maybe<Table_Breakdown_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Table_Breakdown_Max_Fields>;
  min?: Maybe<Table_Breakdown_Min_Fields>;
  stddev?: Maybe<Table_Breakdown_Stddev_Fields>;
  stddev_pop?: Maybe<Table_Breakdown_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Table_Breakdown_Stddev_Samp_Fields>;
  sum?: Maybe<Table_Breakdown_Sum_Fields>;
  var_pop?: Maybe<Table_Breakdown_Var_Pop_Fields>;
  var_samp?: Maybe<Table_Breakdown_Var_Samp_Fields>;
  variance?: Maybe<Table_Breakdown_Variance_Fields>;
};


/** aggregate fields of "table_breakdown" */
export type Table_Breakdown_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Table_Breakdown_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "table_breakdown" */
export type Table_Breakdown_Aggregate_Order_By = {
  avg?: Maybe<Table_Breakdown_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Table_Breakdown_Max_Order_By>;
  min?: Maybe<Table_Breakdown_Min_Order_By>;
  stddev?: Maybe<Table_Breakdown_Stddev_Order_By>;
  stddev_pop?: Maybe<Table_Breakdown_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Table_Breakdown_Stddev_Samp_Order_By>;
  sum?: Maybe<Table_Breakdown_Sum_Order_By>;
  var_pop?: Maybe<Table_Breakdown_Var_Pop_Order_By>;
  var_samp?: Maybe<Table_Breakdown_Var_Samp_Order_By>;
  variance?: Maybe<Table_Breakdown_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "table_breakdown" */
export type Table_Breakdown_Arr_Rel_Insert_Input = {
  data: Array<Table_Breakdown_Insert_Input>;
};

/** aggregate avg on columns */
export type Table_Breakdown_Avg_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "table_breakdown" */
export type Table_Breakdown_Avg_Order_By = {
  sum?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "table_breakdown". All fields are combined with a logical 'AND'. */
export type Table_Breakdown_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Table_Breakdown_Bool_Exp>>>;
  _not?: Maybe<Table_Breakdown_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Table_Breakdown_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  sum?: Maybe<Numeric_Comparison_Exp>;
};

/** input type for incrementing integer column in table "table_breakdown" */
export type Table_Breakdown_Inc_Input = {
  sum?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "table_breakdown" */
export type Table_Breakdown_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Table_Breakdown_Max_Fields = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "table_breakdown" */
export type Table_Breakdown_Max_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Table_Breakdown_Min_Fields = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "table_breakdown" */
export type Table_Breakdown_Min_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** response of any mutation on the table "table_breakdown" */
export type Table_Breakdown_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Table_Breakdown>;
};

/** input type for inserting object relation for remote table "table_breakdown" */
export type Table_Breakdown_Obj_Rel_Insert_Input = {
  data: Table_Breakdown_Insert_Input;
};

/** ordering options when selecting data from "table_breakdown" */
export type Table_Breakdown_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** select columns of table "table_breakdown" */
export enum Table_Breakdown_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Sum = 'sum'
}

/** input type for updating data in table "table_breakdown" */
export type Table_Breakdown_Set_Input = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Table_Breakdown_Stddev_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "table_breakdown" */
export type Table_Breakdown_Stddev_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Table_Breakdown_Stddev_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "table_breakdown" */
export type Table_Breakdown_Stddev_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Table_Breakdown_Stddev_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "table_breakdown" */
export type Table_Breakdown_Stddev_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Table_Breakdown_Sum_Fields = {
  sum?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "table_breakdown" */
export type Table_Breakdown_Sum_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Table_Breakdown_Var_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "table_breakdown" */
export type Table_Breakdown_Var_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Table_Breakdown_Var_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "table_breakdown" */
export type Table_Breakdown_Var_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Table_Breakdown_Variance_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "table_breakdown" */
export type Table_Breakdown_Variance_Order_By = {
  sum?: Maybe<Order_By>;
};

/** columns and relationships of "table_cumulative_amount" */
export type Table_Cumulative_Amount = {
  date: Scalars['timestamptz'];
  sum: Scalars['numeric'];
};

/** aggregated selection of "table_cumulative_amount" */
export type Table_Cumulative_Amount_Aggregate = {
  aggregate?: Maybe<Table_Cumulative_Amount_Aggregate_Fields>;
  nodes: Array<Table_Cumulative_Amount>;
};

/** aggregate fields of "table_cumulative_amount" */
export type Table_Cumulative_Amount_Aggregate_Fields = {
  avg?: Maybe<Table_Cumulative_Amount_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Table_Cumulative_Amount_Max_Fields>;
  min?: Maybe<Table_Cumulative_Amount_Min_Fields>;
  stddev?: Maybe<Table_Cumulative_Amount_Stddev_Fields>;
  stddev_pop?: Maybe<Table_Cumulative_Amount_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Table_Cumulative_Amount_Stddev_Samp_Fields>;
  sum?: Maybe<Table_Cumulative_Amount_Sum_Fields>;
  var_pop?: Maybe<Table_Cumulative_Amount_Var_Pop_Fields>;
  var_samp?: Maybe<Table_Cumulative_Amount_Var_Samp_Fields>;
  variance?: Maybe<Table_Cumulative_Amount_Variance_Fields>;
};


/** aggregate fields of "table_cumulative_amount" */
export type Table_Cumulative_Amount_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Table_Cumulative_Amount_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Aggregate_Order_By = {
  avg?: Maybe<Table_Cumulative_Amount_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Table_Cumulative_Amount_Max_Order_By>;
  min?: Maybe<Table_Cumulative_Amount_Min_Order_By>;
  stddev?: Maybe<Table_Cumulative_Amount_Stddev_Order_By>;
  stddev_pop?: Maybe<Table_Cumulative_Amount_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Table_Cumulative_Amount_Stddev_Samp_Order_By>;
  sum?: Maybe<Table_Cumulative_Amount_Sum_Order_By>;
  var_pop?: Maybe<Table_Cumulative_Amount_Var_Pop_Order_By>;
  var_samp?: Maybe<Table_Cumulative_Amount_Var_Samp_Order_By>;
  variance?: Maybe<Table_Cumulative_Amount_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Arr_Rel_Insert_Input = {
  data: Array<Table_Cumulative_Amount_Insert_Input>;
};

/** aggregate avg on columns */
export type Table_Cumulative_Amount_Avg_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Avg_Order_By = {
  sum?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "table_cumulative_amount". All fields are combined with a logical 'AND'. */
export type Table_Cumulative_Amount_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Table_Cumulative_Amount_Bool_Exp>>>;
  _not?: Maybe<Table_Cumulative_Amount_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Table_Cumulative_Amount_Bool_Exp>>>;
  date?: Maybe<Timestamptz_Comparison_Exp>;
  sum?: Maybe<Numeric_Comparison_Exp>;
};

/** input type for incrementing integer column in table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Inc_Input = {
  sum?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Insert_Input = {
  date?: Maybe<Scalars['timestamptz']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Table_Cumulative_Amount_Max_Fields = {
  date?: Maybe<Scalars['timestamptz']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Max_Order_By = {
  date?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Table_Cumulative_Amount_Min_Fields = {
  date?: Maybe<Scalars['timestamptz']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Min_Order_By = {
  date?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** response of any mutation on the table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Table_Cumulative_Amount>;
};

/** input type for inserting object relation for remote table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Obj_Rel_Insert_Input = {
  data: Table_Cumulative_Amount_Insert_Input;
};

/** ordering options when selecting data from "table_cumulative_amount" */
export type Table_Cumulative_Amount_Order_By = {
  date?: Maybe<Order_By>;
  sum?: Maybe<Order_By>;
};

/** select columns of table "table_cumulative_amount" */
export enum Table_Cumulative_Amount_Select_Column {
  /** column name */
  Date = 'date',
  /** column name */
  Sum = 'sum'
}

/** input type for updating data in table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Set_Input = {
  date?: Maybe<Scalars['timestamptz']>;
  sum?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Table_Cumulative_Amount_Stddev_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Stddev_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Table_Cumulative_Amount_Stddev_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Stddev_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Table_Cumulative_Amount_Stddev_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Stddev_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Table_Cumulative_Amount_Sum_Fields = {
  sum?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Sum_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Table_Cumulative_Amount_Var_Pop_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Var_Pop_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Table_Cumulative_Amount_Var_Samp_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Var_Samp_Order_By = {
  sum?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Table_Cumulative_Amount_Variance_Fields = {
  sum?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "table_cumulative_amount" */
export type Table_Cumulative_Amount_Variance_Order_By = {
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

/** input type for incrementing integer column in table "table_transactions_by_category_grouped" */
export type Table_Transactions_By_Category_Grouped_Inc_Input = {
  balance?: Maybe<Scalars['numeric']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
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

/** columns and relationships of "transaction" */
export type Transaction = {
  /** An object relationship */
  account: Account;
  account_id: Scalars['uuid'];
  amount: Scalars['numeric'];
  /** An object relationship */
  category: Category;
  /** Defaults to the None category */
  category_id: Scalars['uuid'];
  created_at: Scalars['timestamptz'];
  date: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  linkedAccount?: Maybe<Account>;
  linked_account_id?: Maybe<Scalars['uuid']>;
  pair_id?: Maybe<Scalars['uuid']>;
  paired_with_id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  transaction?: Maybe<Transaction>;
  /** An array relationship */
  transactions: Array<Transaction>;
  /** An aggregated array relationship */
  transactions_aggregate: Transaction_Aggregate;
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "transaction" */
export type TransactionTransactionsArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};


/** columns and relationships of "transaction" */
export type TransactionTransactions_AggregateArgs = {
  distinct_on?: Maybe<Array<Transaction_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Transaction_Order_By>>;
  where?: Maybe<Transaction_Bool_Exp>;
};

/** aggregated selection of "transaction" */
export type Transaction_Aggregate = {
  aggregate?: Maybe<Transaction_Aggregate_Fields>;
  nodes: Array<Transaction>;
};

/** aggregate fields of "transaction" */
export type Transaction_Aggregate_Fields = {
  avg?: Maybe<Transaction_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Transaction_Max_Fields>;
  min?: Maybe<Transaction_Min_Fields>;
  stddev?: Maybe<Transaction_Stddev_Fields>;
  stddev_pop?: Maybe<Transaction_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transaction_Stddev_Samp_Fields>;
  sum?: Maybe<Transaction_Sum_Fields>;
  var_pop?: Maybe<Transaction_Var_Pop_Fields>;
  var_samp?: Maybe<Transaction_Var_Samp_Fields>;
  variance?: Maybe<Transaction_Variance_Fields>;
};


/** aggregate fields of "transaction" */
export type Transaction_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Transaction_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "transaction" */
export type Transaction_Aggregate_Order_By = {
  avg?: Maybe<Transaction_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Transaction_Max_Order_By>;
  min?: Maybe<Transaction_Min_Order_By>;
  stddev?: Maybe<Transaction_Stddev_Order_By>;
  stddev_pop?: Maybe<Transaction_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Transaction_Stddev_Samp_Order_By>;
  sum?: Maybe<Transaction_Sum_Order_By>;
  var_pop?: Maybe<Transaction_Var_Pop_Order_By>;
  var_samp?: Maybe<Transaction_Var_Samp_Order_By>;
  variance?: Maybe<Transaction_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "transaction" */
export type Transaction_Arr_Rel_Insert_Input = {
  data: Array<Transaction_Insert_Input>;
  on_conflict?: Maybe<Transaction_On_Conflict>;
};

/** aggregate avg on columns */
export type Transaction_Avg_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "transaction" */
export type Transaction_Avg_Order_By = {
  amount?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transaction". All fields are combined with a logical 'AND'. */
export type Transaction_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Transaction_Bool_Exp>>>;
  _not?: Maybe<Transaction_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Transaction_Bool_Exp>>>;
  account?: Maybe<Account_Bool_Exp>;
  account_id?: Maybe<Uuid_Comparison_Exp>;
  amount?: Maybe<Numeric_Comparison_Exp>;
  category?: Maybe<Category_Bool_Exp>;
  category_id?: Maybe<Uuid_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  date?: Maybe<Timestamptz_Comparison_Exp>;
  description?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  linkedAccount?: Maybe<Account_Bool_Exp>;
  linked_account_id?: Maybe<Uuid_Comparison_Exp>;
  pair_id?: Maybe<Uuid_Comparison_Exp>;
  paired_with_id?: Maybe<Uuid_Comparison_Exp>;
  transaction?: Maybe<Transaction_Bool_Exp>;
  transactions?: Maybe<Transaction_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "transaction" */
export enum Transaction_Constraint {
  /** unique or primary key constraint */
  TransactionsPkey = 'transactions_pkey'
}

/** input type for incrementing integer column in table "transaction" */
export type Transaction_Inc_Input = {
  amount?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "transaction" */
export type Transaction_Insert_Input = {
  account?: Maybe<Account_Obj_Rel_Insert_Input>;
  account_id?: Maybe<Scalars['uuid']>;
  amount?: Maybe<Scalars['numeric']>;
  category?: Maybe<Category_Obj_Rel_Insert_Input>;
  category_id?: Maybe<Scalars['uuid']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  date?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  linkedAccount?: Maybe<Account_Obj_Rel_Insert_Input>;
  linked_account_id?: Maybe<Scalars['uuid']>;
  pair_id?: Maybe<Scalars['uuid']>;
  paired_with_id?: Maybe<Scalars['uuid']>;
  transaction?: Maybe<Transaction_Obj_Rel_Insert_Input>;
  transactions?: Maybe<Transaction_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Transaction_Max_Fields = {
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

/** order by max() on columns of table "transaction" */
export type Transaction_Max_Order_By = {
  account_id?: Maybe<Order_By>;
  amount?: Maybe<Order_By>;
  category_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  linked_account_id?: Maybe<Order_By>;
  pair_id?: Maybe<Order_By>;
  paired_with_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Transaction_Min_Fields = {
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

/** order by min() on columns of table "transaction" */
export type Transaction_Min_Order_By = {
  account_id?: Maybe<Order_By>;
  amount?: Maybe<Order_By>;
  category_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  linked_account_id?: Maybe<Order_By>;
  pair_id?: Maybe<Order_By>;
  paired_with_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "transaction" */
export type Transaction_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Transaction>;
};

/** input type for inserting object relation for remote table "transaction" */
export type Transaction_Obj_Rel_Insert_Input = {
  data: Transaction_Insert_Input;
  on_conflict?: Maybe<Transaction_On_Conflict>;
};

/** on conflict condition type for table "transaction" */
export type Transaction_On_Conflict = {
  constraint: Transaction_Constraint;
  update_columns: Array<Transaction_Update_Column>;
  where?: Maybe<Transaction_Bool_Exp>;
};

/** ordering options when selecting data from "transaction" */
export type Transaction_Order_By = {
  account?: Maybe<Account_Order_By>;
  account_id?: Maybe<Order_By>;
  amount?: Maybe<Order_By>;
  category?: Maybe<Category_Order_By>;
  category_id?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  description?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  linkedAccount?: Maybe<Account_Order_By>;
  linked_account_id?: Maybe<Order_By>;
  pair_id?: Maybe<Order_By>;
  paired_with_id?: Maybe<Order_By>;
  transaction?: Maybe<Transaction_Order_By>;
  transactions_aggregate?: Maybe<Transaction_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "transaction" */
export type Transaction_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "transaction" */
export enum Transaction_Select_Column {
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

/** input type for updating data in table "transaction" */
export type Transaction_Set_Input = {
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
export type Transaction_Stddev_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "transaction" */
export type Transaction_Stddev_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transaction_Stddev_Pop_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "transaction" */
export type Transaction_Stddev_Pop_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transaction_Stddev_Samp_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "transaction" */
export type Transaction_Stddev_Samp_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Transaction_Sum_Fields = {
  amount?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "transaction" */
export type Transaction_Sum_Order_By = {
  amount?: Maybe<Order_By>;
};

/** update columns of table "transaction" */
export enum Transaction_Update_Column {
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
export type Transaction_Var_Pop_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "transaction" */
export type Transaction_Var_Pop_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transaction_Var_Samp_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "transaction" */
export type Transaction_Var_Samp_Order_By = {
  amount?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Transaction_Variance_Fields = {
  amount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "transaction" */
export type Transaction_Variance_Order_By = {
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

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  isParent?: Maybe<Scalars['Boolean']>;
}>;


export type CreateCategoryMutation = { insert_category?: Maybe<(
    Pick<Category_Mutation_Response, 'affected_rows'>
    & { returning: Array<Pick<Category, 'id'>> }
  )> };

export type DeleteCategoryMutationVariables = Exact<{
  id?: Maybe<Scalars['uuid']>;
}>;


export type DeleteCategoryMutation = { delete_category?: Maybe<(
    Pick<Category_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      Pick<Category, 'id' | 'name' | 'type'>
      & { key: Category['id'] }
    )> }
  )> };

export type DeleteTransactionsMutationVariables = Exact<{
  transactionIds: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type DeleteTransactionsMutation = { delete_transaction?: Maybe<Pick<Transaction_Mutation_Response, 'affected_rows'>> };

export type InsertTransactionMutationVariables = Exact<{
  accountId?: Maybe<Scalars['uuid']>;
  amount?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
}>;


export type InsertTransactionMutation = { insert_transaction?: Maybe<Pick<Transaction_Mutation_Response, 'affected_rows'>> };

export type PairTransactionsMutationVariables = Exact<{
  transactionIds: Array<Scalars['uuid']> | Scalars['uuid'];
  setLinkedAccountId?: Maybe<Scalars['uuid']>;
  setPairId?: Maybe<Scalars['uuid']>;
}>;


export type PairTransactionsMutation = { update_transaction?: Maybe<(
    Pick<Transaction_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      Pick<Transaction, 'id' | 'pair_id'>
      & { linkedAccount?: Maybe<Pick<Account, 'id' | 'name' | 'colour'>> }
    )> }
  )> };

export type UnpairTransactionsMutationVariables = Exact<{
  pairIds: Array<Scalars['uuid']> | Scalars['uuid'];
}>;


export type UnpairTransactionsMutation = { update_transaction?: Maybe<(
    Pick<Transaction_Mutation_Response, 'affected_rows'>
    & { returning: Array<Pick<Transaction, 'id'>> }
  )> };

export type UpdateCategoryMutationVariables = Exact<{
  ids: Array<Scalars['uuid']> | Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  isParent?: Maybe<Scalars['Boolean']>;
  parentCategoryId?: Maybe<Scalars['uuid']>;
}>;


export type UpdateCategoryMutation = { update_category?: Maybe<(
    Pick<Category_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      Pick<Category, 'id' | 'name' | 'type'>
      & { isParent: Category['is_parent'] }
      & { parent?: Maybe<Pick<Category, 'id'>> }
    )> }
  )> };

export type UpdateTransactionsCategoryMutationVariables = Exact<{
  transactionIds: Array<Scalars['uuid']> | Scalars['uuid'];
  categoryId: Scalars['uuid'];
}>;


export type UpdateTransactionsCategoryMutation = { update_transaction?: Maybe<(
    Pick<Transaction_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      Pick<Transaction, 'id'>
      & { category: Pick<Category, 'id' | 'name'> }
    )> }
  )> };

export type CheckTransactionQueryVariables = Exact<{
  accountId: Scalars['uuid'];
  amount: Scalars['numeric'];
  startDate: Scalars['timestamptz'];
  endDate: Scalars['timestamptz'];
  description: Scalars['String'];
}>;


export type CheckTransactionQuery = { transaction: Array<Pick<Transaction, 'id' | 'account_id' | 'amount' | 'date' | 'description'>> };

export type GetAmountGroupsQueryVariables = Exact<{
  startDate?: Maybe<Scalars['timestamptz']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  categoryId?: Maybe<Scalars['uuid']>;
  groupBy?: Maybe<Scalars['String']>;
}>;


export type GetAmountGroupsQuery = { groups: Array<Pick<Table_Transactions_By_Category_Grouped, 'date' | 'balance' | 'expense' | 'income'>>, aggregate: { aggregate?: Maybe<{ avg?: Maybe<Pick<Table_Transactions_By_Category_Grouped_Avg_Fields, 'balance' | 'expense' | 'income'>>, max?: Maybe<Pick<Table_Transactions_By_Category_Grouped_Max_Fields, 'balance' | 'income'>>, min?: Maybe<Pick<Table_Transactions_By_Category_Grouped_Min_Fields, 'expense'>> }> } };

export type GetBalancesQueryVariables = Exact<{
  startDate?: Maybe<Scalars['timestamptz']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  accountId?: Maybe<Scalars['uuid']>;
  groupBy?: Maybe<Scalars['String']>;
}>;


export type GetBalancesQuery = { balances: Array<Pick<Table_Cumulative_Amount, 'date' | 'sum'>> };

export type GetBaseDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBaseDataQuery = { accounts: Array<(
    Pick<Account, 'id' | 'name' | 'sum' | 'minimum' | 'colour' | 'status'>
    & { key: Account['id'], initialAmount: Account['initial_amount'], mostRecentTransactionDate: Account['most_recent_transaction_date'] }
  )>, categories: Array<(
    Pick<Category, 'id' | 'name' | 'type'>
    & { key: Category['id'], isParent: Category['is_parent'] }
    & { parent?: Maybe<Pick<Category, 'id' | 'name'>> }
  )> };

export type GetCategoryBreakdownQueryVariables = Exact<{
  startDate?: Maybe<Scalars['timestamptz']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  groupCategories: Scalars['Boolean'];
  accountId?: Maybe<Scalars['uuid']>;
}>;


export type GetCategoryBreakdownQuery = { expenseCategories: Array<Pick<Category, 'id' | 'name' | 'sum'>>, expenseSum: { aggregate?: Maybe<{ sum?: Maybe<Pick<Transaction_Sum_Fields, 'amount'>> }> }, incomeCategories: Array<Pick<Category, 'id' | 'name' | 'sum'>>, incomeSum: { aggregate?: Maybe<{ sum?: Maybe<Pick<Transaction_Sum_Fields, 'amount'>> }> } };

export type GetTransactionsQueryVariables = Exact<{
  startDate?: Maybe<Scalars['timestamptz']>;
  endDate?: Maybe<Scalars['timestamptz']>;
  categoryIds?: Maybe<Array<Scalars['uuid']> | Scalars['uuid']>;
  accountId?: Maybe<Scalars['uuid']>;
  searchText: Scalars['String'];
  searchAmount: Scalars['numeric'];
  searchAmountComplement: Scalars['numeric'];
}>;


export type GetTransactionsQuery = { transactions: { aggregate?: Maybe<Pick<Transaction_Aggregate_Fields, 'count'>>, nodes: Array<(
      Pick<Transaction, 'id' | 'date' | 'amount' | 'description' | 'pair_id'>
      & { key: Transaction['id'] }
      & { account: Pick<Account, 'id' | 'name' | 'colour'>, linkedAccount?: Maybe<Pick<Account, 'id' | 'name' | 'colour'>>, category: Pick<Category, 'id' | 'name'> }
    )> } };


export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!, $type: String, $isParent: Boolean) {
  insert_category(objects: {name: $name, type: $type, is_parent: $isParent}) {
    affected_rows
    returning {
      id
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
 *      isParent: // value for 'isParent'
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
  delete_category(where: {id: {_eq: $id}}) {
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
  delete_transaction(where: {id: {_in: $transactionIds}}) {
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
export const InsertTransactionDocument = gql`
    mutation InsertTransaction($accountId: uuid, $amount: numeric, $date: timestamptz, $description: String) {
  insert_transaction(objects: {account_id: $accountId, amount: $amount, date: $date, description: $description}) {
    affected_rows
  }
}
    `;
export type InsertTransactionMutationFn = Apollo.MutationFunction<InsertTransactionMutation, InsertTransactionMutationVariables>;

/**
 * __useInsertTransactionMutation__
 *
 * To run a mutation, you first call `useInsertTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertTransactionMutation, { data, loading, error }] = useInsertTransactionMutation({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      amount: // value for 'amount'
 *      date: // value for 'date'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useInsertTransactionMutation(baseOptions?: Apollo.MutationHookOptions<InsertTransactionMutation, InsertTransactionMutationVariables>) {
        return Apollo.useMutation<InsertTransactionMutation, InsertTransactionMutationVariables>(InsertTransactionDocument, baseOptions);
      }
export type InsertTransactionMutationHookResult = ReturnType<typeof useInsertTransactionMutation>;
export type InsertTransactionMutationResult = Apollo.MutationResult<InsertTransactionMutation>;
export type InsertTransactionMutationOptions = Apollo.BaseMutationOptions<InsertTransactionMutation, InsertTransactionMutationVariables>;
export const PairTransactionsDocument = gql`
    mutation PairTransactions($transactionIds: [uuid!]!, $setLinkedAccountId: uuid, $setPairId: uuid) {
  update_transaction(where: {id: {_in: $transactionIds}}, _set: {updated_at: "now", linked_account_id: $setLinkedAccountId, pair_id: $setPairId}) {
    affected_rows
    returning {
      id
      linkedAccount {
        id
        name
        colour
      }
      pair_id
    }
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
  update_transaction(where: {pair_id: {_in: $pairIds}}, _set: {linked_account_id: null, updated_at: "now", pair_id: null}) {
    affected_rows
    returning {
      id
    }
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
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($ids: [uuid!]!, $name: String, $type: String, $isParent: Boolean, $parentCategoryId: uuid) {
  update_category(where: {id: {_in: $ids}}, _set: {name: $name, type: $type, is_parent: $isParent, parent_category_id: $parentCategoryId}) {
    affected_rows
    returning {
      id
      name
      type
      isParent: is_parent
      parent: category {
        id
      }
    }
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      name: // value for 'name'
 *      type: // value for 'type'
 *      isParent: // value for 'isParent'
 *      parentCategoryId: // value for 'parentCategoryId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, baseOptions);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateTransactionsCategoryDocument = gql`
    mutation UpdateTransactionsCategory($transactionIds: [uuid!]!, $categoryId: uuid!) {
  update_transaction(where: {id: {_in: $transactionIds}}, _set: {category_id: $categoryId, updated_at: "now"}) {
    affected_rows
    returning {
      id
      category {
        id
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
export const CheckTransactionDocument = gql`
    query CheckTransaction($accountId: uuid!, $amount: numeric!, $startDate: timestamptz!, $endDate: timestamptz!, $description: String!) {
  transaction(where: {_and: [{account_id: {_eq: $accountId}}, {amount: {_eq: $amount}}, {date: {_gte: $startDate, _lt: $endDate}}, {description: {_eq: $description}}]}) {
    id
    account_id
    amount
    date
    description
  }
}
    `;

/**
 * __useCheckTransactionQuery__
 *
 * To run a query within a React component, call `useCheckTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckTransactionQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *      amount: // value for 'amount'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCheckTransactionQuery(baseOptions: Apollo.QueryHookOptions<CheckTransactionQuery, CheckTransactionQueryVariables>) {
        return Apollo.useQuery<CheckTransactionQuery, CheckTransactionQueryVariables>(CheckTransactionDocument, baseOptions);
      }
export function useCheckTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckTransactionQuery, CheckTransactionQueryVariables>) {
          return Apollo.useLazyQuery<CheckTransactionQuery, CheckTransactionQueryVariables>(CheckTransactionDocument, baseOptions);
        }
export type CheckTransactionQueryHookResult = ReturnType<typeof useCheckTransactionQuery>;
export type CheckTransactionLazyQueryHookResult = ReturnType<typeof useCheckTransactionLazyQuery>;
export type CheckTransactionQueryResult = Apollo.QueryResult<CheckTransactionQuery, CheckTransactionQueryVariables>;
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
export const GetBalancesDocument = gql`
    query GetBalances($startDate: timestamptz, $endDate: timestamptz, $accountId: uuid, $groupBy: String) {
  balances: func_cumulative_amount(args: {v_account_id: $accountId, v_group_by: $groupBy, v_start_date: $startDate, v_end_date: $endDate}, where: {date: {_gte: $startDate, _lte: $endDate}}, order_by: {date: asc}) {
    date
    sum
  }
}
    `;

/**
 * __useGetBalancesQuery__
 *
 * To run a query within a React component, call `useGetBalancesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBalancesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBalancesQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      accountId: // value for 'accountId'
 *      groupBy: // value for 'groupBy'
 *   },
 * });
 */
export function useGetBalancesQuery(baseOptions?: Apollo.QueryHookOptions<GetBalancesQuery, GetBalancesQueryVariables>) {
        return Apollo.useQuery<GetBalancesQuery, GetBalancesQueryVariables>(GetBalancesDocument, baseOptions);
      }
export function useGetBalancesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBalancesQuery, GetBalancesQueryVariables>) {
          return Apollo.useLazyQuery<GetBalancesQuery, GetBalancesQueryVariables>(GetBalancesDocument, baseOptions);
        }
export type GetBalancesQueryHookResult = ReturnType<typeof useGetBalancesQuery>;
export type GetBalancesLazyQueryHookResult = ReturnType<typeof useGetBalancesLazyQuery>;
export type GetBalancesQueryResult = Apollo.QueryResult<GetBalancesQuery, GetBalancesQueryVariables>;
export const GetBaseDataDocument = gql`
    query GetBaseData {
  accounts: func_account(order_by: {name: asc}) {
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
  categories: category(order_by: {name: asc}) {
    id
    key: id
    name
    type
    isParent: is_parent
    parent: category {
      id
      name
    }
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
export const GetCategoryBreakdownDocument = gql`
    query GetCategoryBreakdown($startDate: timestamptz, $endDate: timestamptz, $groupCategories: Boolean!, $accountId: uuid) {
  expenseCategories: func_category_breakdown(args: {v_start_date: $startDate, v_end_date: $endDate, v_group_categories: $groupCategories, v_category_type: "expense", v_account_id: $accountId}) {
    id
    name
    sum
  }
  expenseSum: transaction_aggregate(where: {category: {type: {_eq: "expense"}}, date: {_gte: $startDate, _lte: $endDate}}) {
    aggregate {
      sum {
        amount
      }
    }
  }
  incomeCategories: func_category_breakdown(args: {v_start_date: $startDate, v_end_date: $endDate, v_group_categories: $groupCategories, v_category_type: "income", v_account_id: $accountId}) {
    id
    name
    sum
  }
  incomeSum: transaction_aggregate(where: {category: {type: {_eq: "income"}}, date: {_gte: $startDate, _lte: $endDate}}) {
    aggregate {
      sum {
        amount
      }
    }
  }
}
    `;

/**
 * __useGetCategoryBreakdownQuery__
 *
 * To run a query within a React component, call `useGetCategoryBreakdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryBreakdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryBreakdownQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      groupCategories: // value for 'groupCategories'
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useGetCategoryBreakdownQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryBreakdownQuery, GetCategoryBreakdownQueryVariables>) {
        return Apollo.useQuery<GetCategoryBreakdownQuery, GetCategoryBreakdownQueryVariables>(GetCategoryBreakdownDocument, baseOptions);
      }
export function useGetCategoryBreakdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryBreakdownQuery, GetCategoryBreakdownQueryVariables>) {
          return Apollo.useLazyQuery<GetCategoryBreakdownQuery, GetCategoryBreakdownQueryVariables>(GetCategoryBreakdownDocument, baseOptions);
        }
export type GetCategoryBreakdownQueryHookResult = ReturnType<typeof useGetCategoryBreakdownQuery>;
export type GetCategoryBreakdownLazyQueryHookResult = ReturnType<typeof useGetCategoryBreakdownLazyQuery>;
export type GetCategoryBreakdownQueryResult = Apollo.QueryResult<GetCategoryBreakdownQuery, GetCategoryBreakdownQueryVariables>;
export const GetTransactionsDocument = gql`
    query GetTransactions($startDate: timestamptz, $endDate: timestamptz, $categoryIds: [uuid!], $accountId: uuid, $searchText: String!, $searchAmount: numeric!, $searchAmountComplement: numeric!) {
  transactions: transaction_aggregate(where: {date: {_gte: $startDate, _lte: $endDate}, account_id: {_eq: $accountId}, _and: [{_or: [{category_id: {_is_null: true}}, {category_id: {_in: $categoryIds}}, {category: {parent_category_id: {_in: $categoryIds}}}]}, {_or: [{description: {_ilike: $searchText}}, {amount: {_eq: $searchAmount}}, {amount: {_eq: $searchAmountComplement}}]}]}, order_by: {date: desc}) {
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