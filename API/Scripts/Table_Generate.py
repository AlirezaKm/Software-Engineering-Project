
# tables = "php artisan make:migration --create={0} {0}_Table;sleep {1};".format(i,1)
# api =  "php artisan  infyom:api --fromTable --tableName=users --primary=id --skip=migration,views,menu User"
file = open('api','w')
TableName = [
#'UserTypes',
#'Users',
'Product',
'Category',
'SubCategory',
'Property',
'ProductProperty',
'Expense',
'Factors',
'Order',
'OrderStatus',
'Sellers',
'OrderFactor'
]

for i in TableName:
    file.write("php artisan infyom:api_scaffold --fromTable --tableName={0} --skip=migration,views,menu {0};".format(i))

file.close()