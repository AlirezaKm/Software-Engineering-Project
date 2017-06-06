
file = open('tables','w')
TableName = [
'Product',
'Category',
'SubCategory',
'Property',
'ProductProperty',
'Expense',
'Factors',
'Order'
'OrderFactor'
]

for i in TableName:
    file.write("php artisan make:migration --create={0} {0}_Table;sleep {1};".format(i,1))

file.close()