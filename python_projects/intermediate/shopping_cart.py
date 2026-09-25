foods=[]
prices=[]
total=0
while True:
    food=input("Enter food (q to quit): ")
    if food.lower()=="q":
        break
    price=float(input(f"Enter price of {food}: $"))
    foods.append(food)
    prices.append(price)
print("----- YOUR CART -----")
for f,p in zip(foods,prices):
    print(f"{f}: ${p}")
    total+=p
print(f"Total: ${total}")