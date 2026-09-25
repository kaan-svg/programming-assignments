# Compound Interest Calculator
principle=float(input("Enter principle: "))
rate=float(input("Enter rate (%): "))
time=float(input("Enter time: "))
total=principle*pow((1+rate/100),time)
print(f"Balance after {time} years: ${total:.2f}")