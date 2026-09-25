menu={"pizza":3.00,"nachos":4.50,"popcorn":6.00,"fries":2.50}
cart=[]
total=0
for item,price in menu.items():
    print(f"{item}: ${price:.2f}")
while True:
    food=input("Enter food (q to quit): ")
    if food=="q":
        break
    if food in menu:
        cart.append(food)
for food in cart:
    total+=menu[food]
print("Your cart:",cart)
print(f"Total: ${total:.2f}")