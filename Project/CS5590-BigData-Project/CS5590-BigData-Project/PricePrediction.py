import inline as inline
import matplotlib
import pandas as pd
import numpy as np
import sklearn
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
from scipy.stats.stats import pearsonr
import tkinter
from sklearn.metrics import mean_squared_error
from math import sqrt
from sklearn.ensemble import RandomForestRegressor
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib
import matplotlib.pyplot as plt
import warnings
import xgboost as xgb
import lightgbm as lgb
from scipy.stats import skew
from scipy import stats
from scipy.stats.stats import pearsonr
from scipy.stats import norm
from collections import Counter
from sklearn.linear_model import LinearRegression,LassoCV, Ridge, LassoLarsCV,ElasticNetCV
from sklearn.model_selection import GridSearchCV, cross_val_score, learning_curve
from sklearn.ensemble import RandomForestRegressor, AdaBoostRegressor, ExtraTreesRegressor, GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler, Normalizer, RobustScaler
warnings.filterwarnings('ignore')
sns.set(style='white', context='notebook', palette='deep')


sns.set()
pd.set_option('max_columns', 1000)
warnings.filterwarnings('ignore')
RANDOM_SEED = 42

# Load the data
df_train = pd.read_csv('/home/gulnoza/PycharmProjects/CS5590-BigData-Project/data/train.csv')
df_test = pd.read_csv('/home/gulnoza/PycharmProjects/CS5590-BigData-Project/data/test.csv')


print("Training Shape: ",df_train.shape)
print("Testing Shape: ",df_test.shape)

# combine test set and train set to do EDA of features
all_data = pd.concat((df_train, df_test))
# set Id as index
all_data = all_data.set_index(['Id'])

# Check missing value
missing_info = all_data.isnull().sum().sort_values(ascending = False).head(36)
missing_target = missing_info['SalePrice']
print(missing_info)
# Columns that contain missing value are shown below
# There are 35 columns contain missing value (includes salePrice)

# Based on data description, I found that the missing value in the following columns simply means 'None'
meaningful_nan_col_cate = ['PoolQC','MiscFeature','Alley','Fence','FireplaceQu','GarageCond',
                           'GarageType','GarageFinish','GarageQual','BsmtExposure',
                           'BsmtFinType2','BsmtFinType1','BsmtCond','BsmtQual']
# Also, some of the 'None' value need to be expressed as 0.0
meaningful_nan_col_num = ['LotFrontage','MasVnrArea','BsmtHalfBath','BsmtFullBath',
                          'BsmtFinSF2','BsmtFinSF1','BsmtUnfSF','TotalBsmtSF','GarageArea',
                          'GarageCars','GarageYrBlt']

# fill with most common term since there are only a few missing value
mode_nan_col_cate = ['MSZoning','Utilities','Functional','Exterior2nd','SaleType','Exterior1st',
                     'KitchenQual','Electrical','MasVnrType']

# filling missing value
for col in meaningful_nan_col_cate:
    all_data[col].fillna('None',inplace=True)
for col in meaningful_nan_col_num:
    all_data[col].fillna(0.0,inplace=True)
for col in mode_nan_col_cate:
    all_data[col].fillna(df_train[col].mode()[0],inplace=True)

# check if all missing value has been filled
print("Number of Missing Value: ", all_data.isnull().sum().sum() - missing_target)


# difference is train set has target column but test set doesn't
y_train = df_train['SalePrice']

# plot distribution of target
#plt.hist(y_train,density=1, bins=90)
#plt.xlabel("SalePrice")
#plt.show()

# As is shown in figure, the distribution of target is not normal distributed with positive skewness
# we can take log on target variable to adjust its distribution
#log_y_train = np.log(y_train)

# plot distribution of target
#plt.hist(log_y_train,density=1, bins=90)
#plt.xlabel("Log_SalePrice")
#plt.show()

# Based on personal experience the total sqft of the house usually affect the total price of the house
# Create a new feature which equal to the sum of total basement area, first floor area, second floor area
#all_data['TotalSF'] = all_data['TotalBsmtSF'] + all_data['1stFlrSF'] + all_data['2ndFlrSF']

# split it to original train set and test set
#train = all_data.iloc[:df_train.shape[0]]

#Split dataste into train and validation dataset
train_copy = df_train.copy()
train_set = train_copy.sample(frac=0.75, random_state=0)
validation_set = train_copy.drop(train_set.index)

corr = train_set.corr()
plt.figure(figsize=(16, 16))
sns.heatmap(corr, xticklabels = corr.columns, yticklabels = corr.columns)

plt.show()

# Top 10 Heatmap
k = 10 #number of variables for heatmap
cols = corr.nlargest(k, 'SalePrice')['SalePrice'].index
cm = np.corrcoef(train_set[cols].values.T)
sns.set(font_scale=1.25)
hm = sns.heatmap(cm, cbar=True, annot=True, square=True, fmt='.2f', annot_kws={'size': 10}, yticklabels=cols.values, xticklabels=cols.values)
plt.show()

most_corr = pd.DataFrame(cols)
most_corr.columns = ['Most Correlated Features']
print(most_corr)

# Overall Quality vs Sale Price
var = 'OverallQual'
data = pd.concat([train_set['SalePrice'], train_set[var]], axis=1)
f, ax = plt.subplots(figsize=(8, 6))
fig = sns.boxplot(x=var, y="SalePrice", data=data)
fig.axis(ymin=0, ymax=800000);
plt.show()

# Living Area vs Sale Price
sns.jointplot(x=train_set['GrLivArea'], y=train_set['SalePrice'], kind='reg')
plt.show();
print('Ground leaving area - Pearson correlation (BEFORE): ')
print(pearsonr(train_set['GrLivArea'], train_set['SalePrice']))

# Removing outliers manually (Two points in the bottom right)
train_set = train_set.drop(train_set[(train_set['GrLivArea']>4000)
                         & (train_set['SalePrice']<300000)].index).reset_index(drop=True)


# Living Area vs Sale Price
sns.jointplot(x=train_set['GrLivArea'], y=train_set['SalePrice'], kind='reg')
plt.show()
print('Ground leaving area - Pearson correlation (AFTER): ')
print(pearsonr(train_set['GrLivArea'], train_set['SalePrice']))

# Garage Cars vs Sale Price
sns.boxplot(x=train_set['GarageCars'], y=train_set['SalePrice'])
plt.show()
print('Garage cars - Pearson correlation (BEFORE): ')
print(pearsonr(train_set['GarageCars'], train_set['SalePrice']))

# Removing outliers manually (More than 4-cars, less than $300k)
train_set = train_set.drop(train_set[(train_set['GarageCars']>3)
                         & (train_set['SalePrice']<300000)].index).reset_index(drop=True)

# Garage cars vs Sale Price
sns.boxplot(x=train_set['GarageCars'], y=train_set['SalePrice'])
plt.show()
print('Garage cars - Pearson correlation (AFTER): ')
print(pearsonr(train_set['GarageCars'], train_set['SalePrice']))

# Garage Area vs Sale Price
sns.jointplot(x=train_set['GarageArea'], y=train_set['SalePrice'], kind='reg')
plt.show()
print('Garage area - Pearson correlation (BEFORE): ')
print(pearsonr(train_set['GarageArea'], train_set['SalePrice']))

# Removing outliers manually (More than 1000 sqft, less than $300k)
train_set = train_set.drop(train_set[(train_set['GarageArea']>1000)
                         & (train_set['SalePrice']<300000)].index).reset_index(drop=True)

# Garage Area vs Sale Price
sns.jointplot(x=train_set['GarageArea'], y=train_set['SalePrice'], kind='reg')
plt.show()
print('Garage area - Pearson correlation (AFTER): ')
print(pearsonr(train_set['GarageArea'], train_set['SalePrice']))

# Basement Area vs Sale Price
sns.jointplot(x=train_set['TotalBsmtSF'], y=train_set['SalePrice'], kind='reg')
plt.show()
print('Total basement - Pearson correlation (BEFORE): ' )
print(pearsonr(train_set['TotalBsmtSF'], train_set['SalePrice']))

# First Floor Area vs Sale Price
sns.jointplot(x=train_set['1stFlrSF'], y=train_set['SalePrice'], kind='reg')
plt.show()
print('First floor area - Pearson correlation (BEFORE): ')
print(pearsonr(train_set['1stFlrSF'], train_set['SalePrice']))

# Total Rooms vs Sale Price
sns.boxplot(x=train_set['TotRmsAbvGrd'], y=train_set['SalePrice'])
plt.show()
print('Total rooms - Pearson correlation (BEFORE): ')
print(pearsonr(train_set['TotRmsAbvGrd'], train_set['SalePrice']))

# Total Rooms vs Sale Price
var = 'YearBuilt'
data = pd.concat([train_set['SalePrice'], train_set[var]], axis=1)
f, ax = plt.subplots(figsize=(16, 8))
fig = sns.boxplot(x=var, y="SalePrice", data=data)
fig.axis(ymin=0, ymax=800000);
plt.xticks(rotation=90);
plt.show()

X = train_set[['OverallQual', 'GrLivArea', 'GarageCars','TotalBsmtSF','1stFlrSF', 'TotRmsAbvGrd', 'YearBuilt']]
y = train_set['SalePrice']

Val = validation_set[['OverallQual', 'GrLivArea', 'GarageCars','TotalBsmtSF','1stFlrSF', 'TotRmsAbvGrd', 'YearBuilt']]
ValP = validation_set['SalePrice']


reg = RandomForestRegressor(
 n_estimators=1,
 max_depth=3,
 bootstrap=False,
 random_state=RANDOM_SEED
)
reg.fit(X, y)
preds = reg.predict(X)
print(sklearn.metrics.r2_score(y, preds))

#Validation set
reg.fit(Val,ValP)
predsVal = reg.predict(Val)
print (sklearn.metrics.r2_score(ValP, predsVal))
