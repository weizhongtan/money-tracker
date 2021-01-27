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
  json: any;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

export type AccountAuthOutput = {
  accessToken: Scalars['String'];
};

export type AccountData = {
  data: Scalars['String'];
};

export type AuthSuccess = {
  accountIds?: Maybe<Array<Scalars['String']>>;
  cardIds?: Maybe<Array<Scalars['String']>>;
  message: Scalars['String'];
};

export type AuthUrl = {
  url?: Maybe<Scalars['String']>;
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

export type ImportTransactionsOutput = {
  transactions: Scalars['String'];
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

export type Func_Timeline_Args = {
  v_account_id?: Maybe<Scalars['uuid']>;
  v_category_id?: Maybe<Scalars['uuid']>;
  v_group_by?: Maybe<Scalars['String']>;
};


/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
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
  /** delete data from the table: "table_amount_group" */
  delete_table_amount_group?: Maybe<Table_Amount_Group_Mutation_Response>;
  /** delete data from the table: "table_breakdown" */
  delete_table_breakdown?: Maybe<Table_Breakdown_Mutation_Response>;
  /** delete data from the table: "table_cumulative_amount" */
  delete_table_cumulative_amount?: Maybe<Table_Cumulative_Amount_Mutation_Response>;
  /** delete data from the table: "transaction" */
  delete_transaction?: Maybe<Transaction_Mutation_Response>;
  /** delete single row from the table: "transaction" */
  delete_transaction_by_pk?: Maybe<Transaction>;
  /** perform the action: "exchangeCode" */
  exchangeCode?: Maybe<AuthSuccess>;
  /** perform the action: "importTransactions" */
  importTransactions?: Maybe<ImportTransactionsOutput>;
  /** insert data into the table: "account" */
  insert_account?: Maybe<Account_Mutation_Response>;
  /** insert a single row into the table: "account" */
  insert_account_one?: Maybe<Account>;
  /** insert data into the table: "category" */
  insert_category?: Maybe<Category_Mutation_Response>;
  /** insert a single row into the table: "category" */
  insert_category_one?: Maybe<Category>;
  /** insert data into the table: "table_amount_group" */
  insert_table_amount_group?: Maybe<Table_Amount_Group_Mutation_Response>;
  /** insert a single row into the table: "table_amount_group" */
  insert_table_amount_group_one?: Maybe<Table_Amount_Group>;
  /** insert data into the table: "table_breakdown" */
  insert_table_breakdown?: Maybe<Table_Breakdown_Mutation_Response>;
  /** insert a single row into the table: "table_breakdown" */
  insert_table_breakdown_one?: Maybe<Table_Breakdown>;
  /** insert data into the table: "table_cumulative_amount" */
  insert_table_cumulative_amount?: Maybe<Table_Cumulative_Amount_Mutation_Response>;
  /** insert a single row into the table: "table_cumulative_amount" */
  insert_table_cumulative_amount_one?: Maybe<Table_Cumulative_Amount>;
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
  /** update data of the table: "table_amount_group" */
  update_table_amount_group?: Maybe<Table_Amount_Group_Mutation_Response>;
  /** update data of the table: "table_breakdown" */
  update_table_breakdown?: Maybe<Table_Breakdown_Mutation_Response>;
  /** update data of the table: "table_cumulative_amount" */
  update_table_cumulative_amount?: Maybe<Table_Cumulative_Amount_Mutation_Response>;
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
export type Mutation_RootDelete_Table_Amount_GroupArgs = {
  where: Table_Amount_Group_Bool_Exp;
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
export type Mutation_RootDelete_TransactionArgs = {
  where: Transaction_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transaction_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootExchangeCodeArgs = {
  code?: Maybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootImportTransactionsArgs = {
  accountId: Scalars['uuid'];
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
export type Mutation_RootInsert_Table_Amount_GroupArgs = {
  objects: Array<Table_Amount_Group_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Table_Amount_Group_OneArgs = {
  object: Table_Amount_Group_Insert_Input;
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
export type Mutation_RootUpdate_Table_Amount_GroupArgs = {
  _inc?: Maybe<Table_Amount_Group_Inc_Input>;
  _set?: Maybe<Table_Amount_Group_Set_Input>;
  where: Table_Amount_Group_Bool_Exp;
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
  /** execute function "func_timeline" which returns "table_amount_group" */
  func_timeline: Array<Table_Amount_Group>;
  /** execute function "func_timeline" and query aggregates on result of table type "table_amount_group" */
  func_timeline_aggregate: Table_Amount_Group_Aggregate;
  /** perform the action: "getAuthUrl" */
  getAuthUrl?: Maybe<AuthUrl>;
  /** fetch data from the table: "table_amount_group" */
  table_amount_group: Array<Table_Amount_Group>;
  /** fetch aggregated fields from the table: "table_amount_group" */
  table_amount_group_aggregate: Table_Amount_Group_Aggregate;
  /** fetch data from the table: "table_breakdown" */
  table_breakdown: Array<Table_Breakdown>;
  /** fetch aggregated fields from the table: "table_breakdown" */
  table_breakdown_aggregate: Table_Breakdown_Aggregate;
  /** fetch data from the table: "table_cumulative_amount" */
  table_cumulative_amount: Array<Table_Cumulative_Amount>;
  /** fetch aggregated fields from the table: "table_cumulative_amount" */
  table_cumulative_amount_aggregate: Table_Cumulative_Amount_Aggregate;
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
export type Query_RootFunc_TimelineArgs = {
  args: Func_Timeline_Args;
  distinct_on?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Group_Order_By>>;
  where?: Maybe<Table_Amount_Group_Bool_Exp>;
};


/** query root */
export type Query_RootFunc_Timeline_AggregateArgs = {
  args: Func_Timeline_Args;
  distinct_on?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Group_Order_By>>;
  where?: Maybe<Table_Amount_Group_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Amount_GroupArgs = {
  distinct_on?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Group_Order_By>>;
  where?: Maybe<Table_Amount_Group_Bool_Exp>;
};


/** query root */
export type Query_RootTable_Amount_Group_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Group_Order_By>>;
  where?: Maybe<Table_Amount_Group_Bool_Exp>;
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
  /** execute function "func_timeline" which returns "table_amount_group" */
  func_timeline: Array<Table_Amount_Group>;
  /** execute function "func_timeline" and query aggregates on result of table type "table_amount_group" */
  func_timeline_aggregate: Table_Amount_Group_Aggregate;
  /** perform the action: "getAuthUrl" */
  getAuthUrl?: Maybe<AuthUrl>;
  /** fetch data from the table: "table_amount_group" */
  table_amount_group: Array<Table_Amount_Group>;
  /** fetch aggregated fields from the table: "table_amount_group" */
  table_amount_group_aggregate: Table_Amount_Group_Aggregate;
  /** fetch data from the table: "table_breakdown" */
  table_breakdown: Array<Table_Breakdown>;
  /** fetch aggregated fields from the table: "table_breakdown" */
  table_breakdown_aggregate: Table_Breakdown_Aggregate;
  /** fetch data from the table: "table_cumulative_amount" */
  table_cumulative_amount: Array<Table_Cumulative_Amount>;
  /** fetch aggregated fields from the table: "table_cumulative_amount" */
  table_cumulative_amount_aggregate: Table_Cumulative_Amount_Aggregate;
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
export type Subscription_RootFunc_TimelineArgs = {
  args: Func_Timeline_Args;
  distinct_on?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Group_Order_By>>;
  where?: Maybe<Table_Amount_Group_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFunc_Timeline_AggregateArgs = {
  args: Func_Timeline_Args;
  distinct_on?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Group_Order_By>>;
  where?: Maybe<Table_Amount_Group_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Amount_GroupArgs = {
  distinct_on?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Group_Order_By>>;
  where?: Maybe<Table_Amount_Group_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTable_Amount_Group_AggregateArgs = {
  distinct_on?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Table_Amount_Group_Order_By>>;
  where?: Maybe<Table_Amount_Group_Bool_Exp>;
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

/** columns and relationships of "table_amount_group" */
export type Table_Amount_Group = {
  balance: Scalars['numeric'];
  date: Scalars['timestamptz'];
  expense: Scalars['numeric'];
  income: Scalars['numeric'];
};

/** aggregated selection of "table_amount_group" */
export type Table_Amount_Group_Aggregate = {
  aggregate?: Maybe<Table_Amount_Group_Aggregate_Fields>;
  nodes: Array<Table_Amount_Group>;
};

/** aggregate fields of "table_amount_group" */
export type Table_Amount_Group_Aggregate_Fields = {
  avg?: Maybe<Table_Amount_Group_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Table_Amount_Group_Max_Fields>;
  min?: Maybe<Table_Amount_Group_Min_Fields>;
  stddev?: Maybe<Table_Amount_Group_Stddev_Fields>;
  stddev_pop?: Maybe<Table_Amount_Group_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Table_Amount_Group_Stddev_Samp_Fields>;
  sum?: Maybe<Table_Amount_Group_Sum_Fields>;
  var_pop?: Maybe<Table_Amount_Group_Var_Pop_Fields>;
  var_samp?: Maybe<Table_Amount_Group_Var_Samp_Fields>;
  variance?: Maybe<Table_Amount_Group_Variance_Fields>;
};


/** aggregate fields of "table_amount_group" */
export type Table_Amount_Group_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Table_Amount_Group_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "table_amount_group" */
export type Table_Amount_Group_Aggregate_Order_By = {
  avg?: Maybe<Table_Amount_Group_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Table_Amount_Group_Max_Order_By>;
  min?: Maybe<Table_Amount_Group_Min_Order_By>;
  stddev?: Maybe<Table_Amount_Group_Stddev_Order_By>;
  stddev_pop?: Maybe<Table_Amount_Group_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Table_Amount_Group_Stddev_Samp_Order_By>;
  sum?: Maybe<Table_Amount_Group_Sum_Order_By>;
  var_pop?: Maybe<Table_Amount_Group_Var_Pop_Order_By>;
  var_samp?: Maybe<Table_Amount_Group_Var_Samp_Order_By>;
  variance?: Maybe<Table_Amount_Group_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "table_amount_group" */
export type Table_Amount_Group_Arr_Rel_Insert_Input = {
  data: Array<Table_Amount_Group_Insert_Input>;
};

/** aggregate avg on columns */
export type Table_Amount_Group_Avg_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "table_amount_group" */
export type Table_Amount_Group_Avg_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "table_amount_group". All fields are combined with a logical 'AND'. */
export type Table_Amount_Group_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Table_Amount_Group_Bool_Exp>>>;
  _not?: Maybe<Table_Amount_Group_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Table_Amount_Group_Bool_Exp>>>;
  balance?: Maybe<Numeric_Comparison_Exp>;
  date?: Maybe<Timestamptz_Comparison_Exp>;
  expense?: Maybe<Numeric_Comparison_Exp>;
  income?: Maybe<Numeric_Comparison_Exp>;
};

/** input type for incrementing integer column in table "table_amount_group" */
export type Table_Amount_Group_Inc_Input = {
  balance?: Maybe<Scalars['numeric']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "table_amount_group" */
export type Table_Amount_Group_Insert_Input = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Table_Amount_Group_Max_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "table_amount_group" */
export type Table_Amount_Group_Max_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Table_Amount_Group_Min_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "table_amount_group" */
export type Table_Amount_Group_Min_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** response of any mutation on the table "table_amount_group" */
export type Table_Amount_Group_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Table_Amount_Group>;
};

/** input type for inserting object relation for remote table "table_amount_group" */
export type Table_Amount_Group_Obj_Rel_Insert_Input = {
  data: Table_Amount_Group_Insert_Input;
};

/** ordering options when selecting data from "table_amount_group" */
export type Table_Amount_Group_Order_By = {
  balance?: Maybe<Order_By>;
  date?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** select columns of table "table_amount_group" */
export enum Table_Amount_Group_Select_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  Date = 'date',
  /** column name */
  Expense = 'expense',
  /** column name */
  Income = 'income'
}

/** input type for updating data in table "table_amount_group" */
export type Table_Amount_Group_Set_Input = {
  balance?: Maybe<Scalars['numeric']>;
  date?: Maybe<Scalars['timestamptz']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Table_Amount_Group_Stddev_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "table_amount_group" */
export type Table_Amount_Group_Stddev_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Table_Amount_Group_Stddev_Pop_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "table_amount_group" */
export type Table_Amount_Group_Stddev_Pop_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Table_Amount_Group_Stddev_Samp_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "table_amount_group" */
export type Table_Amount_Group_Stddev_Samp_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Table_Amount_Group_Sum_Fields = {
  balance?: Maybe<Scalars['numeric']>;
  expense?: Maybe<Scalars['numeric']>;
  income?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "table_amount_group" */
export type Table_Amount_Group_Sum_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Table_Amount_Group_Var_Pop_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "table_amount_group" */
export type Table_Amount_Group_Var_Pop_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Table_Amount_Group_Var_Samp_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "table_amount_group" */
export type Table_Amount_Group_Var_Samp_Order_By = {
  balance?: Maybe<Order_By>;
  expense?: Maybe<Order_By>;
  income?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Table_Amount_Group_Variance_Fields = {
  balance?: Maybe<Scalars['Float']>;
  expense?: Maybe<Scalars['Float']>;
  income?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "table_amount_group" */
export type Table_Amount_Group_Variance_Order_By = {
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
