# Weight Converter
weight = float(input("Enter your weight: "))
unit = input("Kilograms or Pounds? (K or L): ")
if unit.upper() == "K":
    weight = weight * 2.205
    print(f"Your weight is: {weight} lbs")
elif unit.upper() == "L":
    weight = weight / 2.205
    print(f"Your weight is: {weight} kg")
else:
    print("Invalid unit")