# List Comprehension Examples
doubles=[x*2 for x in range(1,11)]
print(doubles)
squares=[z*z for z in range(1,11)]
print(squares)
numbers=[1,2,-3,4,-4]
positives=[n for n in numbers if n>=0]
print(positives)